import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshTokens } from "../slices/authSlice";
import Dashboard from "./Dashboard";
import Login from "./Login";
import "../styles/App.css";
import { SocketProvider } from "../utils/SocketContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [isLoading, setIsLoading] = useState(true);

  const handleVerifyToken = async () => {
    const response = await fetch("http://localhost:3001/verify-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const response = await fetch("http://localhost:3001/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.status === 200) {
          const data = await response.json();
          const token = data.accessToken;
          const refreshToken = data.refreshToken;
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch(refreshTokens({ token, refreshToken }));
        }
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loggedIn) {
      handleVerifyToken();
    } else {
      setIsLoading(false);
    }
  }, [loggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SocketProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {loggedIn ? (
              <Route path="/*" element={<Dashboard />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
