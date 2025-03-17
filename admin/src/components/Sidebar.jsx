import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
        <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
            <nav className="flex flex-col space-y-4">
                <Link to="/" className="hover:bg-gray-700 p-2 rounded">
                    Dashboard
                </Link>
                <Link to="/template" className="hover:bg-gray-700 p-2 rounded">
                    Template
                </Link>
                <Link to="/all-template" className="hover:bg-gray-700 p-2 rounded">
                    All template
                </Link>
            </nav>
        </div>
    </>
  );
};

export default Sidebar;
