import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/NavBar";
import { useUser } from "./UserContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { aura } = useUser();

  return (
    <>
    <NavBar />
    {isLoading ? (<div>Loading...</div>) : (<></>)}
    {
        isAuthenticated ? (
            <div className="bg-platinum min-h-screen space-y-10">
              <h1 className="text-3xl manrope-700 pl-6 pt-6">Profile</h1>
              <div className="ml-6 justify-start space-y-3 text-xl">
              <img src={user.picture} alt={user.name} />
              <h2>Name: {user.name}</h2>
              <p>nickname: {user.nickname}</p>
              <p></p>
              <p>Email: {user.email}</p>
              <section className="text-bright-orange">{aura} AURA</section>
              </div>
              
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()}>Log In</button>
          )
    }
    </>
    
  );
};

export default Profile;
