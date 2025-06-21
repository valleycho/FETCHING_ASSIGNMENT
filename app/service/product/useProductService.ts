import { dummyAllProductData, dummyProductData } from "@/app/data/dummyProductData"
import { Product } from "@/app/types/productTypes";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation";


export const useProductService = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const isSoldOut = searchParams.get("isSoldOut") || "false";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['products', { query, isSoldOut }],
    queryFn: ({ pageParam = 1 }) => {
      return fetch('https://fakestoreapi.com/products')
        .then(res => {
          const pageSize = 15; // 페이지당 아이템 수
          const startIndex = (pageParam - 1) * pageSize;
          const endIndex = startIndex + pageSize;

          let filteredProducts = dummyAllProductData as unknown as Product[];

          if (query || isSoldOut) {
            filteredProducts = dummyAllProductData.filter((product) => {
              const matchQuery = !query || product.title.toLowerCase().includes(query.toLowerCase())
              const matchSoldout = isSoldOut === "true" ? true : !product.stockOut;
              return matchQuery && matchSoldout;
            });
          } else {
            filteredProducts = dummyProductData;
          }

          const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
          
          return {
            products: paginatedProducts,
            hasMore: endIndex < filteredProducts.length,
            currentPage: pageParam,
            totalPages: Math.ceil(filteredProducts.length / pageSize)
          };
        });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // 모든 페이지의 상품들을 하나의 배열로 합치기
  const allProducts = data?.pages.flatMap(page => page.products) || [];

  return {
    products: allProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  }
}
