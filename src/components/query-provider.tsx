"use client";

import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export default function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  return <Provider client={queryClient}>{children}</Provider>;
}
