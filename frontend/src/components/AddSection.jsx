import React from 'react'

const AddSection = ({ nextStep, prevStep }) => {
  return (
    <>
         <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Step 5: Additional Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Certifications</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter certifications" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Languages</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter languages you know" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hobbies & Interests</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your hobbies and interests" />
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
    </>
  )
}

export default AddSection