import React from 'react';

const NavBar = () => {
    return (
      <nav className="p-3 flex justify-between items-center bg-white text-black">
          <div id="brand" className="flex justify-between items-center align-center gap-2">
          <a className="archivo-black-regular text-3xl ml-16" href='/'>esCode</a>
          </div>
          <div id="navMenu" className="hidden p-3 justify-between items-center md:flex align-center gap-2 text-lg">
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href="/problems">Playground</a>
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href="#">Community</a>
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href="#">Leaderboard</a>
          </div>   
      </nav>
    )
};

export default NavBar;