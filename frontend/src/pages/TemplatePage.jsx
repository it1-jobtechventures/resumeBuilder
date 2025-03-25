import React, { useEffect, useState } from 'react';
import axios from 'axios'
import TemplateSelection from '../components/TemplateSelection'

const TemplatePage = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/template/allTemplate');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div>
      <h1>Choose a Template</h1>
      <TemplateSelection templates={templates} />
    </div>
  );
};

export default TemplatePage;