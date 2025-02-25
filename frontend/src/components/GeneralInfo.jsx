import React from 'react'

const GeneralInfo = ({nextStep}) => {
  return (
    <>
      <div className="w-full mx-auto p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">First Name<span className='text-red-700 pl-0.5'>*</span></label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your first name"required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name<span className='text-red-700 pl-0.5'>*</span></label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your Last name" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email<span className='text-red-700 pl-0.5'>*</span></label>
            <input type="email" className="w-full p-2 border rounded-md" placeholder="Enter your email" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number<span className='text-red-700 pl-0.5'>*</span></label>
            <input type="tel" className="w-full p-2 border rounded-md" placeholder="Enter your phone number" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your City" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country<span className='text-red-700 pl-0.5'>*</span></label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your Country" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pincode</label>
            <input type="Number" className="w-full p-2 border rounded-md" placeholder="Enter your Pincode" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">LinkedIn Url</label>
            <input type="url" className="w-full p-2 border rounded-md" placeholder="Enter your linkedin url" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Portfolio</label>
            <input type="url" className="w-full p-2 border rounded-md" placeholder="Enter your Portfolio" />
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