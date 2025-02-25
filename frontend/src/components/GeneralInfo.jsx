import React from 'react'

const GeneralInfo = ({nextStep}) => {
  return (
    <>
      <div className="w-full mx-auto p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your full name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border rounded-md" placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input type="tel" className="w-full p-2 border rounded-md" placeholder="Enter your phone number" />
          </div>  
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your address" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Job Role</label>
            <select className="w-full p-2 border rounded-md">
              <option>Select your role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default GeneralInfo