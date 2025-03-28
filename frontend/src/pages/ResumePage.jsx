// // after ui change css
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import GeneralInfo from '../components/GeneralInfo';
// import WorkExperience from '../components/WorkExperience';
// import SkillsInfo from '../components/SkillsInfo';
// import ExtraSection from '../components/ExtraSection';
// import ReferanceInfo from '../components/ReferanceInfo';
// import EducationInfo from '../components/EducationInfo';
// import InternshipInfo from '../components/InternshipInfo';
// import { FaArrowLeft } from 'react-icons/fa';

// const ResumePage = () => {
//   const steps = [
//     { id: 1, title: 'General Information', component: GeneralInfo },
//     { id: 2, title: 'Work Experience', component: WorkExperience },
//     { id: 3, title: 'Education', component: EducationInfo },
//     { id: 4, title: 'Skills', component: SkillsInfo },
//     { id: 5, title: 'Internships', component: InternshipInfo },
//     { id: 6, title: 'Additional Section', component: ExtraSection },
//     { id: 7, title: 'References', component: ReferanceInfo },
//   ];

//   // const [currentStep, setCurrentStep] = useState(0);
//   const [currentStep, setCurrentStep] = useState(() => {
//     return Number(localStorage.getItem('currentStep')) || 0;
//   }) ;
//   const [showForm, setShowForm] = useState(window.innerWidth >= 1024);
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     localStorage.setItem('currentStep', currentStep)
//   },[currentStep]);

//   const StepComponent = steps[currentStep].component;

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//       setShowForm(window.innerWidth >= 1024);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className={`p-6 border-r flex flex-col items-center transition-all duration-300 shadow-lg bg-white ${showForm && screenWidth < 1024 ? 'hidden' : 'w-full lg:w-72'}`}>
//         <Link to="/">
//           <img src="/resumeRingerLogo.png" alt="logo" className="h-20 mb-6" />
//         </Link>
//         <ul className="w-full max-w-md space-y-2">
//           {steps.map((step, index) => (
//             <li key={step.id} className={`p-4 text-lg font-medium text-center cursor-pointer rounded-md transition-all duration-200 shadow-md ${
//                 currentStep === index ? 'bg-[#037CD5] text-white' : 'bg-gray-200 hover:bg-gray-300'
//               }`}
//               onClick={() => { setCurrentStep(index); setShowForm(true); }}>
//               {step.title}
//             </li>
//           ))}
//         </ul>
//         {/* Mobile button */}
//         {screenWidth < 1024 && (
//           <button onClick={() => setShowForm(true)} className="mt-6 bg-[#54DF71] text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition-all duration-200 w-full">
//             Start Creating Resume
//           </button>
//         )}
//       </div>

//       {/* Multi-step form */}
//       <div className={`p-6 transition-all duration-300 bg-white shadow-lg rounded-md ${showForm ? 'w-full lg:w-3/4' : 'hidden'}`}>
//         {/* Back Button for Mobile */}
//         {screenWidth < 1024 && showForm && (
//           <button onClick={() => setShowForm(false)} className="flex items-center gap-2 bg-gray-600 text-white p-3 rounded-md mb-4 font-semibold shadow-md hover:bg-gray-700 transition-all duration-200">
//             <FaArrowLeft /> Back to Sections
//           </button>
//         )}
//         <StepComponent nextStep={() => setCurrentStep(currentStep + 1)} prevStep={() => setCurrentStep(currentStep - 1)} />
//       </div>
//     </div>
//   );
// };

// export default ResumePage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import GeneralInfo from '../components/GeneralInfo';
import WorkExperience from '../components/WorkExperience';
import SkillsInfo from '../components/SkillsInfo';
import ExtraSection from '../components/ExtraSection';
import ReferanceInfo from '../components/ReferanceInfo';
import EducationInfo from '../components/EducationInfo';
import InternshipInfo from '../components/InternshipInfo';

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

  const [currentStep, setCurrentStep] = useState(() => {
    return Number(localStorage.getItem('currentStep')) || 0;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);

  const StepComponent = steps[currentStep].component;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Hamburger Button for Mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-md lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar (Mobile & Desktop) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 p-4 border-r shadow-lg z-50 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:w-72`}
      >
        {/* Close Button (Mobile) */}
        <button
          className="absolute top-4 right-4 text-gray-600 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes size={24} />
        </button>

        <Link to="/">
          <img src="/resumeRingerLogo.png" alt="logo" className="h-16 mb-4" />
        </Link>

        <ul className="w-full space-y-2">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`p-3 text-sm sm:text-lg font-medium text-center cursor-pointer rounded-md transition-all duration-200 shadow-md ${
                currentStep === index ? 'bg-[#037CD5] text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => {
                setCurrentStep(index);
                setIsSidebarOpen(false); // Close sidebar on selection (Mobile)
              }}
            >
              {step.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for Mobile - Click outside to close sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Form Section */}
      <div className="p-6 bg-white shadow-lg rounded-md flex-1">
        <StepComponent
          nextStep={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
          prevStep={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
        />
      </div>
    </div>
  );
};

export default ResumePage;

