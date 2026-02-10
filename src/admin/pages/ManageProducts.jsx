import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { AuthContext } from "../../context/AuthContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "../../admin/admin.css";

const ManageProducts = () => {
  const { products, deleteProduct, updateProduct } = useContext(ProductContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const categories = [
    "all",
    "Electronics",
    "Fashion",
    "Home",
    "Appliances",
    "Beauty",
    "Grocery",
    "Mobiles",
    "Toys",
    "Sports",
    "Books",
  ];

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const filterProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    setFilteredProducts(filtered);
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      category: product.category,
      brand: product.brand,
      description: product.description,
      image: product.image,
      inStock: product.inStock,
      affiliateLink: product.affiliateLink || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditSubmit = (productId) => {
    const updatedProduct = {
      ...editForm,
      price: parseFloat(editForm.price),
      originalPrice: parseFloat(editForm.originalPrice),
      discount: parseFloat(editForm.discount),
    };

    updateProduct(productId, updatedProduct);
    setEditingProduct(null);
    alert("Product updated successfully!");
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    setShowDeleteConfirm(null);
    alert("Product deleted successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const confirmDelete = (productId) => {
    setShowDeleteConfirm(productId);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar user={user} onLogout={handleLogout} />

        <div className="admin-content">
          <div className="page-header">
            <h1>Manage Products</h1>
            <p>View, edit, and delete products in your store</p>
          </div>

          {/* Filters and Search */}
          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>🔍</button>
            </div>

            <div className="filter-controls">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              <button
                className="btn-primary"
                onClick={() => navigate("/admin/add-product")}
              >
                ➕ Add New Product
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="table-container">
            {filteredProducts.length === 0 ? (
              <div className="no-data">
                <div className="no-data-icon">📦</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button
                  className="btn-primary"
                  onClick={() => navigate("/admin/add-product")}
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>#{product.id}</td>
                      <td>
                        <div className="product-cell">
                          <img src={product.image} alt={product.name} />
                          <div className="product-info">
                            <span className="product-name">{product.name}</span>
                            <span className="product-brand">
                              {product.brand}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>
                        {editingProduct === product.id ? (
                          <input
                            type="number"
                            name="price"
                            value={editForm.price}
                            onChange={handleEditChange}
                            className="edit-input"
                          />
                        ) : (
                          `₹${product.price.toLocaleString()}`
                        )}
                      </td>
                      <td>
                        {editingProduct === product.id ? (
                          <select
                            name="inStock"
                            value={editForm.inStock}
                            onChange={handleEditChange}
                            className="edit-select"
                          >
                            <option value={true}>In Stock</option>
                            <option value={false}>Out of Stock</option>
                          </select>
                        ) : (
                          <span
                            className={`stock-badge ${product.inStock ? "in-stock" : "out-stock"}`}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        )}
                      </td>
                      <td>
                        <span className="status-badge active">Active</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {editingProduct === product.id ? (
                            <>
                              <button
                                className="btn-save"
                                onClick={() => handleEditSubmit(product.id)}
                              >
                                💾
                              </button>
                              <button
                                className="btn-cancel"
                                onClick={() => setEditingProduct(null)}
                              >
                                ❌
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn-edit"
                                onClick={() => handleEdit(product)}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => confirmDelete(product.id)}
                              >
                                🗑️
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Summary */}
          <div className="summary-section">
            <div className="summary-card">
              <h3>📊 Product Summary</h3>
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="label">Total Products:</span>
                  <span className="value">{products.length}</span>
                </div>
                <div className="summary-item">
                  <span className="label">In Stock:</span>
                  <span className="value">
                    {products.filter((p) => p.inStock).length}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Out of Stock:</span>
                  <span className="value">
                    {products.filter((p) => !p.inStock).length}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Categories:</span>
                  <span className="value">
                    {[...new Set(products.map((p) => p.category))].length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button onClick={() => setShowDeleteConfirm(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this product?</p>
              <p className="warning">This action cannot be undone!</p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
