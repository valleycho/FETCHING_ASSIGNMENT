import { dummyProductData } from "@/app/data/dummyProductData"
import { useSuspenseQuery } from "@tanstack/react-query"


export const productService = () => {
  const { data: products} = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: () => {
      return fetch('https://fakestoreapi.com/products')
        .then(res => dummyProductData)
    }
  })

  return {
    products
  }
}