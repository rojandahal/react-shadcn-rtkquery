import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashboardLayout from "./pages/dashboard/Layout";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function RequireAuth({ children }: { children: React.ReactNode }) {
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );
  // if (!isAuthenticated) {
  //   return <Navigate to="/auth/login" replace />;
  // }
  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/dashboard/*"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
