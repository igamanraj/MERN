import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from "sonner";
import { images } from "../../assets"; // Adjust the path as necessary
import "./Register.css";

const profilePicture = Object.values(images);

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // Assign a random avatar
  const randomAvatar = profilePicture[Math.floor(Math.random() * profilePicture.length)];

  const navigate = useNavigate();

  const { storeTokenInLS, API } = useAuth();

  // handling the input value
  const handleInput = (e) => {
    // console.log(e);
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

    // Create a new object that includes the random avatar
    const userData = {
      ...user,
      profilePicture: randomAvatar,
    };

    console.log("randomAvatar: ", randomAvatar);

    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const res_data = await response.json();
      console.log("response from server", res_data.message);
      // console.log(response);

      if (response.ok) {
        // store token in localstorage
        storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
          profilePicture: randomAvatar, // Assign the random avatar
        });
        toast.success("Registration Successfull", {
          description: "You are successfyully registered",
        });
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("Register Error: ", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="Registration"
                  width="500"
                  height="500"
                />
              </div>
              {/* Registration form  */}
              <div className="registration-form">
                <h1>Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your name"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
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
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter your phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
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
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
