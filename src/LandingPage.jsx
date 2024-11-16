import {Link} from 'react-router-dom'
import NavBar from './components/NavBar';
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

const Branding = () => {

  return (
    <div className="flex flex-col items-center justify-center align-center py-20 mt-36">
      <p className="manrope-700 text-7xl drop-shadow-md">DSA?</p><br/>
      <p className="manrope-700 text-5xl">We got it covered.</p>
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
        </div>
    </footer>
  )
}

export default LandingPage;