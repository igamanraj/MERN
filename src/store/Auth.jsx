import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("")
  const [services, setServices] = useState([])

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  // console.log("isLoggedIn", isLoggedIn);

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
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.ok){
        const data = await response.json();
        // console.log("User data",data.userData)
        setUser(data.userData);
      }else{
        console.log("Error fetching user data")
      }
    } catch (error) {
      console.error(error);
    }
  };

  // to fetch the services data from the database
  const getServices = async() =>{
      try {
        const response = await fetch("http://localhost:5000/Service",{
          method: "GET"
        })
        if(response.ok){
          const data = await response.json();
          // console.log(data.msg)
          setServices(data.msg)
        }
      } catch (error) {
        console.log(`services frontend error ${error}`)
      }
  }


  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services}}>
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
