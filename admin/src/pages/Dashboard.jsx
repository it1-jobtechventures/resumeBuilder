import React from 'react';
import TemplateUpload from '../components/TemplateUpload';


const Dashboard = () => {
  return (
    <>
      <main className="pt-16 flex">
        <div className="flex-1">
          <TemplateUpload/>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
