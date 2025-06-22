import { dummyAllProductData, dummyProductData } from "@/app/data/dummyProductData"
import { MAX_LIMIT_PRICE } from "@/app/data/productConstant";
import { useSearchParamsSafe } from "@/app/hooks/useSearchParams";
import { Product } from "@/app/types/productTypes";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query"


// 서버 사이드에서 사용할 함수
export const getProducts = async (params: {
  query?: string;
  isSoldOut?: string;
  minPrice?: string;
  maxPrice?: string;
  pageParam?: number;
}) => {
  const { 
    query = "", 
    isSoldOut = "false", 
    minPrice = "0", 
    maxPrice = MAX_LIMIT_PRICE.toString(),
    pageParam = 1 
  } = params;
  
  const pageSize = 15;
  const startIndex = (pageParam - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let filteredProducts = dummyAllProductData as unknown as Product[];

  if (query || isSoldOut || minPrice || maxPrice) {
    filteredProducts = dummyAllProductData.filter((product) => {
      const matchQuery = !query || product.title.toLowerCase().includes(query.toLowerCase())
      const matchSoldout = isSoldOut === "true" ? true : !product.stockOut;
      const matchPrice = product.price >= Number(minPrice) && product.price <= Number(maxPrice);
      
      return matchQuery && matchSoldout && matchPrice;
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
};

export const useProductService = () => {
  const { query, isSoldOut, minPrice, maxPrice } = useSearchParamsSafe();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['products', { query, isSoldOut, minPrice, maxPrice }],
    queryFn: ({ pageParam = 1 }) => {
      return getProducts({
        query,
        isSoldOut,
        minPrice,
        maxPrice,
        pageParam
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

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
