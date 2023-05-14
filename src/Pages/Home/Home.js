import React from "react";
import HomeBody from "../../Components/HomeBody/HomeBody";
import { useState } from "react";

const Home = () => {
  const [userType , setUserType] = useState("Admin")
  return (
    <div className="w-full overflow-auto pt-10 pb-32 pr-10">
      {(userType === "Admin" || userType === "Manager") && (
        <HomeBody></HomeBody>
      )}
    </div>
  );
};

export default Home;
