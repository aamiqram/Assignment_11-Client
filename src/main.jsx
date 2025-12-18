import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthProvider";
import StripeProvider from "./components/StripeProvider";
import router from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StripeProvider>
          <RouterProvider router={router} />
        </StripeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
