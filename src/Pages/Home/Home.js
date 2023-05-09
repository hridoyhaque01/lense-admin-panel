import React, { useContext } from "react";
import HomeBody from "../../Components/HomeBody/HomeBody";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const Home = () => {
  const { userType } = useContext(AuthContext);
  return (
    <div className="w-full">
      {(userType === "Admin" || userType === "Manager") && (
        <HomeBody></HomeBody>
      )}
    </div>
  );
};

export default Home;
