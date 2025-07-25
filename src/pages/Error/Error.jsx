import { NavLink } from "react-router-dom";
import "./Error.css"; // Assuming you have a CSS file for styling 
export const Error = () => {
  return (
    <>
    <main className="error-page-container">
      <section className="error-page">
        <div className="content">
          <h2 className="header">404</h2>
          <h4>Sorry! Page not found</h4>
          <p>
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="btns">
            <NavLink to="/">return home </NavLink>
            <NavLink to="/contact">report problem</NavLink>
          </div>
        </div>
      </section>
    </main>
      
    </>
  );
};
