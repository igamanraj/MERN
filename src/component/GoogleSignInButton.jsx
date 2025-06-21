import { useState } from "react";
import React from "react";
import { auth, provider, signInWithPopup } from "../../firebase";
import "../component/GoogleSignInButton.css"; // Assuming you have a CSS file for styles
import { useAuth } from "../store/Auth"; // Adjust the import path as necessary

const GoogleSignInButton = ({ onSuccess, onError }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { API } = useAuth(); // Access the API URL from Auth context

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // You can access user details here

      const userData = {
        displayName: user.displayName || "No Name",
        email: user.email || "No Email",
        photoURL: user.photoURL || "No Photo URL",
        uid: user.uid,
      };
      // Log user info to the console
      console.log("User Info:", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      });

      const response = await fetch(`${API}/google-signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server Response:", data);
      } else {
        console.error("Error signing in with Google");
      }

      if (onSuccess) onSuccess(user); // optional callback
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      if (onError) onError(error); // optional callback
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
