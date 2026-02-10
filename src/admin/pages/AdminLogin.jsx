import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Mock login - in real app, call API
    const result = login(email, password);

    setTimeout(() => {
      if (result.success) {
        navigate("/admin");
      } else {
        setError(result.message || "Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>SameKart Admin</h1>
          <p>Login to manage your store</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">⚠️ {error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@samekart.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="login-info">
            <p>Demo Credentials:</p>
            <p>
              <strong>Email:</strong> admin@samekart.com
            </p>
            <p>
              <strong>Password:</strong> admin123
            </p>
          </div>
        </form>

        <div className="login-footer">
          <p>© 2024 SameKart. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
