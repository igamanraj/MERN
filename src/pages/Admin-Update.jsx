import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "sonner";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  console.log("params single users: ", params);
  const { authorizationToken , API} = useAuth();

  // get single user data

  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `${API}/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`users single data: ${data}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  // to update the data dynamically
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        toast.error("Updation Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update user data</h1>
      </div>
      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Mobile</label>
              <input
                type="number"
                name="phone"
                placeholder="Enter your phone"
                id="phone"
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-submit">
              Update
            </button>
          </form>
        </section>
      </div>
    </section>
  );
};
