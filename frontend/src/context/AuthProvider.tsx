import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthData = {
  token: string;
  username: string;
};

type AuthContextType = {
  getAuth: () => AuthData;
  addAuth: (data: AuthData) => void;
  removeAuth: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthProvider() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthProvider must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState<AuthData>(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : { token: "", username: "" };
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const getAuth = () => auth;

  function addAuth(data: AuthData) {
    setAuth(data);
  }

  const removeAuth = () => {
    setAuth({ token: "", username: "" });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ getAuth, addAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
