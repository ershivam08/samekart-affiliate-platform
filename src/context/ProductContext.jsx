import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 2999,
      originalPrice: 4999,
      discount: 40,
      image: "https://via.placeholder.com/300x300/4CAF50/fff?text=Headphones",
      images: [
        "https://via.placeholder.com/300x300/4CAF50/fff?text=Headphones",
        "https://via.placeholder.com/300x300/2196F3/fff?text=Side+View",
        "https://via.placeholder.com/300x300/FF9800/fff?text=Back+View",
      ],
      rating: 4.5,
      reviews: 128,
      category: "Electronics",
      brand: "Sony",
      description: "Noise cancellation wireless headphones with 30hr battery",
      inStock: true,
      affiliateLink: "https://example.com/affiliate/headphones",
    },
    {
      id: 2,
      name: "Men's Casual Shirt",
      price: 799,
      originalPrice: 1299,
      discount: 38,
      image: "https://via.placeholder.com/300x300/2196F3/fff?text=Shirt",
      images: [
        "https://via.placeholder.com/300x300/2196F3/fff?text=Shirt",
        "https://via.placeholder.com/300x300/4CAF50/fff?text=Back",
        "https://via.placeholder.com/300x300/FF9800/fff?text=Fitting",
      ],
      rating: 4.2,
      reviews: 89,
      category: "Fashion",
      brand: "Allen Solly",
      description: "Premium cotton casual shirt for men",
      inStock: true,
      affiliateLink: "https://example.com/affiliate/shirt",
    },
    {
      id: 3,
      name: "Smart Watch Series 5",
      price: 5999,
      originalPrice: 8999,
      discount: 33,
      image: "https://via.placeholder.com/300x300/FF9800/fff?text=Watch",
      images: [
        "https://via.placeholder.com/300x300/FF9800/fff?text=Watch",
        "https://via.placeholder.com/300x300/4CAF50/fff?text=Display",
        "https://via.placeholder.com/300x300/2196F3/fff?text=Straps",
      ],
      rating: 4.7,
      reviews: 256,
      category: "Electronics",
      brand: "Apple",
      description: "Smart watch with fitness tracking and calls",
      inStock: true,
      affiliateLink: "https://example.com/affiliate/watch",
    },
    {
      id: 4,
      name: "Kitchen Mixer Grinder",
      price: 2499,
      originalPrice: 3999,
      discount: 37,
      image: "https://via.placeholder.com/300x300/9C27B0/fff?text=Mixer",
      images: [
        "https://via.placeholder.com/300x300/9C27B0/fff?text=Mixer",
        "https://via.placeholder.com/300x300/4CAF50/fff?text=Jars",
        "https://via.placeholder.com/300x300/2196F3/fff?text=Motor",
      ],
      rating: 4.3,
      reviews: 167,
      category: "Appliances",
      brand: "Bajaj",
      description: "750W mixer grinder with 3 stainless steel jars",
      inStock: true,
      affiliateLink: "https://example.com/affiliate/mixer",
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 1599,
      originalPrice: 2599,
      discount: 38,
      image: "https://via.placeholder.com/300x300/00BCD4/fff?text=Shoes",
      images: [
        "https://via.placeholder.com/300x300/00BCD4/fff?text=Shoes",
        "https://via.placeholder.com/300x300/4CAF50/fff?text=Sole",
        "https://via.placeholder.com/300x300/FF9800/fff?text=Side",
      ],
      rating: 4.4,
      reviews: 312,
      category: "Sports",
      brand: "Nike",
      description: "Lightweight running shoes with air cushion",
      inStock: true,
      affiliateLink: "https://example.com/affiliate/shoes",
    },
  ];

  const mockCategories = [
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
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const getProductById = (id) => {
    return products.find((product) => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    if (category === "all") return products;
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  };

  const searchProducts = (query) => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const addToCart = (productId, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const trackAffiliateClick = (productId) => {
    // In real app, send to backend
    console.log(`Affiliate click tracked for product ${productId}`);
    const clicks = JSON.parse(localStorage.getItem("affiliateClicks") || "[]");
    clicks.push({
      productId,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("affiliateClicks", JSON.stringify(clicks));
  };

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: products.length + 1,
      images: [newProduct.image],
      reviews: 0,
      rating: 0,
    };

    setProducts([...products, productWithId]);
    return productWithId;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product,
      ),
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        cart,
        getProductById,
        getProductsByCategory,
        searchProducts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        trackAffiliateClick,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
