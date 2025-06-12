import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/login"


export const Login = () => {
  const [user, setUser] = useState({
    email : "",
    password : "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name] : value
    })
  }

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)

      try {
          const response = await fetch(URL,{
            method : "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(user)
          });
          console.log("Login",response)
          if(response.ok){
            setUser({
              email : "",
              password : "",
            })
            navigate("/")
          }else{
            alert("invalid credentials")
            console.log("invalid credentials")
          }
      } catch (error) {
        console.log(error)
      }
    
  }

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
                <h1>Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      autoComplete="off"
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
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
