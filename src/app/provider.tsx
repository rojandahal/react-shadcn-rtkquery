import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        {children}
        <Toaster />
      </Provider>
    </ThemeProvider>
  );
}
