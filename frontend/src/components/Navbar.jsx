// import React from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <>
//       <nav className='h-24  p-2 shadow-xl fixed w-full flex justify-around items-center z-50 bg-[#f5f5f5]'>
//         <section>
//           <img src='/resumeRingerLogo.png' alt='logo' className='h-20 '/>
//         </section>
//         <section className='hidden lg:block'>
//           <p className=' font-semibold'>TEMPLATES</p>
//         </section>
//         <section className='flex gap-3'>
//           <Link to={'/createResume'}><button className='hidden md:block cursor-pointer font-bold bg-[#54df71] text-white p-2.5 text-center rounded-4xl h-10 hover:border hover:border-[#54df71] hover:text-[#54df71] hover:bg-transparent'>Create Your Resume</button></Link>
//           <Link to={'/login'}><button className='cursor-pointer font-bold bg-[#037cd5] text-white p-2.5 text-center rounded-4xl h-10 hover:border hover:border-[#037cd5] hover:text-[#037cd5] hover:bg-transparent'>Sign In</button></Link>
//         </section>
//       </nav>
//     </>
//   )
// }

// export default Navbar

// // bg-[linear-gradient(to_right_bottom,_#56021f,_#7f374e,_#a66781,_#cd98b5,_#f4cce9)]

import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {toast} from "react-toastify"
import axios from "axios"

const Navbar = () => {

  const navigate = useNavigate();
  const {isLoggedIn, backendUrl, setIsLoggedIn} = useContext(AppContext);
  
  return (
    <>
      <nav className='h-24  p-2 shadow-xl fixed w-full flex justify-around items-center z-50 bg-[#f5f5f5]'>
        <section>
          <img src='/resumeRingerLogo.png' alt='logo' className='h-20 '/>
        </section>
        {/* <section className='hidden lg:block'>
          <Link to={'/templates'}><p className=' font-semibold'>TEMPLATES</p></Link>
        </section> */}
        <section className='flex gap-5'>
          <Link to={'/createResume'}><button className='hidden md:block cursor-pointer font-bold bg-[#54df71] rounded-xl text-white p-3 text-center  h-12 hover:border hover:border-[#54df71] hover:text-[#54df71] hover:bg-transparent '>Create Your Resume</button></Link>
          {!isLoggedIn ? (
            <Link to={'/login'}><button className='cursor-pointer font-bold bg-[#037cd5] text-white p-2.5 text-center rounded-4xl h-10 hover:border hover:border-[#037cd5] hover:text-[#037cd5] hover:bg-transparent'>Sign In</button></Link>
          ) : (
            <section>
            <Link to={'/profile'}><img src='/profile.png' alt='profile image' className='w-14 h-14'/></Link>
          </section>
          )}
        </section>
      </nav>
    </>
  )
}

export default Navbar

// bg-[linear-gradient(to_right_bottom,_#56021f,_#7f374e,_#a66781,_#cd98b5,_#f4cce9)]