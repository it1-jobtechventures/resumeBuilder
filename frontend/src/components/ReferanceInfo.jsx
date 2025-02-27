import React from 'react'

const ReferanceInfo = ({ nextStep, prevStep }) => {
  return (
    <>
      <div >
        <h2 className="text-2xl text-white h-10 text-center font-bold mb-4 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)]">References</h2>
        <form className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700">Reference Name</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter reference name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Company</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter company name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Information</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter contact details" />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Previous
            </button>
            <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ReferanceInfo