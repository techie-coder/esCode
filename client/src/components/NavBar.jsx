import React from 'react';
import CircumIcon from "@klarr-agency/circum-icons-react"; 

const NavBar = () => {
    return (
      <nav className="p-3 flex justify-between items-center bg-white text-black">
          <div id="brand" className="flex justify-between items-center align-center gap-2">
          <CircumIcon name="wave_pulse_1" color="black" size={60} />
          <b className="archivo-black-regular text-3xl">esCode</b>
          </div>
          <div id="navMenu" className="hidden p-3 justify-between items-center md:flex align-center gap-2">
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href="#">Playground</a>
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href="#">Community</a>
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href="#">Leaderboard</a>
          </div>   
      </nav>
    )
};

export default NavBar;