import { API_URL, SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import { CategoryType } from "../lib/types";
import Loading from "./Loading/Loading";
import Category from "./Category";

interface Props {
  categoryId: string;
  complete: boolean;
}

const CategoryContainer = ({ categoryId, complete }: Props) => {
  const fetchDetails = async () => {
    const response = await axios.get(`${API_URL}/category/${categoryId}`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery<CategoryType>(
    [`category-${categoryId}`],
    fetchDetails
  );

  if (isLoading || data == null) {
    return <></>;
  }

  return <Category category={data} complete={complete} />;
};

export default CategoryContainer;
