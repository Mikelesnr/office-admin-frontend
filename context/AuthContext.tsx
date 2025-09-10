"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { User, LoginPayload, RegisterPayload } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  isRegisterOpen: boolean;
  openRegister: () => void;
  closeRegister: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const { data } = await api.get<User>("/api/user");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await api.post("/login", { email, password });
      await fetchUser();
      toast.success("Logged in successfully");
    } catch {
      toast.error("Login failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      await api.post("/register", payload);
      await fetchUser();
      toast.success("Account created");
      closeRegister();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        isRegisterOpen,
        openRegister,
        closeRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
