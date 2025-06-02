import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaDumbbell, FaChartLine } from 'react-icons/fa';

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      name: 'Coach Carl',
      path: '/',
      icon: <FaDumbbell className="w-5 h-5" />,
    },
    {
      name: 'Progress Tracker',
      path: '/progress',
      icon: <FaChartLine className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex justify-center border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          className={`flex items-center space-x-2 px-6 py-4 ${
            location.pathname === tab.path
              ? 'tab-button-active'
              : 'tab-button'
          }`}
        >
          {tab.icon}
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TabBar; 