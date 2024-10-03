import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage';
import Login from './Login';
import SignUp from './SignUp';
import ShowProblems from './ShowProblems';
import ProblemDetails from './ProblemDetails';


function App(){

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/problems' element={<ShowProblems />} />
      <Route path='/problem/:pId' element={<ProblemDetails />} />
    </Routes>
    </>
  )
}



export default App
