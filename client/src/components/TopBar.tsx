import Logo from "./Logo";
import TopBarButtonContainer from "./TopBarButtonContainer";
import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading/Loading";
import { User } from "../lib/types";

const TopBar = () => {
  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/user/viewer`, {
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
      <div className="flex justify-between align-middle mb-5 h-[85px]">
        <div>
          <Logo />
        </div>

        <div>
          <TopBarButtonContainer user={data} />
        </div>
      </div>
      <hr className="mb-3" />
    </div>
  );
};

export default TopBar;
