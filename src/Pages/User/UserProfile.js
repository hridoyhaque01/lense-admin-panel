import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h2>user profile</h2>
      <p>email: {user?.email}</p>
      <p>logged in at: {user?.metadata?.lastSignInTime}</p>
    </div>
  );
};

export default UserProfile;
