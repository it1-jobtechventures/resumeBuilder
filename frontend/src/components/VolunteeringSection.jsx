import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const VolunteeringSection = () => {
  const [volunteering, setVolunteering] = useState(() => {
    const savedVolunteering = localStorage.getItem('volunteering');
    return savedVolunteering ? JSON.parse(savedVolunteering) : [''];
  });

  useEffect(() => {
    localStorage.setItem('volunteering', JSON.stringify(volunteering));
  }, [volunteering]);

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
            <button type="button" onClick={() => removeVolunteering(index)} className="ml-2 text-red-500 hover:text-red-700 font-extrabold text-3xl">
              <RxCross2/>
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addVolunteering} className="mt-2 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
        + Add Another Volunteering Experience
      </button>
    </div>
  );
};

export default VolunteeringSection;
