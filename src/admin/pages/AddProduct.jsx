import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { AuthContext } from "../../context/AuthContext";
import "../../admin/admin.css";

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    category: "",
    brand: "",
    description: "",
    image: "",
    inStock: true,
    affiliateLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = [
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!formData.name.trim()) {
      setError("Product name is required");
      setLoading(false);
      return;
    }

    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      setError("Please enter a valid price");
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    try {
      // Prepare product data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : parseFloat(formData.price),
        discount: formData.discount ? parseFloat(formData.discount) : 0,
        rating: 0,
        reviews: 0,
        images: [formData.image],
      };

      // Add product through context
      addProduct(productData);

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        originalPrice: "",
        discount: "",
        category: "",
        brand: "",
        description: "",
        image: "",
        inStock: true,
        affiliateLink: "",
      });

      setTimeout(() => {
        navigate("/admin/manage-products");
      }, 2000);
    } catch (err) {
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <div className="page-header">
            <h1>Add New Product</h1>
            <p>Fill in the details to add a new product to your store</p>
          </div>

          <div className="form-container">
            <form className="product-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">⚠️ {error}</div>}

              {success && <div className="success-message">✅ {success}</div>}

              <div className="form-grid">
                {/* Basic Information */}
                <div className="form-section">
                  <h3>Basic Information</h3>

                  <div className="form-group">
                    <label htmlFor="name">Product Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="price">Price (₹) *</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="2999"
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="originalPrice">Original Price (₹)</label>
                      <input
                        type="number"
                        id="originalPrice"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        placeholder="4999"
                        min="1"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="discount">Discount (%)</label>
                      <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        placeholder="40"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="category">Category *</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="brand">Brand</label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Enter brand name"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="form-section">
                  <h3>Product Details</h3>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      rows="5"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Image URL *</label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/product-image.jpg"
                      required
                    />
                    {formData.image && (
                      <div className="image-preview">
                        <img src={formData.image} alt="Preview" />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="affiliateLink">Affiliate Link</label>
                    <input
                      type="url"
                      id="affiliateLink"
                      name="affiliateLink"
                      value={formData.affiliateLink}
                      onChange={handleChange}
                      placeholder="https://example.com/affiliate-link"
                    />
                  </div>

                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                    />
                    <label htmlFor="inStock">In Stock</label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate("/admin/manage-products")}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Adding Product...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
