import { NavLink } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-logo">NanoTech</h3>
            <p className="footer-description">
              Leading innovation in nanotechnology solutions for a better tomorrow.
            </p>
            <div className="social-links">
              <NavLink to="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </NavLink>
              <NavLink to="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </NavLink>
              <NavLink to="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </NavLink>
              <NavLink to="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </NavLink>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>
              <li><NavLink to="/products">Products</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><NavLink to="#research">Research & Development</NavLink></li>
              <li><NavLink to="#manufacturing">Manufacturing</NavLink></li>
              <li><NavLink to="#consulting">Consulting</NavLink></li>
              <li><NavLink to="#support">Technical Support</NavLink></li>
              <li><NavLink to="#training">Training</NavLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Innovation Street, Tech City, TC 12345</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1(555) 123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@nanotech.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="newsletter-text">
              Subscribe to get updates on our latest innovations.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © NanoTech 2025. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <NavLink to="#privacy">Privacy Policy</NavLink>
              <NavLink to="#terms">Terms of Service</NavLink>
              <NavLink to="#cookies">Cookie Policy</NavLink>
              <NavLink to="#sitemap">Sitemap</NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};