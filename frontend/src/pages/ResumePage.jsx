// import React, { useState } from 'react'
// import GeneralInfo from '../components/GeneralInfo'
// import WorkExperience from '../components/WorkExperience'
// import SkillsInfo from '../components/SkillsInfo'
// import ExtraSection from '../components/ExtraSection'
// import ReferanceInfo from '../components/ReferanceInfo'
// import { Link } from 'react-router-dom'
// import EducationInfo from '../components/EducationInfo'
// import InternshipInfo from '../components/InternshipInfo'

// const ResumePage = () => {
//   const steps = [
//     { id: 1, title: 'General Information', component: GeneralInfo },
//     { id: 2, title: 'Work Experience', component: WorkExperience },
//     { id: 3, title: 'Education', component:  EducationInfo},
//     { id: 4, title: 'Skills', component: SkillsInfo },
//     { id: 5, title: 'Internships', component:InternshipInfo},
//     { id: 6, title: 'Additional Section', component: ExtraSection },
//     { id: 7, title: 'References', component: ReferanceInfo }
//   ]; 
//   const [currentStep, setCurrentStep] = useState(0);
//   const StepComponent = steps[currentStep].component;

  // const nextStep = () => {
  //   if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  // };

  // const prevStep = () => {
  //   if (currentStep > 0) setCurrentStep(currentStep - 1);
  // }; 

//   return (
//     <>
//       <div className="flex min-h-screen">
//       <div className="w-56  p-4 border-r hidden lg:block">
//       <div className='flex flex-col justify-center items-center mb-10'>
//         <Link to={'/'}><img src='/resumeRingerLogo.png' alt='logo' className='h-20 text-center' /></Link>
//       </div>
//         <ul>
//           {steps.map((step, index) => (
//             <li key={step.id} className={`p-2 mt-2 font-bold cursor-pointer rounded-md ${currentStep === index ? 'bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white' : 'hover:bg-gray-200'}`}onClick={() => setCurrentStep(index)}>
//               {step.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="lg:w-3/4 w-full ">
//         <StepComponent nextStep={nextStep} prevStep={prevStep} />
//       </div>
//     </div>
//     </>
//   )
// }

// export default ResumePage

// after ui change css
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GeneralInfo from '../components/GeneralInfo';
import WorkExperience from '../components/WorkExperience';
import SkillsInfo from '../components/SkillsInfo';
import ExtraSection from '../components/ExtraSection';
import ReferanceInfo from '../components/ReferanceInfo';
import EducationInfo from '../components/EducationInfo';
import InternshipInfo from '../components/InternshipInfo';
import { FaArrowLeft } from 'react-icons/fa';

const ResumePage = () => {
  const steps = [
    { id: 1, title: 'General Information', component: GeneralInfo },
    { id: 2, title: 'Work Experience', component: WorkExperience },
    { id: 3, title: 'Education', component: EducationInfo },
    { id: 4, title: 'Skills', component: SkillsInfo },
    { id: 5, title: 'Internships', component: InternshipInfo },
    { id: 6, title: 'Additional Section', component: ExtraSection },
    { id: 7, title: 'References', component: ReferanceInfo },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(window.innerWidth >= 1024);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const StepComponent = steps[currentStep].component;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setShowForm(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`p-6 border-r flex flex-col items-center transition-all duration-300 shadow-lg bg-white ${showForm && screenWidth < 1024 ? 'hidden' : 'w-full lg:w-72'}`}>
        <Link to="/">
          <img src="/resumeRingerLogo.png" alt="logo" className="h-20 mb-6" />
        </Link>
        <ul className="w-full max-w-md space-y-2">
          {steps.map((step, index) => (
            <li key={step.id} className={`p-4 text-lg font-medium text-center cursor-pointer rounded-md transition-all duration-200 shadow-md ${
                currentStep === index ? 'bg-[#037CD5] text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => { setCurrentStep(index); setShowForm(true); }}>
              {step.title}
            </li>
          ))}
        </ul>
        {/* Mobile button */}
        {screenWidth < 1024 && (
          <button onClick={() => setShowForm(true)} className="mt-6 bg-[#54DF71] text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition-all duration-200 w-full">
            Start Creating Resume
          </button>
        )}
      </div>

      {/* Multi-step form */}
      <div className={`p-6 transition-all duration-300 bg-white shadow-lg rounded-md ${showForm ? 'w-full lg:w-3/4' : 'hidden'}`}>
        {/* Back Button for Mobile */}
        {screenWidth < 1024 && showForm && (
          <button onClick={() => setShowForm(false)} className="flex items-center gap-2 bg-gray-600 text-white p-3 rounded-md mb-4 font-semibold shadow-md hover:bg-gray-700 transition-all duration-200">
            <FaArrowLeft /> Back to Sections
          </button>
        )}
        <StepComponent nextStep={() => setCurrentStep(currentStep + 1)} prevStep={() => setCurrentStep(currentStep - 1)} />
      </div>
    </div>
  );
};

export default ResumePage;


