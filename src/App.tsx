import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "./store/slices/authSlice";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./styles/App.css";
import { SocketProvider } from "./utils/SocketContext";
import { useSocket } from "./utils/SocketContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { RootState } from "./store/store";

function App() {
  const dispatch = useAppDispatch();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
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
