import Image from "next/image";
import ProductCard from "./components/product/ProductCard";
import Header from "./components/header/Header";
import ProductList from "./components/product/ProductList";
import SideNavigator from "./components/sideNavigator/SideNavigator";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex justify-center h-[calc(100vh-128px)]">
        <div className="max-w-[1400px] w-full flex">
          <SideNavigator />

          <article className="flex-col p-4 w-full">
            <div className="flex">
              <h3 className="font-bold text-sm">'듀오백'</h3>
              <h3 className="font-medium text-sm">에 대한 검색 결과</h3>
            </div>

            <ProductList />
          </article>
        </div>
      </main>
    </>
  );
}
