"use client";

import { useProductService } from "@/app/service/product/useProductService";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types/productTypes";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";

const ProductList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const skeletonSize = 15;

  const {
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProductService();

  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [loadMoreRef.current, hasNextPage, fetchNextPage]);

  return (
    <section className="pb-4">
      {query && (
        <div className="flex">
          <h3 className="font-bold text-sm">'{query}'</h3>
          <h3 className="font-medium text-sm">에 대한 검색 결과</h3>
          <h3 className="ml-2 font-bold text-sm text-slate-500">
            ({products.length}개)
          </h3>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 mt-6">
        {!isLoading &&
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        {isLoading &&
          Array.from({ length: skeletonSize }).map((_, idx) => (
            <div
              key={idx}
              className="w-[376px] h-[330px] bg-gray-300 animate-pulse"
            />
          ))}
      </div>

      <div ref={loadMoreRef} className="h-0.5" />

      {isFetchingNextPage && (
        <div className="flex flex-col items-center mt-4">
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h4 className="font-bold text-sm mt-3">
            상품을 불러오는 중입니다...
          </h4>
        </div>
      )}
    </section>
  );
};

export default ProductList;
