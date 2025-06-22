import { Metadata } from "next";
import Header from "./components/header/Header";
import ProductList from "./components/product/ProductList";
import SideNavigator from "./components/sideNavigator/SideNavigator";
import { Suspense } from "react";
import { getProducts } from "./service/product/useProductService";
import { createServerQueryClient } from "./lib/serverQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "next/dist/server/request/search-params";
import { MAX_LIMIT_PRICE } from "./data/productConstant";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q;
  const isSoldOut = params.isSoldOut;

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
      metadataBase: new URL("http://localhost:3000"),
    };
  }

  return {
    title: "상품 검색 및 쇼핑몰",
    description: "다양한 상품을 검색하고 구매할 수 있는 온라인 쇼핑몰입니다.",
    metadataBase: new URL("http://localhost:3000"),
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const queryClient = createServerQueryClient();

  // 서버 사이드에서 데이터 프리페칭
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "products",
      {
        query: params.q || "",
        isSoldOut: params.isSoldOut || "false",
        minPrice: params.minPrice || "0",
        maxPrice: params.maxPrice || MAX_LIMIT_PRICE.toString(),
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({
        query: params.q as string,
        isSoldOut: params.isSoldOut as string,
        minPrice: params.minPrice as string,
        maxPrice: params.maxPrice as string,
        pageParam,
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className="flex justify-center h-[calc(100vh-128px)]">
        <div className="max-w-[1400px] w-full flex">
          <Suspense fallback={<></>}>
            <SideNavigator />
          </Suspense>

          <article className="flex-col p-4 w-full border-l border-l-slate-200">
            <Suspense fallback={<></>}>
              <ProductList />
            </Suspense>
          </article>
        </div>
      </main>
    </HydrationBoundary>
  );
}
