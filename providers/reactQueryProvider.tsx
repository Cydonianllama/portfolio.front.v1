"use client";

import { queryClient } from "@/setup/queryClient";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}