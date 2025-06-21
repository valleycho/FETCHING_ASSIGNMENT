"use client";

import { productService } from "@/app/service/product/ProductService";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types/productTypes";

const ProductList = () => {
  const { products } = productService();

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 mt-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
