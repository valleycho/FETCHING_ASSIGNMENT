import { QueryClient } from "@tanstack/react-query";

// 서버에서만 사용하는 QueryClient 생성 함수
export function createServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
} 