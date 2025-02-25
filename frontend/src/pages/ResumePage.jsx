import React, { useState } from 'react'
import GeneralInfo from '../components/GeneralInfo'
import AdditionalInfo from '../components/AdditionalInfo'
import WorkExperience from '../components/WorkExperience'
import SkillsInfo from '../components/SkillsInfo'
import AddSection from '../components/AddSection'
import ReferanceInfo from '../components/ReferanceInfo'
import { Link } from 'react-router-dom'

const ResumePage = () => {
  const steps = [
    { id: 1, title: 'General Information', component: GeneralInfo },
    { id: 2, title: 'Additional Information', component: AdditionalInfo },
    { id: 3, title: 'Work Experience', component: WorkExperience },
    { id: 4, title: 'Skills', component: SkillsInfo },
    { id: 5, title: 'Additional Section', component: AddSection },
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
      <div className="w-56 bg-gray-100 p-4 border-r hidden lg:block">
      <div className='flex flex-col justify-center items-center mb-10'>
        <Link to={'/'}><img src='/resumeRingerLogo.png' alt='logo' className='h-20 text-center' /></Link>
      </div>
        
        <ul>
          {steps.map((step, index) => (
            <li key={step.id} className={`p-2 cursor-pointer rounded-md ${currentStep === index ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}onClick={() => setCurrentStep(index)}>
              {step.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-6">
        <StepComponent nextStep={nextStep} prevStep={prevStep} />
      </div>
    </div>
    </div>
  )
}

export default ResumePage