import { useState } from "react";
import { auth, provider, signInWithPopup } from "../../firebase";
import { useAuth } from "../store/Auth"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Assuming you are using Sonner for notifications

const GoogleSignInButton = ({ onSuccess, onError }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLS,API } = useAuth(); // Access the API URL from Auth context
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      // Send the token to your backend for verification and to create a session
      const response = await fetch(`${API}/google-signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email, displayName: user.displayName, photoURL: user.photoURL, uid: user.uid, phone: user.phoneNumber }),
      });

      const res_data = await response.json();
      
      if (response.ok) {
        toast.success(res_data.extraDetails ? res_data.extraDetails : res_data.message || "Login Successfully", { description: "You have successfully logged in to your account" });
        onSuccess && onSuccess(res_data);
        
        storeTokenInLS(res_data.token); // Assuming you have a function to store the token
         navigate("/");
         console.log("User signed in successfully:", result);
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message || "Login Failed");
        onError && onError(res_data);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In Failed");
      onError && onError(error);
    } 
  };

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
