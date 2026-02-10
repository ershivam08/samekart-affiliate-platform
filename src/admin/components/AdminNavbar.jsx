import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./AdminNavbar.css";

const AdminNavbar = ({ user, onLogout }) => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <div className="user-avatar">{user?.name?.charAt(0) || "A"}</div>
          <div className="user-details">
            <span className="user-name">{user?.name || "Admin"}</span>
            <span className="user-role">{user?.role || "Administrator"}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
