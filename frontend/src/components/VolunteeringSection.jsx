import React, { useState } from 'react';

const VolunteeringSection = () => {
  const [volunteering, setVolunteering] = useState(['']);

  const handleVolunteeringChange = (index, value) => {
    const updatedVolunteering = [...volunteering];
    updatedVolunteering[index] = value;
    setVolunteering(updatedVolunteering);
  };

  const addVolunteering = () => {
    setVolunteering([...volunteering, '']);
  };

  const removeVolunteering = (index) => {
    const updatedVolunteering = volunteering.filter((_, i) => i !== index);
    setVolunteering(updatedVolunteering);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Volunteering</h2>
      {volunteering.map((item, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter volunteering experience" value={item} onChange={(e) => handleVolunteeringChange(index, e.target.value)}/>
          {volunteering.length > 1 && (
            <button type="button" onClick={() => removeVolunteering(index)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              X
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addVolunteering} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        + Add Another Volunteering Experience
      </button>
    </div>
  );
};

export default VolunteeringSection;
