import React, { useState } from "react";
import NavBar from './components/NavBar'
import {useNavigate} from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';


const SignUp = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const handleSignup = async () => {
    try {
      localStorage.removeItem('auth');
      const response = await fetch('https://escode.up.railway.app/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const json = await response.json();
      alert(json.msg);
      navigate('/login');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };



    return (
      <>
      <NavBar/>
      <section className="h-70vh flex items-center justify-center text-black manrope-400">
        <div className="h-3/4 min-w-1/2 w-3/4 flex rounded-2xl p-4 bg-platinum-50">
          <div className="sm:w-1/2 px-10 py-10">
            <h1 className="mb-2 manrope-700 text-4xl">Sign up</h1>
            <p className="mb-8">Enter your email and password to get started...</p>
            <div className="flex flex-col gap-3 sm:w-2/3">
              <label htmlFor="email">Enter Email Address</label>
              <input
                id="email"
                type="email"
                className="border-2 rounded-xl py-2 px-2 focus:outline-none focus:border-midnight hover:border-purple-400 shadow-sm focus:shadow"
                placeholder="123@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Enter Password</label>
              <div className="relative">
                <input
                  id="password"
                  className="w-full border-2 rounded-xl py-2 px-2 pr-10 focus:outline-none focus:border-midnight hover:border-purple-400 shadow-sm focus:shadow"
                  type={type}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleToggle}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <Icon icon={icon} size={25} />
                </button>
              </div>
              <div className="flex flex-row items-center justify-center mt-4">
                <button
                  onClick={handleSignup}
                  className="border-2 rounded-xl py-2 px-4 bg-black text-white hover:scale-105 transition duration-300"
                >
                  Signup
                </button>
                <a className="flex items-center justify-center pl-2" href="/login">Login</a>
              </div>
            </div>
            
          </div>
        </div>
      </section>
  </>
    )
}


export default SignUp
