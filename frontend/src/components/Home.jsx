import React from 'react'
import gif1 from '../assets/gif3.gif'
import gif2 from '../assets/home.gif'

const Home = () => {

  return (
    <>
      <main className="pt-28  lg:h-screen h-auto  flex justify-center items-center  z-0">
        <section className='w-[50%] h-full gap-14 flex flex-col p-14'>
          <section className='space-y-7'>
            <p className='text-6xl font-bold'>Free resume builder</p>
            <p className='text-6xl font-bold'>for modern job</p>
            <p className='text-6xl font-bold'>seekers</p>
            <p className='text-2xl font-medium'>By employing the best practices and innovative tech, ResumeRinger boosts your chances of landing a better job – completely for free.</p>
          </section>
          <section className='  flex justify-center items-center gap-5'>
            <button className='cursor-pointer font-bold rounded-2xl bg-[#54df71] text-white p-3 text-center  h-14 hover:border hover:border-[#54df71] hover:text-[#54df71] hover:bg-transparent'>Create Your Resume</button>
            <button className='cursor-pointer font-bold rounded-2xl bg-[#037cd5] text-white p-3 text-center  h-14 hover:border hover:border-[#037cd5] hover:text-[#037cd5] hover:bg-transparent'>Import Your Resume</button>  
          </section>
        </section>
        <section className='w-[50%] h-full flex justify-center items-center'>
          <img src={gif2} alt="Gif 2" className="h-96 w-80 items-center   rounded-2xl  "/>
        </section>
      </main>
    </>
  )
}

export default Home

