import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../utils/storage";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
      const success = registerUser(username, password);
      if (success) {
        onLogin(username);
        navigate("/");
      } else {
        setError("User already exists. Please login.");
      }
    } else {
      const success = loginUser(username, password);
      if (success) {
        onLogin(username);
        navigate("/");
      } else {
        setError(
          "Invalid credentials or user does not exist. Try registering."
        );
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>{isRegisterMode ? "Register" : "Login"}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isRegisterMode ? "Register" : "Login"}
          </button>
        </form>
        <div className="mt-3">
          <button
            className="btn btn-link"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
          >
            {isRegisterMode
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
