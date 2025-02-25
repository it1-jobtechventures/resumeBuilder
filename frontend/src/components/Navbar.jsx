import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className='h-24  p-2 shadow-xl fixed w-full flex justify-around items-center z-50 bg-[#f5f5f5]'>
        <section>
          <img src='/resumeRingerLogo.png' alt='logo' className='h-20 '/>
        </section>
        <section>
          <p className=' font-semibold'>TEMPLATES</p>
        </section>
        <section className='flex gap-3'>
          <Link to={'/createResume'}><button className='cursor-pointer font-bold bg-[#54df71] text-white p-2.5 text-center rounded-4xl h-10 hover:border hover:border-[#54df71] hover:text-[#54df71] hover:bg-transparent'>Create Your Resume</button></Link>
          <Link to={'/login'}><button className='cursor-pointer font-bold bg-[#037cd5] text-white p-2.5 text-center rounded-4xl h-10 hover:border hover:border-[#037cd5] hover:text-[#037cd5] hover:bg-transparent'>Sign In</button></Link>
        </section>
      </nav>
    </>
  )
}

export default Navbar

// bg-[linear-gradient(to_right_bottom,_#56021f,_#7f374e,_#a66781,_#cd98b5,_#f4cce9)]