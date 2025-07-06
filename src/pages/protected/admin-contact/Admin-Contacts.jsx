import { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";
import { toast } from "sonner";
import "./Admin-Contact.css";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

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
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API}/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
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

  const handleDeleteClick = (_id) => {
    setContactToDelete(_id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteContact(contactToDelete);
    setShowConfirm(false);
    setContactToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setContactToDelete(null);
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
              <div key={index} className="contact-card">
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Message:</strong> "{message}"</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(_id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Confirmation Modal */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <p>Are you sure you want to delete this contact?</p>
            <div className="btn-group">
              <button className="btn-confirm" onClick={confirmDelete}>Yes</button>
              <button className="btn-cancel" onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
