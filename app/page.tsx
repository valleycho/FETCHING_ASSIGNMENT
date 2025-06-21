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

          <article className="flex-col p-4 w-full border-l border-l-slate-200">
            <ProductList />
          </article>
        </div>
      </main>
    </>
  );
}
