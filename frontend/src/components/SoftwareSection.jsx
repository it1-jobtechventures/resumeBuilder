import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const SoftwareSection = () => {
  const [softwareList, setSoftwareList] = useState(() => {
    const savedSoftware = localStorage.getItem('softwareInfo');
    return savedSoftware ? JSON.parse(savedSoftware):[{ name: '', rating: 0 }];
  });

  useEffect(() => {
    localStorage.setItem('softwareInfo' , JSON.stringify(softwareList))
  },[softwareList])

  const handleSoftwareChange = (index, value) => {
    const updatedSoftware = [...softwareList];
    updatedSoftware[index].name = value;
    setSoftwareList(updatedSoftware);
  };

  const handleRatingChange = (index, rating) => {
    const updatedSoftware = [...softwareList];
    updatedSoftware[index].rating = rating;
    setSoftwareList(updatedSoftware);
  };

  const addSoftware = () => {
    setSoftwareList([...softwareList, { name: '', rating: 0 }]);
  };

  const removeSoftware = (index) => {
    const updatedSoftware = softwareList.filter((_, i) => i !== index);
    setSoftwareList(updatedSoftware);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Software</h2>
      {softwareList.map((software, index) => (
        <div key={index} className="mb-4">
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter software name" value={software.name} onChange={(e) => handleSoftwareChange(index, e.target.value)}/>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className={`cursor-pointer text-xl ${software.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} onClick={() => handleRatingChange(index, star)}/>
            ))}
          </div>
          {softwareList.length > 1 && (
            <button type="button" onClick={() => removeSoftware(index)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              X
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addSoftware} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        + Add Another Software
      </button>
    </div>
  );
};

export default SoftwareSection;
