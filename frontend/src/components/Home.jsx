import React, { useContext, useEffect } from 'react'
import gif2 from '../assets/home.gif'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios';

const Home = ({url}) => {
  const {backendurl , isLoggedIn , temporaryUserId} = useContext(AppContext)
  const naviagte  = useNavigate()

  const handleCreateResume = async () => {
    let userId;
    try {
      if (isLoggedIn) {
        const res = await axios.get(`${url}/api/auth/profile` ,{ withCredentials: true,})
        userId = res.data.user?._id
        if (!userId) {
          return res.status(400).json({ success: false, message: "User ID is missing" });
      }
        if (!userId) {
          console.error("❌ User ID not found in profile response");
          return;
        }
      }else{
        userId = temporaryUserId
      }

      const response = await axios.post(`${url}/api/resume/create`, {userId , isDraft:true})
      // const resumeId = response.data.resumeId;
      const resumeId = response.data._id;
      localStorage.removeItem('selectedTemplateId');
      localStorage.setItem('activeResumeId' , resumeId)
      localStorage.setItem('currentStep' ,0)
      // naviagte(`/templates`)
      naviagte('/templates', { state: { flow: 'template-first' } });
    } catch (error) {
      console.error("Error creating resume:", error.response?.data || error.message);
    }
  }

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
            <button onClick={handleCreateResume} className='cursor-pointer font-bold rounded-2xl bg-[#54df71] text-white p-2 text-center h-14 hover:border hover:border-[#54df71] hover:text-[#54df71] hover:bg-transparent'>Create Your Resume</button>
            {/* <button className='cursor-pointer font-bold rounded-2xl bg-[#037cd5] text-white p-2 text-center  h-14 hover:border hover:border-[#037cd5] hover:text-[#037cd5] hover:bg-transparent'>Import Your Resume</button>   */}
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