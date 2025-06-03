import * as React from 'react';
import { useState } from 'react';
import Header from '../components/common/Header';
import Overview from '../components/Tracking/Overview';
import { useData } from '../context/DataContext';
import WorkoutLog from '../components/Tracking/WorkoutLog';
import MealLog from '../components/Tracking/MealLog';

const Progress = () => {
  const { weeklyProgress } = useData();
  const [activeTab, setActiveTab] = useState('overall');

  const renderContent = () => {
    switch (activeTab) {
      case 'overall':
        return (
          <div className="bg-gray-50 rounded-lg">
            <Overview />
          </div>
        );
      case 'workout':
        return <WorkoutLog />;
      case 'meals':
        return <MealLog />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Progress Tracker" />
      <div className="flex-1 p-4 space-y-6 max-w-7xl mx-auto w-full">
        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('overall')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'overall'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Overall Progress
                </button>
                <button
                  onClick={() => setActiveTab('workout')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'workout'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Workout Log
                </button>
                <button
                  onClick={() => setActiveTab('meals')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'meals'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Meal Log
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Content Area */}
        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Progress; 