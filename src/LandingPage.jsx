import {React, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import NavBar from './components/NavBar';
import { useUser } from './UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import PATH from './PATH';

function LandingPage() {
  const { isAuthenticated, user } = useAuth0();
  const { setAura } = useUser();

  useEffect(
    () => {
      const fetchAura = async() => {
        const response = await fetch(`${PATH}/aura`, {
          method: "GET",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username: user.email
          })
        })

        const data = response.json();
        setAura(data.aura || 0);
      }
      if(isAuthenticated){
        fetchAura();
      }
    }, [isAuthenticated, user.email, setAura]
  )

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