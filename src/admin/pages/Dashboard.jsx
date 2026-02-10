import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../../admin/admin.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { products, cart } = useContext(ProductContext);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalClicks: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate stats
    const totalProducts = products.length;
    const totalSales = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalRevenue = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Get affiliate clicks from localStorage
    const affiliateClicks = JSON.parse(
      localStorage.getItem("affiliateClicks") || "[]",
    );
    const totalClicks = affiliateClicks.length;

    setStats({
      totalProducts,
      totalSales,
      totalRevenue,
      totalClicks,
    });
  }, [products, cart]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar user={user} onLogout={handleLogout} />

        <div className="admin-content">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.name || "Admin"}!</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#4caf50" }}>
                📦
              </div>
              <div className="stat-info">
                <h3>{stats.totalProducts}</h3>
                <p>Total Products</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#2196f3" }}>
                💰
              </div>
              <div className="stat-info">
                <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#ff9800" }}>
                🛒
              </div>
              <div className="stat-info">
                <h3>{stats.totalSales}</h3>
                <p>Total Sales</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: "#9c27b0" }}>
                👁️
              </div>
              <div className="stat-info">
                <h3>{stats.totalClicks}</h3>
                <p>Affiliate Clicks</p>
              </div>
            </div>
          </div>

          {/* Recent Products */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Products</h2>
              <button
                className="btn-primary"
                onClick={() => navigate("/admin/add-product")}
              >
                Add New Product
              </button>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td>#{product.id}</td>
                      <td>
                        <div className="product-cell">
                          <img src={product.image} alt={product.name} />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>₹{product.price.toLocaleString()}</td>
                      <td>
                        <span
                          className={`stock-badge ${product.inStock ? "in-stock" : "out-stock"}`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-edit"
                            onClick={() =>
                              navigate(`/admin/edit-product/${product.id}`)
                            }
                          >
                            Edit
                          </button>
                          <button className="btn-delete">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button
                className="quick-action-btn"
                onClick={() => navigate("/admin/add-product")}
              >
                <span>➕</span>
                <span>Add Product</span>
              </button>
              <button
                className="quick-action-btn"
                onClick={() => navigate("/admin/manage-products")}
              >
                <span>📋</span>
                <span>Manage Products</span>
              </button>
              <button className="quick-action-btn">
                <span>📊</span>
                <span>View Reports</span>
              </button>
              <button className="quick-action-btn">
                <span>👥</span>
                <span>Manage Users</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
