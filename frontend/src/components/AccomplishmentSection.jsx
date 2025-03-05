import React, { useState, useEffect } from 'react';

const AccomplishmentsSection = () => {
  const [accomplishments, setAccomplishments] = useState(() => {
    // Retrieve from local storage or initialize with a single empty entry
    const savedAccomplishments = localStorage.getItem('accomplishments');
    return savedAccomplishments ? JSON.parse(savedAccomplishments) : [''];
  });

  // Save to local storage whenever accomplishments change
  useEffect(() => {
    localStorage.setItem('accomplishments', JSON.stringify(accomplishments));
  }, [accomplishments]);

  const handleAccomplishmentChange = (index, value) => {
    const updatedAccomplishments = [...accomplishments];
    updatedAccomplishments[index] = value;
    setAccomplishments(updatedAccomplishments);
  };

  const addAccomplishment = () => {
    setAccomplishments([...accomplishments, '']);
  };

  const removeAccomplishment = (index) => {
    const updatedAccomplishments = accomplishments.filter((_, i) => i !== index);
    setAccomplishments(updatedAccomplishments);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Accomplishments</h2>
      {accomplishments.map((accomplishment, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter an accomplishment" value={accomplishment} onChange={(e) => handleAccomplishmentChange(index, e.target.value)}/>
          {accomplishments.length > 1 && (
            <button type="button" onClick={() => removeAccomplishment(index)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              X
            </button>
          )}
        </div>
      ))}
      <button type="button"onClick={addAccomplishment} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        + Add Another Accomplishment
      </button>
    </div>
  );
};

export default AccomplishmentsSection;
