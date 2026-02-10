import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, trackAffiliateClick } = useContext(ProductContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    alert(`${product.name} added to cart!`);
  };

  const handleAffiliateClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    trackAffiliateClick(product.id);
    window.open(product.affiliateLink || "#", "_blank");
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        {/* Product Image */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.discount > 0 && (
            <div className="discount-badge">{product.discount}% OFF</div>
          )}
          {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-category">{product.category}</div>

          {/* Rating */}
          <div className="product-rating">
            <span className="stars">
              {"★".repeat(Math.floor(product.rating))}
            </span>
            <span className="rating-text">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="product-price">
            <span className="current-price">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="original-price">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.discount > 0 && (
              <span className="discount">{product.discount}% off</span>
            )}
          </div>

          {/* Brand */}
          {product.brand && (
            <div className="product-brand">Brand: {product.brand}</div>
          )}

          {/* Actions */}
          <div className="product-actions">
            {product.inStock ? (
              <>
                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="btn-buy-now" onClick={handleAffiliateClick}>
                  Buy Now
                </button>
              </>
            ) : (
              <button className="btn-notify" disabled>
                Notify Me
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
