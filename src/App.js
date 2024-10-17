import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "./store/slices/authSlice";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "../styles/App.css";
import { SocketProvider } from "./utils/SocketContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      dispatch(verifyToken()).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [loggedIn, dispatch]);

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
