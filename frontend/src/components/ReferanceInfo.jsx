import React from 'react'

const ReferanceInfo = ({ nextStep, prevStep }) => {
  return (
    <div>
        <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Step 6: References</h2>
      <form>
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
          <button 
            type="button" 
            onClick={prevStep} 
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Previous
          </button>
          <button 
            type="button" 
            onClick={nextStep} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Next
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default ReferanceInfo