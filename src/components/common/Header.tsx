import React from 'react';
import { FaCog } from 'react-icons/fa';

interface HeaderProps {
  title: string;
  onSettingsClick?: () => void;
}

const Header = ({ title, onSettingsClick }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      {onSettingsClick && (
        <button
          onClick={onSettingsClick}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
        >
          <FaCog className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Header; 