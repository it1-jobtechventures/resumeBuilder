import React, { useState } from 'react';

const LanguagesSection = () => {
  const [languages, setLanguages] = useState([{ language: '', level: '' }]);
  
  const handleChange = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;
    setLanguages(updatedLanguages);
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: '', level: '' }]);
  };

  const removeLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Languages</h2>
      <form>
        {languages.map((lang, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2">
            <select className="p-2 border rounded-md w-1/2" value={lang.language} onChange={(e) => handleChange(index, 'language', e.target.value)}>
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
            <select className="p-2 border rounded-md w-1/2" value={lang.level} onChange={(e) => handleChange(index, 'level', e.target.value)}>
              <option value="">Select Proficiency</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
            <button type="button" onClick={() => removeLanguage(index)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addLanguage} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Add Another Language
        </button>
      </form>
    </div>
  );
};

export default LanguagesSection;
