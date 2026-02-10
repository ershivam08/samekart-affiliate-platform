import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🛒 SameKart</h3>
            <p>Your one-stop destination for all shopping needs.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li>
                <a href="/category/electronics">Electronics</a>
              </li>
              <li>
                <a href="/category/fashion">Fashion</a>
              </li>
              <li>
                <a href="/category/home">Home</a>
              </li>
              <li>
                <a href="/category/sports">Sports</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@samekart.com</p>
            <p>Phone: +91 9876543210</p>
            <p>Address: 123 Street, City, Country</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 SameKart. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
