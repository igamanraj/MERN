import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/Auth.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <App />
      <Toaster richColors position="top-center" expand/>
    </StrictMode>
  </AuthProvider>
);
