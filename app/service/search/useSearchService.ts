import { dummyAllProductData } from "@/app/data/dummyProductData";
import { SearchResult } from "@/app/types/searchTypes";
import { useQuery } from "@tanstack/react-query";

const searchProducts = async (query: string): Promise<SearchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query.trim() || query.length < 2) {
    return [];
  }
  
  const filtered = dummyAllProductData
    .filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 15)
    .map((product) => ({
      id: product.id,
      title: product.title,
    }));

  return filtered;
}

export const useSearchProductsService = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length >= 2,
    retry: false
  });
};