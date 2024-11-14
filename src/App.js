import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage"; // Import RegisterPage
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  // Check for authentication token in localStorage
  const isAuthenticated = !!localStorage.getItem("authToken"); // Use "authToken" as key

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Route */}
            <Route
              path="/todolist"
              element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />}
            />

            {/* Redirect from root to login or todolist based on authentication */}
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/todolist" /> : <Navigate to="/login" />}
            />

            {/* Redirect all other unmatched routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
