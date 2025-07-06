import { useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "sonner";

const defaultContactForm = {
  username : "",
  email : "",
  message : "",
}

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactForm );

  const [userData, setUserData] = useState(true)

  const { user, API } = useAuth();

  if(userData && user){
    setContact({
      username : user.username,
      email : user.email,
      message : "",
    })
    setUserData(false);
  }

  // handle input functionality

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // setContact({
    //   ...contact,
    //   [name]: value,
    // });

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact);

    try {
      const response = await fetch(`${API}/contact`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      console.log("contact", response);
      if (response.ok) {
        setContact(defaultContactForm);
        const data = await response.json()
        console.log(data);
        toast.success("Message sent successfully")
      }
    } catch (error) {
      alert("Message not send")
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <section className="section-contact">
          <div className="contact-content container">
            <h1 className="main-heading">Contact Us</h1>
          </div>
          <div className="container grid grid-two-cols">
            <div className="contact-image">
              <img
                src="./images/support.png"
                alt="Contact form"
                width={500}
                height={500}
              />
            </div>
            <div>
              <section className="section-form">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      required
                      autoComplete="off"
                      value={contact.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      autoComplete="off"
                      value={contact.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="message">message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                      required
                      autoComplete="off"
                      cols="30"
                      rows="6"
                      value={contact.message}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </section>
            </div>
          </div>
          <section className="mb-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14241.326729861587!2d80.9092969396655!3d26.829400823568587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdc8bfb928d5%3A0x9f9163ace7ebaf6c!2sCharbagh%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1743871664075!5m2!1sen!2sin"
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        </section>
      </main>
    </>
  );
};
