import React, { useState, useEffect ,useContext, useRef ,useMemo} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import JoditEditor from 'jodit-react';

const ProjectSection = ({url}) => {
  const [projects, setProjects] = useState(() => {
    // Retrieve data from local storage or use default
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [{ name: "", deployedLink: "", summary: "", githubLink: "" }];
  });
  const { updateResumeData  } = useResume();
  const {activeResumeId} = useContext(AppContext)
  console.log('per',activeResumeId)
  const resumeId = activeResumeId;
  const editor = useRef(null);

  // Save to local storage whenev
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

  const editorConfig = useMemo(() => ({
    readonly: false,
    height: 400,
    toolbarSticky: false,
    buttons: [
      'bold', 'italic', 'underline', 'ul', 'ol', 'font', 'fontsize',
      'paragraph', 'align', 'undo', 'redo', 'link', 'image', 'video'
    ],
    uploader: {
      insertImageAsBase64URI: true,
    }
  }), []);

    const handleSave = async (e) => {
      e.preventDefault();
      if (!resumeId) {
        toast.error("Resume ID is missing");
        console.error("❌ Resume ID is undefined");
        return;
      }
      console.log("📤 Sending data to backend:", { resumeId, ...projects });
      try {
        const data = await axios.post(`${url}/api/project/add-project`, {
          userId: localStorage.getItem("temporaryUserId"),
          resumeId,
          projects,
        });
        console.log("✅ Response from backend:", data);
        toast.success(data.message || 'Saved successfully');
      } catch (error) {
        console.error("❌ Error from backend:", error.response?.data || error);
        toast.error(error.response?.data?.error || 'Save failed');
      }
    };

  return (
    <>
      <div className="p-6 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <input spellCheck={true} type="text" name="name" placeholder="Project Name" style={{ textTransform: 'capitalize' }} value={project.name} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
            <input spellCheck={true} type="url" name="deployedLink" placeholder="Deployed Link" style={{ textTransform: 'capitalize' }} value={project.deployedLink} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
            <JoditEditor spellCheck={true} value={project.summary}config={editorConfig} onBlur={(newContent) => {const updatedProjects = [...projects]; updatedProjects[index].summary = newContent;setProjects(updatedProjects);}}/>
            <input spellCheck={true} type="url" name="githubLink" style={{ textTransform: 'capitalize' }} placeholder="GitHub Link" value={project.githubLink} onChange={(e) => handleChange(index, e)} className="w-full p-2 border rounded-md mb-2"/>
            {projects.length > 1 && (
              <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:underline">
                Remove Project
              </button>
            )}
          </div>
        ))}
        <button onClick={handleSave}>Save</button>
        <button type="button" onClick={addProject} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)] mt-4">
          + Add One More Project
        </button>
      </div>
    </>
  );
};

export default ProjectSection;
