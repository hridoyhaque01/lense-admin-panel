import React from "react";
import loadingAnimation from "../../../Assets/animations/cubeLoadingAnimation.gif";

const OrdersLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-20">
      <p>Loading Data From The Cloud</p>
      <img className="h-57" src={loadingAnimation} alt="" />
    </div>
  );
};

export default OrdersLoading;
