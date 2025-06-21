import { dummyAllProductData, dummyProductData } from "@/app/data/dummyProductData"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation";


export const useProductService = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const isSoldOut = searchParams.get("isSoldOut") || "false";

  const { data: products} = useSuspenseQuery({
    queryKey: ['products', { query, isSoldOut }],
    queryFn: () => {
      return fetch('https://fakestoreapi.com/products')
        .then(res => {
          if (query || isSoldOut) {
            return dummyAllProductData.filter((product) => {
              const matchQuery = !query || product.title.toLowerCase().includes(query.toLowerCase())
              
              const matchSoldout = isSoldOut === "true" ? true : !product.stockOut;

              return matchQuery && matchSoldout;
            })
          }

          return dummyProductData
        })
    }
  })

  return {
    products
  }
}