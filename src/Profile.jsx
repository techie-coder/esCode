import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/NavBar";

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  return (
    <>
    <NavBar />
    {isLoading ? (<div>Loading...</div>) : (<></>)}
    {
        isAuthenticated ? (
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()}>Log In</button>
          )
    }
    </>
    
  );
};

export default Profile;
