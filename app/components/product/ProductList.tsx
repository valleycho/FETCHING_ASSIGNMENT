"use client";

import { useProductService } from "@/app/service/product/useProductService";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types/productTypes";
import { useSearchParams } from "next/navigation";

const ProductList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { products } = useProductService();

  return (
    <section>
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
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
