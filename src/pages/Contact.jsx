import { useState } from "react";

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
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
        </section>
      </main>
    </>
  );
};
