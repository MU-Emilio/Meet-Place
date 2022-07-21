import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./Users";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { UserContext } from "./UserContext";
import EventCreateForm from "./EventCreateForm";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import { User } from "../lib/types";

const RoutesAvailable = () => {
  const { user } = useContext(UserContext);

  const getViewer = async () => {
    const response = await axios.get("http://localhost:3001/viewer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const {
    isLoading,
    error,
    data: viewer,
  } = useQuery<User>(["user"], getViewer);

  if (!isLoading && viewer) {
    if (!user) {
      return (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<Users />} />
          <Route
            path="/addEvent"
            element={<EventCreateForm owner={viewer} />}
          />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      );
    }
  }
};

export default RoutesAvailable;
