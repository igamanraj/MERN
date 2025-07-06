import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_URI_API;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  

  // Logout User Funtionality
  const LogoutUser = () => {
    toast.success("Logged out", {
      description: "You have been logged out successfully.",
      className: "backdrop-blur-md bg-white/60",
    });
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT Authentication - to get currently logged in user data

  const userAuthentication = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("User data",data.userData)
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        // console.log("Error fetching user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // to fetch the services data from the database
  const getServices = async () => {
    try {
      const response = await fetch(`${API}/Service`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.msg)
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error ${error}`);
    }
  };

  useEffect(() => {
      setIsLoading(true);
      getServices();
      userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
