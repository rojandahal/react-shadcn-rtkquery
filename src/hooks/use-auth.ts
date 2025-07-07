"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "@/store/slices/authSlice";
import { useStorage } from "./use-storage";
import { type AuthUser } from "@/types/user";
import { STORAGE_KEYS } from "@/constants/storage.constant";

export function useAuth() {
  const dispatch = useDispatch();
  const { getItem, getJson, clear } = useStorage();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const storedUser = getJson(STORAGE_KEYS.USER) as AuthUser;

        const currentUser = {
          ...storedUser,
        };

        if (token) {
          dispatch(
            setCredentials({
              user: currentUser,
              token,
            })
          );
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        handleLogout();
      }
    };

    initAuth();
  }, [dispatch, getItem, getJson]);

  const handleLogout = () => {
    dispatch(logout());
    clear();
    window.location.href = "/auth/login";
  };

  const isLoggedIn = () => {
    return !!getItem(STORAGE_KEYS.ACCESS_TOKEN);
  };

  return { handleLogout, isLoggedIn };
}
