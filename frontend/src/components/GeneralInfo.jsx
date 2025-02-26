import React from 'react'

const GeneralInfo = ({nextStep}) => {
  return (
    <>
    <div className='flex justify-center items-center min-h-screen p-4'>
    <div className="w-full  rounded-lg ">
        <h2 className="text-2xl p-3 text-white text-center font-bold mb-1 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)]">Basic Information</h2>
        <div className='flex  justify-center'>
        <form className='p-6  '>
          <div className='flex gap-2'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">First Name<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Rohit" required />
            </div>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Last Name<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Sharma" required/>
            </div>
          </div>
          <div className='flex gap-2 flex-col lg:flex-row'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Email<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="email" className="w-full p-2 border rounded-md" placeholder="rohit@gmail.com" required/>
            </div>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Phone Number<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="tel" className="w-full p-2 border rounded-md" placeholder="Enter your phone number" required/>
            </div>
          </div>
          <div className='flex gap-2 lg:flex-row flex-col'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">City</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your City" />
            </div>
            <div className='flex gap-2'>
              <div className="mb-4">
                <label className="block text-[#4b164c] font-bold">Country<span className='text-red-700 pl-0.5'>*</span></label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your Country" required/>
              </div>
              <div className="mb-4">
                <label className="block text-[#4b164c] font-bold">Pincode</label>
                <input type="Number" className="w-full p-2 border rounded-md" placeholder="Enter your Pincode" />
              </div>
            </div>
          </div>
          <div className='flex gap-2 lg:flex-row flex-col'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">LinkedIn Url</label>
              <input type="url" className="w-full p-2 border rounded-md" placeholder="Enter your linkedin url" />
            </div>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Portfolio</label>
              <input type="url" className="w-full p-2 border rounded-md" placeholder="Enter your Portfolio" />
            </div>
          </div>
          <div className="flex lg:justify-end ">
            <button type="button" onClick={nextStep} className="w-full  lg:w-auto bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
              Next
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default GeneralInfo
