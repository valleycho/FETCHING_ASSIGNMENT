import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 mt-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard key={index} />
      ))}
    </section>
  );
};

export default ProductList;
