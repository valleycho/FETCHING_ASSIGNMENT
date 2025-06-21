import Image from "next/image";

const ProductCard = () => {
  return (
    <section className="rounded-lg border border-gray-200 shadow-md">
      <picture className="w-full h-[200px] block relative">
        <Image src="https://picsum.photos/200/200" alt="product-image" fill />
      </picture>

      <div className="p-4">
        <h3 className="font-bold text-sm">상품 제목</h3>
        <h4 className="font-medium text-sm">상품 설명</h4>
        <h4 className="font-medium text-sm">브랜드명</h4>

        <h4 className="text-xs text-slate-400 line-through">100,000원</h4>

        <div className="flex items-center gap-1.5">
          <h4 className="text-red-500 font-bold text-sm">30%</h4>
          <h4 className="font-medium text-sm">50,000원</h4>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
