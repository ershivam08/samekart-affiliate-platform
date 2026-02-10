import React, { useState, useEffect, useContext } from "react";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import ProductSection from "../../components/ProductSection/ProductSection";
import { ProductContext } from "../../context/ProductContext";
import "./Home.css";

const Home = () => {
  const { products, loading } = useContext(ProductContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Featured products (first 3)
      setFeaturedProducts(products.slice(0, 3));

      // Best sellers (all products)
      setBestSellers([...products]);

      // Deals of the day (products with discount > 30)
      const dealsProducts = products.filter((product) => product.discount > 30);
      setDeals(dealsProducts.slice(0, 4));
    }
  }, [products]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Banner Slider */}
        <div className="banner-section">
          <BannerSlider />
        </div>

        {/* Category Bar */}
        <CategoryBar />

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <>
            <div className="section-header">
              <h2>Featured Products</h2>
              <a href="/products?category=featured" className="view-all-link">
                View All →
              </a>
            </div>
            <ProductSection products={featuredProducts} />
          </>
        )}

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <>
            <div className="section-header">
              <h2>Best Sellers</h2>
              <a
                href="/products?category=bestsellers"
                className="view-all-link"
              >
                View All →
              </a>
            </div>
            <ProductSection products={bestSellers} />
          </>
        )}

        {/* Deals of the Day */}
        {deals.length > 0 && (
          <>
            <div className="section-header">
              <h2>Deals of the Day</h2>
              <a href="/products?category=deals" className="view-all-link">
                View All →
              </a>
            </div>
            <ProductSection products={deals} />
          </>
        )}

        {/* Additional Sections */}
        <div className="home-sections">
          <div className="section-card">
            <h3>🛡️ Safe and Secure Payments</h3>
            <p>Easy returns & 100% Purchase Protection</p>
          </div>
          <div className="section-card">
            <h3>🚚 Free Shipping</h3>
            <p>Free delivery on orders above ₹499</p>
          </div>
          <div className="section-card">
            <h3>🏪 10,000+ Stores</h3>
            <p>Shop from trusted sellers across India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
