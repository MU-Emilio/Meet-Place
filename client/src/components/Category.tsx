import React from "react";
import { CategoryType } from "../lib/types";

interface Props {
  category: CategoryType;
}

const Category = ({ category }: Props) => {
  return <div>{category.name}</div>;
};

export default Category;
