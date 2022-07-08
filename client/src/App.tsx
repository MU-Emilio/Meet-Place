import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SESSION_KEY } from "./lib/constants";
import axios from "axios";

import Login from "./components/Login";
import "./App.css";
import Register from "./components/Register";
import Home from "./components/Home";
import Parse from "parse";

function App() {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/viewer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
