import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { ProductContext } from "../../context/ProductContext";
import "./ProductSection.css";

const ProductSection = ({ title, products, viewAllLink }) => {
  const { loading } = useContext(ProductContext);

  if (loading) {
    return (
      <div className="product-section">
        <div className="section-header">
          <h2>{title}</h2>
        </div>
        <div className="loading-products">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="product-section">
      <div className="section-header">
        <h2>{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="view-all">
            View All →
          </Link>
        )}
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
