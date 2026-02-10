import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./CategoryBar.css";

const CategoryBar = () => {
  const location = useLocation();

  const categories = [
    { name: "Electronics", icon: "📱", path: "/category/electronics" },
    { name: "Fashion", icon: "👕", path: "/category/fashion" },
    { name: "Appliances", icon: "🔌", path: "/category/appliances" },
    { name: "Beauty", icon: "💄", path: "/category/beauty" },
    { name: "Grocery", icon: "🛒", path: "/category/grocery" },
    { name: "Mobiles", icon: "📱", path: "/category/mobiles" },
    { name: "Toys", icon: "🧸", path: "/category/toys" },
    { name: "Sports", icon: "⚽", path: "/category/sports" },
    { name: "Books", icon: "📚", path: "/category/books" },
  ];

  // Sirf home page pe category bar show karo
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="category-bar">
      <div className="category-container">
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="category-item"
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
