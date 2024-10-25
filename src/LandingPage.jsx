import {React, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Branding/>
      </main>
      <Footer />
    </div>
  );
}

const NavBar = () => {

    const n = getRandomInt(1,10);

    return (
      <nav className="p-3 flex justify-between items-center bg-white text-black">
          <div id="brand" className="flex justify-between items-center align-center gap-2">
          <b className="archivo-black-regular text-3xl ml-16 drop-shadow-md">esCode</b>
          </div>
          <div id="navMenu" className="hidden p-3 justify-between items-center md:flex align-center gap-2 text-lg">
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href={`/problem/${n}`}>Playground</a>
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href="#">Community</a>
          <a className="flex p-3 manrope-400 text-black hover:text-grey" href="#">Leaderboard</a>
          </div>   
      </nav>
    )
};

const Branding = () => {

  return (
    <div className="flex flex-col items-center justify-center align-center py-20 mt-36">
      <p className="manrope-700 text-7xl drop-shadow-md">Practice coding because</p><br/>
      <p className="manrope-700 text-5xl">Cracking interviews ain't easy</p>
      <button className="relative flex m-5 p-3 min-h-4 min-w-auto rounded-xl items-center manrope-400 font-display font-medium  text-white hover:text-black bg-black hover:bg-white border-2 border-ash shadow-lg ease-out cursor-pointer">
            <Link to="/problems">Start Solving</Link></button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-800">
        <div className="min w-screen-xl p-4 manrope-400 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">esCode™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" className="hover:underline">Contact</a>
            </li>
        </ul>
        </div>
    </footer>
  )
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


export default LandingPage;