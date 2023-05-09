import React from "react";
import emptyAnimation from "../../../Assets/animations/emptyAnimation.gif";

const EmptyScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-20">
      <p>Sorry, Nothing Found!</p>
      <img className="h-57" src={emptyAnimation} alt="" />
    </div>
  );
};

export default EmptyScreen;
