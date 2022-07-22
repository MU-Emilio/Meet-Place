import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Calendar from "./Calendar";
import { User } from "../lib/types";
import Logo from "./Logo";
import Loading from "./Loading";

const Home = () => {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/viewer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User | null>(["user"], fetchData);

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="flex">
        <Logo />
        <h1>Welcome {data?.username}</h1>
      </div>
      <Calendar />
      <footer className=" bg-primary h-8"></footer>
    </div>
  );
};

export default Home;
