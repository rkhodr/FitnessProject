import * as React from 'react';
import { useData } from '../../context/DataContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WorkoutEntry, MealEntry } from '../../types';

const Overview = () => {
  const { workouts, meals } = useData();

  // Process weight data
  const weightData = meals
    .filter((meal) => meal.weight)
    .map((meal) => ({
      date: meal.date,
      weight: meal.weight
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Process lift progress
  const liftProgress: Record<string, Array<{ date: string; weight: number }>> = {
    squat: [],
    bench: [],
    deadlift: []
  };

  workouts.forEach((workout) => {
    if (workout.lift in liftProgress) {
      liftProgress[workout.lift].push({
        date: workout.date,
        weight: workout.weight
      });
    }
  });

  // Sort lift progress by date
  Object.keys(liftProgress).forEach(lift => {
    liftProgress[lift].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  });

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Progress Overview</h2>
      
      {/* Weight Progress Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Weight Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (lbs)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lift Progress Charts */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Lift Progress</h3>
        <div className="space-y-6">
          {Object.entries(liftProgress).map(([lift, data]) => (
            <div key={lift} className="h-64">
              <h4 className="text-md font-medium mb-2 capitalize">{lift}</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="weight" stroke="#82ca9d" name="Weight (lbs)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Weight Change</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {weightData.length > 1 && weightData[weightData.length - 1]?.weight && weightData[0]?.weight
              ? `${(weightData[weightData.length - 1].weight - weightData[0].weight).toFixed(1)} lbs`
              : 'No data'}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Workouts</h3>
          <p className="text-3xl font-bold text-indigo-600">{workouts.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Meals Logged</h3>
          <p className="text-3xl font-bold text-indigo-600">{meals.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview; 