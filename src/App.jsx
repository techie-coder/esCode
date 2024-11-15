import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage';
import SignUp from './SignUp';
import ShowProblems from './ShowProblems';
import ProblemDetails from './ProblemDetails';
import Discuss from './Discuss';
import Profile from './Profile';
import Submissions from './Submissions';


function App(){

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/problems' element={<ShowProblems />} />
      <Route path='/problem/:pId' element={<ProblemDetails />} />
      <Route path='/discuss' element={<Discuss />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/submissions' element={<Submissions />} />
    </Routes>
    </>
  )
}



export default App
