import React from "react";
import Logo from "./Logo";
import TopBarButtonContainer from "./TopBarButtonContainer";

const TopBar = () => {
  return (
    <div className="flex justify-between align-middle">
      <div>
        <Logo />
      </div>

      <div>
        <TopBarButtonContainer />
      </div>
    </div>
  );
};

export default TopBar;
