"use client";

import { useSearchParams } from "next/navigation";
import { MAX_LIMIT_PRICE } from "../data/productConstant";

export const useSearchParamsSafe = () => {
  const searchParams = useSearchParams();
  
  return {
    query: searchParams.get("q") || "",
    isSoldOut: searchParams.get("isSoldOut") || "false",
    minPrice: searchParams.get("minPrice") || "0",
    maxPrice: searchParams.get("maxPrice") || MAX_LIMIT_PRICE.toString(),
  };
};