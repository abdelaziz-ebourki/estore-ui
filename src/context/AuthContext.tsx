import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "admin" | "customer" | null;

interface AuthContextType {
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => 
    localStorage.getItem("user_role") as UserRole
  );

  const login = (role: UserRole) => {
    localStorage.setItem("user_role", role || "");
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("user_role");
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
