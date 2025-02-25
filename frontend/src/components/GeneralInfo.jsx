import React from 'react'

const GeneralInfo = ({nextStep}) => {
  return (
    <>
      <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Step 1: Basic Information</h2>
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
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={nextStep}>
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default GeneralInfo