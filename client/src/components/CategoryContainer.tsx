import { API_URL, SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import { CategoryType } from "../lib/types";
import Loading from "./Loading/Loading";
import Category from "./Category";

interface Props {
  categoryId: string;
}

const CategoryContainer = ({ categoryId }: Props) => {
  const fetchDetails = async () => {
    const response = await axios.get(
      `${API_URL}/events/details/${categoryId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<CategoryType>(
    [`category-${categoryId}`],
    fetchDetails
  );

  if (isLoading || data == null) {
    return <Loading />;
  }

  return <Category category={data} />;
};

export default CategoryContainer;
