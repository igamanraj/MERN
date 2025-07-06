import { useEffect, useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "../../firebase";
import "../component/GoogleSignInButton.css";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleSignInButton = ({ onSuccess, onError }) => {
  const { storeTokenInLS, API } = useAuth();
  const navigate = useNavigate();

  // Detect mobile device
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleGoogleSignIn = async () => {
    try {
      if (isMobile) {
        console.log("Using redirect for Google sign-in on mobile");
        await signInWithRedirect(auth, provider);
      } else {
        console.log("Using popup for Google sign-in on desktop");
        const result = await signInWithPopup(auth, provider);
        await handleUserLogin(result.user);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In Failed");
      onError && onError(error);
    }
  };

  // Function to send Google user data to your backend
  const handleUserLogin = async (user) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API}/google-signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          phone: user.phoneNumber,
        }),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success(
          res_data.extraDetails || res_data.message || "Login Successful",
          {
            description: "You have successfully logged in to your account",
          }
        );
        onSuccess && onSuccess(res_data);
        storeTokenInLS(res_data.token);
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails || res_data.message || "Login Failed"
        );
        onError && onError(res_data);
      }
    } catch (error) {
      console.error("Error in handleUserLogin:", error);
      toast.error("Login Failed");
    }
  };

  // Run on mount to handle redirect result (for mobile login)
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log("Redirect result received:", result);
          await handleUserLogin(result.user);
        }
      } catch (error) {
        console.error("Redirect sign-in error:", error);
        toast.error("Google Sign-In Redirect Failed");
        onError && onError(error);
      }
    };

    checkRedirectResult();
  }, []);

  return (
    <button onClick={handleGoogleSignIn} className="google-signin-btn">
      <img
        src="https://img.icons8.com/color/16/000000/google-logo.png"
        alt="Google"
        style={{ marginRight: "8px" }}
      />
      <p>Continue with Google</p>
    </button>
  );
};

export default GoogleSignInButton;
