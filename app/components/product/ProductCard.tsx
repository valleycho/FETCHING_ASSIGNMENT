import { Product } from "@/app/types/productTypes";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <section className="rounded-lg border border-gray-200 shadow-md">
      <picture className="w-full h-[200px] block relative">
        <Image src="https://picsum.photos/200/200" alt="product-image" fill />
      </picture>

      <div className="p-4">
        <h3 className="font-bold text-sm">{product.title}</h3>
        <h4 className="font-medium text-sm">{product.description}</h4>
        <h4 className="font-medium text-sm">{product.brandName}</h4>

        <h4 className="text-xs text-slate-400 line-through">
          {product.price.toLocaleString()}원
        </h4>

        <div className="flex items-center gap-1.5">
          <h4 className="text-red-500 font-bold text-sm">{product.rate}%</h4>
          <h4 className="font-medium text-sm">
            {(
              product.price -
              (product.price * product.rate) / 100
            ).toLocaleString()}
            원
          </h4>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
