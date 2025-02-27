import React, { useState } from 'react'

const ProjectSection = () => {
  const [projects, setProjects] = useState([
    { name: "", deployedLink: "", summary: "", githubLink: "" },
  ]);
    
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };
    
  const addProject = () => {
    setProjects([...projects, { name: "", deployedLink: "", summary: "", githubLink: "" }]);
  };
    
  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };
  return (
    <>
      <div className="p-6 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4 border-b pb-4">
          <input type="text" name="name" placeholder="Project Name" value={project.name} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
          <input type="url" name="deployedLink" placeholder="Deployed Link" value={project.deployedLink} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
          <textarea name="summary" placeholder="Project Summary" value={project.summary} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"></textarea>
          <input type="url" name="githubLink" placeholder="GitHub Link" value={project.githubLink} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
          {projects.length > 1 && (
            <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:underline">
              Remove Project
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addProject} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
        + Add Another Project
      </button>
    </div>
    </>
  )
}

export default ProjectSection