import React from 'react'

const EducationInfo = ({ nextStep, prevStep }) => {
  return (
    <>
          <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">School Name</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your School Name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter School Location" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Degree</label>
          <select type="text" className="w-full p-2 border rounded-md" placeholder="Enter years of Location" >
            <option>Higher School</option>
            <option>Master degree</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Field of Study</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="E.g. Computer Science" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Graduation Date (or expected Graduation Date)</label>
          <input type="date" className="w-full p-2 border rounded-md" placeholder="Enter Staring data" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CGPA/Percentage</label>
          <input type="Number" className="w-full p-2 border rounded-md" placeholder="Enter Your score" />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700">Ending Date</label>
          <input type="date" className="w-full p-2 border rounded-md" placeholder="Enter Ending date" />
        </div>
        <div className="mb-4 ">
          <input type="checkbox" className="w-full p-2 border rounded-md" placeholder="Enter Ending date" />
          <label className="block text-gray-700">I currently working here </label>
        </div> */}
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

export default EducationInfo