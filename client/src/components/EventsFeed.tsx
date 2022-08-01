import React, { useState } from "react";
import { User } from "../lib/types";
import UserEventsContainer from "./UserEventsContainer";

interface Props {
  username: string;
  pages: number;
}

const EventsFeed = ({ username, pages }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const page_cards = [];
  for (let i = 1; i <= pages; i++) {
    page_cards.push(
      <React.Fragment key={i}>
        <div
          className={`h-[40px] min-w-[40px] ${
            i === currentPage ? "bg-blue-200" : "bg-gray-300"
          } p-1 flex items-center cursor-pointer hover:bg-blue-300 hover:scale-105 ease-in-out duration-300`}
          onClick={() => setCurrentPage(i)}
        >
          <p className="m-auto w-fit">{i}</p>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className=" bg-gray-200 w-[900px] h-[750px] p-5 rounded-lg">
      <UserEventsContainer username={username} page={currentPage} />

      <div className="w-[850px] h-[50px] bg-white flex gap-3 overflow-x-auto items-center p-2 m-auto">
        {page_cards}
      </div>
    </div>
  );
};

export default EventsFeed;
