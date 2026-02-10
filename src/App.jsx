import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import Navbar from "./components/Navbar/Navbar";
import CategoryBar from "./components/CategoryBar/CategoryBar";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  const location = useLocation();
  const [showCategoryBar, setShowCategoryBar] = useState(true);

  useEffect(() => {
    // Category bar sirf home page pe dikhao
    if (location.pathname === "/") {
      setShowCategoryBar(true);
    } else {
      setShowCategoryBar(false);
    }
  }, [location]);

  return (
    <AuthProvider>
      <ProductProvider>
        <div className="app">
          {/* Main Navigation */}
          <Navbar />

          {/* Category Bar - Only on home page */}
          {showCategoryBar && <CategoryBar />}

          {/* Main Content - Adjust based on category bar visibility */}
          <main
            className={`main-content ${showCategoryBar ? "with-category-bar" : ""}`}
          >
            <AppRoutes />
          </main>

          <Footer />
        </div>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
