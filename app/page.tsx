import { Metadata } from "next";
import Header from "./components/header/Header";
import ProductList from "./components/product/ProductList";
import SideNavigator from "./components/sideNavigator/SideNavigator";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string; isSoldOut?: string };
}): Promise<Metadata> {
  const query = searchParams.q;
  const isSoldOut = searchParams.isSoldOut;

  if (query) {
    return {
      title: `'${query}' 검색 결과`,
      description: `'${query}'에 대한 검색 결과입니다. ${
        isSoldOut === "true" ? "품절 상품을 포함한" : ""
      } 다양한 상품을 확인해보세요.`,
      openGraph: {
        title: `'${query}' 검색 결과`,
        description: `'${query}'에 대한 검색 결과입니다.`,
      },
      twitter: {
        title: `'${query}' 검색 결과`,
        description: `'${query}'에 대한 검색 결과입니다.`,
      },
    };
  }

  return {
    title: "상품 검색 및 쇼핑몰",
    description: "다양한 상품을 검색하고 구매할 수 있는 온라인 쇼핑몰입니다.",
  };
}

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
