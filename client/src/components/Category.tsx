import { useState } from "react";
import { CategoryType } from "../lib/types";
import { BiFootball, BiHappy, BiBriefcaseAlt } from "react-icons/bi";
import MessagePop from "./MessagePop";

interface Props {
  category: CategoryType;
  complete: boolean;
}

const styles: { [key: string]: Object } = {
  green: {
    backgroundColor: "rgb(134 239 172)",
  },
  gray: {
    backgroundColor: "rgb(209 213 219)",
  },
  yellow: {
    backgroundColor: "rgb(253 224 71)",
  },
  icon: {
    fontSize: "15px",
  },
};

const icons: { [key: string]: React.ReactNode } = {
  BiFootball: <BiFootball style={styles.icon} />,
  BiHappy: <BiHappy style={styles.icon} />,
  BiBriefcaseAlt: <BiBriefcaseAlt style={styles.icon} />,
};

const Category = ({ category, complete }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      {complete ? (
        <div
          style={styles[category.color]}
          className="flex items-center gap-2 w-[100px] mx-auto px-4 py-1 rounded-lg text-lg"
        >
          <div className="mx-auto">{icons[category.icon]}</div>
          <p className="capitalize font-normal">{category.name}</p>
        </div>
      ) : (
        <div
          style={styles[category.color]}
          className="flex items-center gap-2 w-[20px] h-[20px] mx-auto rounded-full relative"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="mx-auto">{icons[category.icon]}</div>
          <div className="absolute bottom-[-10px] right-[-10px]">
            <MessagePop message={category.name} isHover={isHover} />
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
