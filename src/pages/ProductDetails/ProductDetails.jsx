import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, trackAffiliateClick, loading } =
    useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id, products]);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    alert(`${quantity} ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    trackAffiliateClick(product.id);
    window.open(product.affiliateLink, "_blank");
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button className="btn-primary" onClick={() => navigate("/products")}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate("/")}>Home</span>
          <span> / </span>
          <span
            onClick={() =>
              navigate(`/category/${product.category.toLowerCase()}`)
            }
          >
            {product.category}
          </span>
          <span> / </span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-details-container">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-meta">
              <span className="brand">Brand: {product.brand}</span>
              <span className="category">Category: {product.category}</span>
            </div>

            <div className="product-rating">
              <div className="stars">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="product-price-section">
              <div className="price-row">
                <span className="current-price">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="original-price">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <div className="discount-badge">{product.discount}% OFF</div>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={incrementQuantity}>
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="stock-status">
              {product.inStock ? (
                <span className="in-stock">✅ In Stock</span>
              ) : (
                <span className="out-of-stock">❌ Out of Stock</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              {product.inStock ? (
                <>
                  <button className="btn-add-to-cart" onClick={handleAddToCart}>
                    🛒 Add to Cart
                  </button>
                  <button className="btn-buy-now" onClick={handleBuyNow}>
                    ⚡ Buy Now
                  </button>
                </>
              ) : (
                <button className="btn-notify" disabled>
                  🔔 Notify When Available
                </button>
              )}
            </div>

            {/* Product Features */}
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>🛡️ 100% Authentic Products</li>
                <li>🚚 Free Shipping on orders above ₹499</li>
                <li>↩️ Easy Returns & Refunds</li>
                <li>📞 24/7 Customer Support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>You may also like</h2>
          <div className="related-grid">
            {products
              .filter(
                (p) => p.category === product.category && p.id !== product.id,
              )
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="related-card"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <div className="related-info">
                    <h4>{relatedProduct.name}</h4>
                    <div className="related-price">
                      ₹{relatedProduct.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
