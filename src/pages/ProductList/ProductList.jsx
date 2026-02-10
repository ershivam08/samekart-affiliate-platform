import React, { useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ProductContext } from "../../context/ProductContext";
import "./ProductList.css";

const ProductList = () => {
  const { products, loading, getProductsByCategory } =
    useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const location = useLocation();
  const params = useParams();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const category = params.category || queryParams.get("category") || "all";

  useEffect(() => {
    let filtered =
      category === "all" ? [...products] : getProductsByCategory(category);

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return b.discount - a.discount;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [
    products,
    category,
    searchQuery,
    sortBy,
    priceRange,
    getProductsByCategory,
  ]);

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  const clearFilters = () => {
    setSortBy("featured");
    setPriceRange([0, 50000]);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : category === "all"
                ? "All Products"
                : category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="results-count">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="product-list-container">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3>Filters</h3>
              <button className="clear-filters" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            {/* Price Filter */}
            <div className="filter-section">
              <h4>Price</h4>
              <div className="price-filter">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="price-slider"
                />
                <div className="price-labels">
                  <span>₹0</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Sorting */}
            <div className="filter-section">
              <h4>Sort By</h4>
              <div className="sort-options">
                {[
                  { value: "featured", label: "Featured" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Customer Rating" },
                  { value: "discount", label: "Discount" },
                ].map((option) => (
                  <label key={option.value} className="sort-option">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => setSortBy(e.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4>Categories</h4>
              <div className="category-filters">
                {[
                  "all",
                  "electronics",
                  "fashion",
                  "home",
                  "appliances",
                  "sports",
                ].map((cat) => (
                  <button
                    key={cat}
                    className={`category-filter ${category === cat ? "active" : ""}`}
                    onClick={() =>
                      (window.location.href = `/products?category=${cat}`)
                    }
                  >
                    {cat === "all"
                      ? "All Categories"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-main">
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">😔</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
                <button className="btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
