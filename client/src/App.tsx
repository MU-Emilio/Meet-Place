import { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RoutesAvailable from "./components/RoutesAvailable";
import "./App.css";
import Logout from "./components/Logout";
import UserProvider from "./components/UserContext";

function App() {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Logout />
        <UserProvider>
          <BrowserRouter>
            <RoutesAvailable />
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
