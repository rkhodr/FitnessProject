import React from 'react';
import { WeeklyProgress } from '../../types';

interface ProgressSummaryProps {
  data: WeeklyProgress;
}

const ProgressSummary = ({ data }: ProgressSummaryProps) => {
  const getWeightChange = () => {
    const weights = data.dailyStats.weight;
    if (weights.length < 2) return 0;
    
    // Sort weights by date to ensure we're comparing oldest to newest
    const sortedWeights = [...weights].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    return sortedWeights[sortedWeights.length - 1].value - sortedWeights[0].value;
  };

  const getStrengthProgress = () => {
    const { squat, bench, deadlift } = data.gymData;
    if (!squat.length || !bench.length || !deadlift.length) return 0;
    
    // Sort each lift array by date
    const sortedSquat = [...squat].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const sortedBench = [...bench].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const sortedDeadlift = [...deadlift].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const totalInitial = 
      sortedSquat[0].value + 
      sortedBench[0].value + 
      sortedDeadlift[0].value;
    
    const totalLatest = 
      sortedSquat[sortedSquat.length - 1].value + 
      sortedBench[sortedBench.length - 1].value + 
      sortedDeadlift[sortedDeadlift.length - 1].value;
    
    return totalLatest - totalInitial;
  };

  const weightChange = getWeightChange();
  const strengthProgress = getStrengthProgress();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-2">Progress Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Weight Change</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} lbs
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Total Strength Gain</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {strengthProgress > 0 ? '+' : ''}{strengthProgress} lbs
          </p>
        </div>
      </div>
      
      {(weightChange !== 0 || strengthProgress !== 0) && (
        <p className="mt-4 text-gray-600">
          {weightChange !== 0 && `You've ${weightChange > 0 ? 'gained' : 'lost'} ${Math.abs(weightChange).toFixed(1)} lbs. `}
          {strengthProgress !== 0 && `Your total lift numbers have ${strengthProgress > 0 ? 'increased' : 'decreased'} by ${Math.abs(strengthProgress)} lbs. `}
          {strengthProgress > 0 && '💪 Keep up the great work!'}
          {strengthProgress <= 0 && '💪 Keep pushing!'}
        </p>
      )}
      {weightChange === 0 && strengthProgress === 0 && (
        <p className="mt-4 text-gray-600">
          Start logging your workouts and weight to see your progress here!
        </p>
      )}
    </div>
  );
};

export default ProgressSummary; 