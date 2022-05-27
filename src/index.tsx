import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </RecoilRoot>
);
