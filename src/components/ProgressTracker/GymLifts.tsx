import React from 'react';
import { GymData } from '../../types';

interface GymLiftsProps {
  data: GymData[];
}

const GymLifts = ({ data }: GymLiftsProps) => {
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const getProgressIndicator = (current: number, previous: number) => {
    const diff = current - previous;
    const color = diff > 0 ? 'text-green-500' : diff < 0 ? 'text-red-500' : 'text-gray-500';
    const symbol = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
    return <span className={color}>{symbol} {Math.abs(diff)}lbs</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Gym Lifts Progress</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Squat</h3>
            <p className="text-2xl font-bold">{latestData.squat}lbs</p>
          </div>
          {previousData && (
            <div className="text-sm">
              {getProgressIndicator(latestData.squat, previousData.squat)}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Bench Press</h3>
            <p className="text-2xl font-bold">{latestData.bench}lbs</p>
          </div>
          {previousData && (
            <div className="text-sm">
              {getProgressIndicator(latestData.bench, previousData.bench)}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Deadlift</h3>
            <p className="text-2xl font-bold">{latestData.deadlift}lbs</p>
          </div>
          {previousData && (
            <div className="text-sm">
              {getProgressIndicator(latestData.deadlift, previousData.deadlift)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GymLifts; 