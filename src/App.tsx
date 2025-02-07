import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import ShortenerPage from "./components/ShortenerPage";
import SystemDesignPage from "./components/SystemDesignPage";
import RedirectPage from "./components/RedirectPage";
import { getLoggedInUser, logout } from "./utils/storage";
import AdminPage from "./components/AdminPage";

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(getLoggedInUser());

  useEffect(() => {
    // Listen for login changes (if needed)
  }, [user]);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <div className="container my-4">
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage onLogin={(username: string) => setUser(username)} />
            }
          />
          <Route path="/system-design" element={<SystemDesignPage />} />
          <Route
            path="/"
            element={
              user ? (
                <ShortenerPage user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          {/* New dynamic route for short URLs */}
          <Route path="/:short" element={<RedirectPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
