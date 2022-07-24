import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RoutesAvailable from "./components/RoutesAvailable";
import "./App.css";
import UserProvider from "./components/UserContext";
import GeneralFooter from "./components/GeneralFooter";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="w-full">
      <div className="App w-5/6 mx-auto mt-5">
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <BrowserRouter>
              <RoutesAvailable />
            </BrowserRouter>
          </UserProvider>
        </QueryClientProvider>
      </div>
      <GeneralFooter />
    </div>
  );
}

export default App;
