import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading/Loading";
import { User } from "../lib/types";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import EventsFeedContainer from "./EventsFeedContainer";
import { useEffect, useState } from "react";
import Users from "./Users";

export const ProfileContainer = () => {
  const params = useParams();

  const [numberEvents, setNumberEvents] = useState(0);

  const [selectedTab, setSelectedTab] = useState("profile");

  const fetchViewer = async () => {
    const response = await axios.get(`${API_URL}/user/viewer`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataViewer,
  } = useQuery<User | null>(["user"], fetchViewer);

  const fetchData = async () => {
    const response = await axios.get(
      `${API_URL}/user/username/${params.username}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User | null>(
    [`user-${params.username}`],
    fetchData
  );

  useEffect(() => {
    setSelectedTab("profile");
  }, [data]);

  if (isLoading || isLoadingUser) {
    return <Loading />;
  }

  if (error instanceof Error || errorUser instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex justify-around">
      <div className="w-2/6">
        {dataViewer?.objectId === data.objectId ? (
          <div className="flex items-end">
            <button
              onClick={() => setSelectedTab("profile")}
              className={`${
                selectedTab === "profile"
                  ? "bg-secundary text-white h-[40px]"
                  : "bg-blue-50 text-gray-400 h-[30px]"
              }  px-5 rounded-t-xl font-medium hover:scale-y-105 ease-in-out duration-300`}
            >
              Profile
            </button>
            <button
              onClick={() => setSelectedTab("friends")}
              className={`${
                selectedTab === "friends"
                  ? "bg-secundary text-white h-[40px]"
                  : "bg-blue-100 text-gray-400 h-[30px]"
              } px-5 rounded-t-xl font-medium hover:scale-y-105 ease-in-out duration-300`}
            >
              Friends
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSelectedTab("profile")}
            className={`${
              selectedTab === "profile"
                ? "bg-secundary text-white h-[40px]"
                : "bg-blue-50 text-gray-400 h-[30px]"
            }  px-5 rounded-t-xl font-medium hover:scale-y-105 ease-in-out duration-300`}
          >
            Profile
          </button>
        )}

        {selectedTab === "profile" ? (
          <Profile user={data} numberEvents={numberEvents} />
        ) : (
          <Users />
        )}
      </div>

      <div className="mt-[40px]">
        {dataViewer && (
          <EventsFeedContainer
            username={params.username}
            setNumberEvents={setNumberEvents}
          />
        )}
      </div>
    </div>
  );
};
