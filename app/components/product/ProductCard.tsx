import { Product } from "@/app/types/productTypes";
import Image from "next/image";
import { TfiClose } from "react-icons/tfi";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <section className="rounded-lg border border-gray-200 shadow-md relative">
      {product.stockOut && (
        <div className="bg-[#0000008a] absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center flex-col">
          <TfiClose className="text-white z-20 text-9xl" />
          <h3 className="text-white text-xl font-bold mt-3">
            품절된 상품입니다
          </h3>
        </div>
      )}

      <picture className="w-full h-[200px] block relative">
        <Image src={product.imgUrl} alt="product-image" fill />
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
