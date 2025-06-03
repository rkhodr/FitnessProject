import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRobot, FaComment, FaChartLine } from 'react-icons/fa';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <FaRobot className="h-8 w-8 text-indigo-600 transform rotate-12" />
                <h1 className="text-3xl font-bold text-indigo-600">Spottr</h1>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-3 pt-1 border-b-2 text-lg font-medium space-x-2 ${
                  location.pathname === '/'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FaComment className="h-5 w-5" />
                <span>Chat</span>
              </Link>
              <Link
                to="/progress"
                className={`inline-flex items-center px-3 pt-1 border-b-2 text-lg font-medium space-x-2 ${
                  location.pathname === '/progress'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FaChartLine className="h-5 w-5" />
                <span>Progress</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 