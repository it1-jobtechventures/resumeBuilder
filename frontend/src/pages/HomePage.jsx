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
    </>
    
  )
}

export default HomePage
