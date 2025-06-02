import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import NavBar from './components/common/NavBar';
import GymCoach from './pages/GymCoach';
import Progress from './pages/Progress';

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <Routes>
            <Route path="/" element={<GymCoach />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App; 