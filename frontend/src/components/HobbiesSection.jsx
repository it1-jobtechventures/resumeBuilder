import React, { useState } from 'react'

const HobbiesSection = () => {
  const [interests, setInterests] = useState(['']);

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
  };

  const addInterest = () => {
    setInterests([...interests, '']);
  };

  const removeInterest = (index) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
  };
  return (
    <>
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Interests & Hobbies</h2>
      {interests.map((interest, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter an interest or hobby" value={interest} onChange={(e) => handleInterestChange(index, e.target.value)}/>
          {interests.length > 1 && (
            <button type="button" onClick={() => removeInterest(index)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              X
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addInterest} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        + Add Another Interest/Hobby
      </button>
    </div>
  </>
  )
}

export default HobbiesSection