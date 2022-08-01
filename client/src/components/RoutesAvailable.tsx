import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./Users";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { UserContext } from "./UserContext";
import EventCreateForm from "./EventCreateForm";
import TopBar from "./TopBar";
import ProfilePage from "./ProfilePage";
import EventDetailsContainer from "./EventDetailsContainer";
import UserEventsContainer from "./UserEventsContainer";
import EventsFeedContainer from "./EventsFeedContainer";

const RoutesAvailable = () => {
  const { user } = useContext(UserContext);

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
      <div>
        <TopBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/users/:username" element={<ProfilePage />} />
          <Route path="/addEvent" element={<EventCreateForm />} />
          <Route path="/events/:userId" element={<EventsFeedContainer />} />
          <Route path="/event/:eventId" element={<EventDetailsContainer />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    );
  }
};

export default RoutesAvailable;
