// import React, { useContext, useEffect } from 'react'
// import gif2 from '../assets/home.gif'
// import { Link, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios';

// const Home = ({url}) => {
//   const {backendurl , isLoggedIn , temporaryUserId} = useContext(AppContext)
//   const naviagte  = useNavigate()

//   const handleCreateResume = async () => {
//     let userId;
//     try {
//       if (isLoggedIn) {
//         const res = await axios.get(`${url}/api/auth/profile` ,{ withCredentials: true,})
//         userId = res.data.user?._id
//         if (!userId) {
//           return res.status(400).json({ success: false, message: "User ID is missing" });
//       }
//         if (!userId) {
//           console.error("❌ User ID not found in profile response");
//           return;
//         }
//       }else{
//         userId = temporaryUserId
//       }

//       const response = await axios.post(`${url}/api/resume/create`, {userId , isDraft:true})
//       // const resumeId = response.data.resumeId;
//       const resumeId = response.data._id;
//       localStorage.removeItem('selectedTemplateId');
//       localStorage.setItem('activeResumeId' , resumeId)
//       localStorage.setItem('currentStep' ,0)
//       // naviagte(`/templates`)
//       naviagte('/templates', { state: { flow: 'template-first' } });
//     } catch (error) {
//       console.error("Error creating resume:", error.response?.data || error.message);
//     }
//   }

//   return (
//     <>
//       <main className="pt-28  lg:h-screen h-auto  flex justify-center items-center  flex-col-reverse md:flex-row z-0">
//         <section className='md:w-[50%] h-full gap-14 flex flex-col md:p-14 p-5'>
//           <section className='xl:space-y-7 space-y-4 text-center md:text-left'>
//             <p className='xl:text-6xl text-3xl font-bold'>Free resume builder</p>
//             <p className='xl:text-6xl text-3xl font-bold'>for modern job</p>
//             <p className='xl:text-6xl text-3xl font-bold'>seekers</p>
//             <p className='xl:text-2xl text-lg font-medium hidden md:block'>By employing the best practices and innovative tech, ResumeRinger boosts your chances of landing a better job – completely for free.</p>
//           </section>
//           <section className='  flex justify-left items-center gap-5'>
//             <button onClick={handleCreateResume} className='cursor-pointer font-bold rounded-2xl bg-[#54df71] text-white p-2 text-center h-14 hover:border hover:border-[#54df71] hover:text-[#54df71] hover:bg-transparent'>Create Your Resume</button>
//             {/* <button className='cursor-pointer font-bold rounded-2xl bg-[#037cd5] text-white p-2 text-center  h-14 hover:border hover:border-[#037cd5] hover:text-[#037cd5] hover:bg-transparent'>Import Your Resume</button>   */}
//           </section>
//         </section>
//         <section className='md:w-[50%] h-full flex justify-center items-center'>
//           <img src={gif2} alt="Gif 2" className="h-96 w-80 items-center   rounded-2xl  "/>
//         </section>
//       </main>
//     </>
//   )
// }

// export default Home

import React, { useContext } from 'react';
import gif2 from '../assets/home.gif';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = ({ url }) => {
  const { backendurl, isLoggedIn, temporaryUserId } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCreateResume = async () => {
    let userId;
    try {
      if (isLoggedIn) {
        const res = await axios.get(`${url}/api/auth/profile`, { withCredentials: true });
        userId = res.data.user?._id;
        if (!userId) return;
      } else {
        userId = temporaryUserId;
      }

      const response = await axios.post(`${url}/api/resume/create`, { userId, isDraft: true });
      const resumeId = response.data._id;

      localStorage.removeItem('selectedTemplateId');
      localStorage.setItem('activeResumeId', resumeId);
      localStorage.setItem('currentStep', 0);
      navigate('/templates', { state: { flow: 'template-first' } });
    } catch (error) {
      console.error("Error creating resume:", error.response?.data || error.message);
    }
  };

  return (
    <main className="pt-24 px-4 md:px-10 lg:px-20 min-h-screen flex flex-col-reverse md:flex-row justify-between items-center gap-10">
    {/* Left Text Section */}
      <motion.section initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full md:w-1/2 max-w-xl space-y-6 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Free Resume Builder <br />
          <span className="text-[#54df71]">for Modern Job Seekers</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 hidden md:block">
          By employing best practices and innovative tech, ResumeRinger boosts your chances of landing a better job — completely free.
        </p>
        <div className="flex justify-center md:justify-start">
          <button onClick={handleCreateResume} className="bg-[#54df71] text-white font-semibold px-6 py-3 rounded-full hover:bg-transparent hover:text-[#54df71] hover:border hover:border-[#54df71] transition hover:scale-105">
            Create Your Resume
          </button>
        </div>
      </motion.section>
      {/* Right Image Section */}
      <motion.section initial={{ opacity: 0, x: 40 }}animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}    className="w-full md:w-1/2 flex justify-center">
        <img src={gif2}alt="Resume builder illustration"  className="max-w-[300px] sm:max-w-[350px] md:max-w-[400px] rounded-xl shadow-lg" />
      </motion.section>
    </main>
  );
};

export default Home;
