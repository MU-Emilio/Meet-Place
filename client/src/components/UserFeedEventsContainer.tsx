import React from "react";

interface Props {
  page: number;
}

const UserFeedEventsContainer = ({ page }: Props) => {
  return <div className="bg-gray-300 h-[600px] w-[950px] m-auto">{page}</div>;
};

export default UserFeedEventsContainer;
