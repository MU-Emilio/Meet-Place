import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RoutesAvailable from "./components/RoutesAvailable";
import "./App.css";
import Logout from "./components/Logout";
import UserProvider from "./components/UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App px-12 h-screen">
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
