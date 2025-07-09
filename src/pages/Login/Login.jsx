import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from "sonner";
import "./Login.css"; 
import  GoogleSignInButton  from "../../component/GoogleSignInButton";


export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS , API, isLoggedIn } = useAuth();

  

  

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("Login", response);
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.extraDetails ? res_data.extraDetails : res_data.message || "Login Successfully",{description : "You have successfully logged in to your account"})
        storeTokenInLS(res_data.token);
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message || "Login Failed")
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="/images/login.png"
                  alt="login"
                  width={500}
                  height={500}
                />
              </div>
              {/* Login Form  */}
              <div className="login-form">
                <h2>Login Now</h2>
                <form onSubmit={handleSubmit} autoComplete="on">
                  <div>
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      autoComplete="on"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="Password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      id="password"
                      required
                      autoComplete="on"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn">Submit</button>

                  <GoogleSignInButton />

                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
