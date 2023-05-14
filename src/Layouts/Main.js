import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../Components/Shared/SideNav/SideNav";
import TopNav from "../Components/Shared/TopNav/TopNav";

const Main = () => {
  return (
    <div className="bg-whiteSemi h-screen overflow-hidden">
      <TopNav></TopNav>
      <div className="flex gap-8 h-full">
        <SideNav></SideNav> 
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
