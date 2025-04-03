import React, { useState, useEffect } from 'react';

const ProjectSection = () => {
  const [projects, setProjects] = useState(() => {
    // Retrieve data from local storage or use default
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [{ name: "", deployedLink: "", summary: "", githubLink: "" }];
  });

  // Save projects data to local storage whenever it updates
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

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

  useEffect(() => {
    if(projects.length === 0) {
      setProjects(
        [{ name: "", deployedLink: "", summary: "", githubLink: "" }]
      )
    }
  },[])

  return (
    <>
      <div className="p-6 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <input type="text" name="name" placeholder="Project Name" style={{ textTransform: 'capitalize' }} value={project.name} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
            <input type="url" name="deployedLink" placeholder="Deployed Link" style={{ textTransform: 'capitalize' }} value={project.deployedLink} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
            <textarea name="summary" placeholder="Project Summary" value={project.summary} style={{ textTransform: 'capitalize' }} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"></textarea>
            <input type="url" name="githubLink" style={{ textTransform: 'capitalize' }} placeholder="GitHub Link" value={project.githubLink} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
            {projects.length > 1 && (
              <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:underline">
                Remove Project
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addProject} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)] mt-4">
          + Add One More Project
        </button>
      </div>
    </>
  );
};

export default ProjectSection;
