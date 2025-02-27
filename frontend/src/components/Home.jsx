import React from 'react'
import gif2 from '../assets/home.gif'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <>
      <main className="pt-28  lg:h-screen h-auto  flex justify-center items-center  flex-col-reverse md:flex-row z-0">
        <section className='md:w-[50%] h-full gap-14 flex flex-col md:p-14 p-5'>
          <section className='xl:space-y-7 space-y-4 text-center md:text-left'>
            <p className='xl:text-6xl text-3xl font-bold'>Free resume builder</p>
            <p className='xl:text-6xl text-3xl font-bold'>for modern job</p>
            <p className='xl:text-6xl text-3xl font-bold'>seekers</p>
            <p className='xl:text-2xl text-lg font-medium hidden md:block'>By employing the best practices and innovative tech, ResumeRinger boosts your chances of landing a better job – completely for free.</p>
          </section>
          <section className='  flex justify-left items-center gap-5'>
            <Link to={'createResume'}><button className='cursor-pointer font-bold rounded-2xl bg-[#54df71] text-white p-2 text-center h-14 hover:border hover:border-[#54df71] hover:text-[#54df71] hover:bg-transparent'>Create Your Resume</button></Link>
            <button className='cursor-pointer font-bold rounded-2xl bg-[#037cd5] text-white p-2 text-center  h-14 hover:border hover:border-[#037cd5] hover:text-[#037cd5] hover:bg-transparent'>Import Your Resume</button>  
          </section>
        </section>
        <section className='md:w-[50%] h-full flex justify-center items-center'>
          <img src={gif2} alt="Gif 2" className="h-96 w-80 items-center   rounded-2xl  "/>
        </section>
      </main>
    </>
  )
}

export default Home

