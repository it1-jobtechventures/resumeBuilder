import React, { useState } from 'react'
import GeneralInfo from '../components/GeneralInfo'
import WorkExperience from '../components/WorkExperience'
import SkillsInfo from '../components/SkillsInfo'
import ExtraSection from '../components/ExtraSection'
import ReferanceInfo from '../components/ReferanceInfo'
import { Link } from 'react-router-dom'
import EducationInfo from '../components/EducationInfo'

const ResumePage = () => {
  const steps = [
    { id: 1, title: 'General Information', component: GeneralInfo },
    { id: 2, title: 'Work Experience', component: WorkExperience },
    { id: 3, title: 'Education', component:  EducationInfo},
    { id: 4, title: 'Skills', component: SkillsInfo },
    { id: 5, title: 'Additional Section', component: ExtraSection },
    { id: 6, title: 'References', component: ReferanceInfo }
  ]; 
  const [currentStep, setCurrentStep] = useState(0);
  const StepComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }; 

  return (
    <div>
      <div className="flex min-h-screen">
      <div className="w-56  p-4 border-r hidden lg:block">
      <div className='flex flex-col justify-center items-center mb-10'>
        <Link to={'/'}><img src='/resumeRingerLogo.png' alt='logo' className='h-20 text-center' /></Link>
      </div>
        <ul>
          {steps.map((step, index) => (
            <li key={step.id} className={`p-2 mt-2 font-bold cursor-pointer rounded-md ${currentStep === index ? 'bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white' : 'hover:bg-gray-200'}`}onClick={() => setCurrentStep(index)}>
              {step.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:w-3/4 w-full ">
        <StepComponent nextStep={nextStep} prevStep={prevStep} />
      </div>
    </div>
    </div>
  )
}

export default ResumePage