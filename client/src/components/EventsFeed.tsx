import React, { useState } from "react";
import { User } from "../lib/types";

interface Props {
  userId: string;
  pages: number;
}

const EventsFeed = ({ userId, pages }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const page_cards = [];
  for (let i = 1; i <= pages; i++) {
    page_cards.push(
      <React.Fragment>
        <div
          className={`h-[40px] min-w-[40px] ${
            i === currentPage ? "bg-blue-200" : "bg-gray-300"
          } p-1 flex items-center cursor-pointer hover:scale-105 ease-in-out duration-300`}
          onClick={() => setCurrentPage(i)}
        >
          <p className="m-auto w-fit">{i}</p>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className=" bg-gray-200 w-[1000px] h-[700px] p-5">
      <div className="bg-gray-300 h-[600px] w-[950px] m-auto"></div>
      <div className="w-[950px] h-[50px] bg-white flex gap-3 overflow-x-auto items-center p-2 m-auto">
        {page_cards}
      </div>
    </div>
  );
};

export default EventsFeed;
