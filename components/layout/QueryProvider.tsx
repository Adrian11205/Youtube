"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface QueryProps {
  children: React.ReactNode;
}


export default function QueryProvider({ children }: QueryProps) {
    const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
