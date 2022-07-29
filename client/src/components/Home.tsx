import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import { User } from "../lib/types";
import GeneralLoading from "./GeneralLoading";
import React, { Suspense } from "react";

const Calendar = React.lazy(() => import("./Calendar"));

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
    return <GeneralLoading />;
  }

  if (error instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="h-[800px]">
      <Suspense fallback={<GeneralLoading />}>
        <Calendar />
      </Suspense>
    </div>
  );
};

export default Home;
