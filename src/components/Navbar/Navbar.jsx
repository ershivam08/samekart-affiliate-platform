import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const categories = [
    { name: "Electronics", icon: "📱", path: "/category/electronics" },
    { name: "Fashion", icon: "👕", path: "/category/fashion" },
    { name: "Home", icon: "🏠", path: "/category/home" },
    { name: "Appliances", icon: "🔌", path: "/category/appliances" },
    { name: "Beauty", icon: "💄", path: "/category/beauty" },
    { name: "Grocery", icon: "🛒", path: "/category/grocery" },
    { name: "Mobiles", icon: "📱", path: "/category/mobiles" },
    { name: "Toys", icon: "🧸", path: "/category/toys" },
    { name: "Sports", icon: "⚽", path: "/category/sports" },
    { name: "Books", icon: "📚", path: "/category/books" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">SameKart</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <span className="search-icon">🔍</span>
            </button>
          </form>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            <Link to="/admin" className="nav-action">
              <span className="action-icon">👤</span>
              <span className="action-text">Admin</span>
            </Link>

            <Link to="/cart" className="nav-action">
              <span className="action-icon">🛒</span>
              <span className="action-text">Cart</span>
            </Link>

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Category Bar - Only on Home Page */}
      <div className="category-bar">
        <div className="category-container">
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link key={index} to={category.path} className="category-item">
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mobile-search-input"
          />
          <button onClick={handleSearch} className="mobile-search-btn">
            🔍
          </button>
        </div>

        <div className="mobile-categories">
          <h3 className="mobile-categories-title">Categories</h3>
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="mobile-category-item"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mobile-category-icon">{category.icon}</span>
              <span className="mobile-category-name">{category.name}</span>
            </Link>
          ))}
        </div>

        <div className="mobile-actions">
          <Link
            to="/admin"
            onClick={() => setIsMenuOpen(false)}
            className="mobile-action"
          >
            <span className="mobile-action-icon">👤</span>
            <span className="mobile-action-text">Admin Panel</span>
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="mobile-action"
          >
            <span className="mobile-action-icon">🛒</span>
            <span className="mobile-action-text">My Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
