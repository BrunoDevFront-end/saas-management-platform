"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthenticatedContextType {
  isAuthenticated: boolean | null;
  login: () => void;
  logout: () => void;
}

interface AuthenticatedProviderProps {
  children: ReactNode;
}

const Authenticated = createContext<AuthenticatedContextType | null>(null);

export function AuthenticatedProvider({
  children,
}: AuthenticatedProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return !!localStorage.getItem("token");
  });

  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("company");

    setIsAuthenticated(false);
  }

  return (
    <Authenticated.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </Authenticated.Provider>
  );
}

export function useAuthenticated() {
  const context = useContext(Authenticated);

  if (!context) {
    throw new Error(
      "useAuthenticated deve ser usado dentro de AuthenticatedProvider",
    );
  }

  return context;
}
