import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "sonner";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      //   console.log("Contact Data", data);
      if (response.ok) {
        setContactData(data);
        // console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `${API}/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log("Contacts after deletion :", data);
      if (response.ok) {
        getContactsData();
        toast.success("Contact Deleted", {
          description: "You just deleted a contact.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data</h1>

        <div className="container admin-contacts">
          {contactData.map((currContactData, index) => {
            const { username, email, message, _id } = currContactData;

            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button
                  className="delete-btn"
                  onClick={() => deleteContact(_id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
