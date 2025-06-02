import React from 'react';
import { DailyStats } from '../../types';

interface CaloriesWeightProps {
  data: DailyStats[];
}

const CaloriesWeight = ({ data }: CaloriesWeightProps) => {
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const getProgressIndicator = (current: number, previous: number, unit: string) => {
    const diff = current - previous;
    const color = diff > 0 ? 'text-green-500' : diff < 0 ? 'text-red-500' : 'text-gray-500';
    const symbol = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
    return <span className={color}>{symbol} {Math.abs(diff)}{unit}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Calories & Weight</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Daily Calories</h3>
            <p className="text-2xl font-bold">{latestData.calories} kcal</p>
          </div>
          {previousData && (
            <div className="text-sm">
              {getProgressIndicator(latestData.calories, previousData.calories, ' kcal')}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Body Weight</h3>
            <p className="text-2xl font-bold">{latestData.weight} lbs</p>
          </div>
          {previousData && (
            <div className="text-sm">
              {getProgressIndicator(latestData.weight, previousData.weight, ' lbs')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaloriesWeight; 