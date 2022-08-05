import React from "react";
import { CategoryType } from "../lib/types";
import { BiFootball, BiHappy, BiBriefcaseAlt } from "react-icons/bi";

interface Props {
  category: CategoryType;
}

const styles = {
  green: {
    backgroundColor: "rgb(134 239 172)",
  },
  gray: {
    backgroundColor: "rgb(209 213 219)",
  },
  yellow: {
    backgroundColor: "rgb(253 224 71)",
  },
};

const icons = {
  BiFootball: <BiFootball />,
  BiHappy: <BiHappy />,
  BiBriefcaseAlt: <BiBriefcaseAlt />,
};

const Category = ({ category }: Props) => {
  return (
    <div
      style={styles[category.color]}
      className="flex items-center gap-2 w-[100px] mx-auto px-4 py-1 rounded-lg"
    >
      {icons[category.icon]}
      <p className="capitalize">{category.name}</p>
    </div>
  );
};

export default Category;
