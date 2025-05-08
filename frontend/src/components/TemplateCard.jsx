// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const TemplateCard = ({ template }) => {
//   const navigate = useNavigate();
//   const { setSelectedTemplateId } = useContext(AppContext);
  
//   const handleClick = () => {
//     navigate('/createResume', { state: { templateId: template._id } });
//     console.log('selected template from template card' , template._id)
//     localStorage.setItem('selectedTemplateId',setSelectedTemplateId(template._id))
//   };

//   return (
//     <>
//       <div onClick={handleClick} className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
//         <img src={template.previewImage} alt={template.name} className="w-full h-60 object-cover"/>
//         <div className="p-4">
//           <h3 className="text-lg font-semibold text-gray-700 text-center">{template.name}</h3>
//         </div>
//       </div>

//     </>

//   );
// };

// export default TemplateCard;
import React, { useContext } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TemplateCard = ({ template , onTemplateSelect}) => {
  const navigate = useNavigate();
  const { setSelectedTemplateId } = useContext(AppContext);
  const location = useLocation();
  const flowType = location.state?.flow || 'template-first'; 

  const handleClick = () => {
    // Save the selected template ID
    localStorage.setItem('selectedTemplateId', template._id);
    setSelectedTemplateId(template._id); // Update the context state as well
    console.log('selected template from template card', template._id);

    // Call the prop if provided (e.g., from ResumeReview)
    if (onTemplateSelect) {
      onTemplateSelect(template._id);
      return; // Stop further navigation
    }

    // Check if the form is already filled (you can replace with your own condition based on filled form data)
    const formFilled = localStorage.getItem('generalInfo') ;
    console.log("Navigation state:", location.state);

    if (flowType === 'form-first' && formFilled) {
      navigate('/resume-review');
    } else {
      navigate('/createResume', { state: { templateId: template._id } });
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <img src={template.previewImage} alt={template.name} className="w-full h-60 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700 text-center">{template.name}</h3>
      </div>
    </div>
  );
};

export default TemplateCard;
