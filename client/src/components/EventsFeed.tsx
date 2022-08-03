import React, { useMemo, useState } from "react";
import UserEventsContainer from "./UserEventsContainer";

interface Props {
  username: string;
  pages: number;
}

const EventsFeed = ({ username, pages }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages_cards = useMemo(() => {
    return Array(pages)
      .fill(null)
      .map((u, i) => (
        <React.Fragment key={i}>
          <div
            className={` rounded-md h-[40px] min-w-[40px] ${
              i === currentPage ? "bg-secundary" : "bg-gray-300"
            } p-1 flex items-center cursor-pointer hover:bg-blue-300 hover:scale-105 ease-in-out duration-300`}
            onClick={() => setCurrentPage(i)}
          >
            <p className="m-auto w-fit">{i + 1}</p>
          </div>
        </React.Fragment>
      ));
  }, [pages, currentPage]);

  return (
    <div className=" bg-gray-200 w-[900px] h-[750px] p-5 rounded-lg">
      <h1 className="bg-primary px-5 py-3 rounded-t-md font-medium text-xl text-white text-center w-[850px] m-auto">
        Events
      </h1>

      <UserEventsContainer username={username} page={currentPage} />

      <div className="w-[850px] h-[50px] bg-white flex gap-3 overflow-x-auto items-center p-2 m-auto">
        {pages_cards}
      </div>
    </div>
  );
};

export default EventsFeed;
