import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
      <div className='bg-white  h-auto'>
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
    {/* <div class="size-full  bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% bg-opacity-10">
    <Navbar/>
    <Home/>
    </div> */}
    {/* <div class="size-full  bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700">
    <Navbar/>
    <Home/>
    <Footer/>
    </div> */}


    </>
    
  )
}

export default HomePage
