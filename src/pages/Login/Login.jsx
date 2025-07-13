import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from "sonner";
import "./Login.css";
import GoogleSignInButton from "../../component/GoogleSignInButton/GoogleSignInButton";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { storeTokenInLS, API, isLoggedIn } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    setUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic client-side validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      const res_data = await response.json();
      
      if (response.ok) {
        toast.success(
          res_data.extraDetails || res_data.message || "Login Successful!",
          {
            description: "You have successfully logged in to your account"
          }
        );
        
        storeTokenInLS(res_data.token);
        
        // Reset form
        setUser({
          email: "",
          password: "",
        });
        
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails || res_data.message || "Login Failed"
        );
        
        // Set server-side errors
        if (res_data.errors) {
          setErrors(res_data.errors);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-section-page-container">
      <main>
        <div className="section-login">
          <div className="container grid grid-two-cols">
            {/* Image Section */}
            <div className="login-image">
              <img
                src="/images/login.png"
                alt="Login illustration"
                width={500}
                height={500}
                loading="lazy"
              />
            </div>

            {/* Login Form */}
            <div className="login-form">
              <h2>Login Now</h2>
              
              <form onSubmit={handleSubmit} autoComplete="on" noValidate>
                {/* Email Field */}
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    value={user.email}
                    onChange={handleInput}
                    onKeyPress={handleKeyPress}
                    className={errors.email ? "error" : ""}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="error-message" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    value={user.password}
                    onChange={handleInput}
                    onKeyPress={handleKeyPress}
                    className={errors.password ? "error" : ""}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  {errors.password && (
                    <span id="password-error" className="error-message" role="alert">
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn"
                  disabled={loading}
                  aria-label={loading ? "Logging in..." : "Login"}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* Google Sign In Button */}
                <GoogleSignInButton />
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};