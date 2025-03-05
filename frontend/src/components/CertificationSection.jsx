import React, { useState, useEffect } from 'react';

const CertificationSection = ({ nextStep, prevStep }) => {
  const [certifications, setCertifications] = useState(() => {
    // Retrieve from local storage or initialize with a single empty field
    const savedCertifications = localStorage.getItem('certifications');
    return savedCertifications ? JSON.parse(savedCertifications) : [""];
  });

  // Save to local storage whenever certifications change
  useEffect(() => {
    localStorage.setItem('certifications', JSON.stringify(certifications));
  }, [certifications]);

  const handleAddCertification = () => {
    setCertifications([...certifications, ""]);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  const handleChange = (index, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = value;
    setCertifications(updatedCertifications);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Certifications</h2>
      <form>
        {certifications.map((certification, index) => (
          <div key={index} className="mb-4 flex items-center">
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter certification" value={certification} onChange={(e) => handleChange(index, e.target.value)}/>
            {certifications.length > 1 && (
              <button  type="button"  onClick={() => handleRemoveCertification(index)}  className="ml-2 text-red-500 hover:text-red-700">
                ✖
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddCertification} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          + Add Certification
        </button>
      </form>
    </div>
  );
};

export default CertificationSection;
