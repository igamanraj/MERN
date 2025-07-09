import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!hasLoggedOut.current) {
      LogoutUser();
      hasLoggedOut.current = true;
    }
  }, [LogoutUser]);

  return <Navigate to="/Login" />;
};
