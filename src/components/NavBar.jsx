import React from 'react';
import logo from '../../src/assets/logo.png';
import profile from '../../src/assets/user.png'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from '../UserContext';

const NavBar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading} = useAuth0();

  const { aura } = useUser();

  return (
      <nav className="px-32 flex justify-between items-center bg-white text-black border-b-2 border-platinum-50">
          <div id="brand" className="flex justify-between items-center">
          <img src={logo} className="h-6 m-0"></img>
          <a className="manrope-700 text-lg mx-4" href="/">esCode</a>
          <div id="navMenu" className="hidden justify-between items-center md:flex align-center text-md text-gray space-x-6 py-2 manrope-400">
          <a className="hover:text-grey" href="/problems">Problems</a>
          <a className="hover:text-grey" href="/discuss">Discuss</a>
          <a className="hover:text-grey" href="/secure">Leaderboard</a>
          </div>
          </div>
          {isLoading ? (<></>) : (
            <div className='flex justify-center items-center space-x-4 manrope-400'>
            {isAuthenticated ? (<><section className='text-yellow'>{aura} AURA</section>
            <DropdownMenu.Root>
            <DropdownMenu.Trigger><img src={typeof user.picture=== "undefined" ? profile : user.picture} className='h-6 rounded-xl shadow'></img></DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className='z-10 bg-white  text-md mx-3 border-black border-1 rounded-lg drop-shadow m-4 p-2 text-gray' s>
              <DropdownMenu.Separator />
                <DropdownMenu.Item className='outline-none hover:text-black'><a href="/profile" className='px-4 py-2'>Profile</a></DropdownMenu.Item>
                <DropdownMenu.Item className='outline-none hover:text-black'><a href="/submissions" className='px-4 py-2'>Submissions</a></DropdownMenu.Item>
                <DropdownMenu.Item className='outline-none hover:text-black'><button className='px-4' onClick={() => logout({ logoutParams: { returnTo: 'http://localhost:5173/' } })}>Log Out</button></DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root></>) : (<button className="bg-platinum-50 hover:bg-platinum-100 px-[12px] py-[4px] rounded-lg" onClick={() => loginWithRedirect()}>Log In</button>)}
          </div>
          )}
          
      </nav>
    )
};

export default NavBar;