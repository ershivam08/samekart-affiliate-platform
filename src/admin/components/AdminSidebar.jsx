import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const menuItems = [
    { path: "/admin", icon: "📊", label: "Dashboard" },
    { path: "/admin/add-product", icon: "➕", label: "Add Product" },
    { path: "/admin/manage-products", icon: "📋", label: "Manage Products" },
    { path: "/admin/orders", icon: "📦", label: "Orders" },
    { path: "/admin/customers", icon: "👥", label: "Customers" },
    { path: "/admin/analytics", icon: "📈", label: "Analytics" },
    { path: "/admin/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span>🛒</span>
          <h2>SameKart Admin</h2>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="version-info">
          <span>Version 1.0.0</span>
        </div>
        <div className="help-link">
          <a href="/help">❓ Help & Support</a>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
