import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const { weeklyProgress, addDailyStats } = useData();
  const [newWeight, setNewWeight] = useState('');

  // Get the last 7 days of data
  const dates = [...new Set([
    ...weeklyProgress.dailyStats.calories.map(entry => entry.date),
    ...weeklyProgress.dailyStats.protein.map(entry => entry.date),
    ...weeklyProgress.gymData.squat.map(entry => entry.date),
    ...weeklyProgress.gymData.bench.map(entry => entry.date),
    ...weeklyProgress.gymData.deadlift.map(entry => entry.date),
  ])].sort().slice(-7);

  // Weight Summary Section
  const weightData = weeklyProgress.dailyStats.weight
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestWeight = weightData[0];
  const previousWeight = weightData[1];
  const weightChange = previousWeight ? (latestWeight.value - previousWeight.value).toFixed(1) : '0.0';
  const weightChangeDirection = Number(weightChange) > 0 ? 'gained' : Number(weightChange) < 0 ? 'lost' : 'maintained';

  // Calculate weekly weight change
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weekOldWeight = weightData.find(entry => 
    new Date(entry.date) <= oneWeekAgo
  );
  const weeklyWeightChange = weekOldWeight 
    ? (latestWeight.value - weekOldWeight.value).toFixed(1)
    : '0.0';
  const weeklyChangeDirection = Number(weeklyWeightChange) > 0 ? 'gained' : Number(weeklyWeightChange) < 0 ? 'lost' : 'maintained';

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const weight = parseFloat(newWeight);
    if (!isNaN(weight)) {
      // Get current calories and protein for today
      const todayCalories = weeklyProgress.dailyStats.calories
        .find(stat => stat.date === today)?.value || 0;
      const todayProtein = weeklyProgress.dailyStats.protein
        .find(stat => stat.date === today)?.value || 0;
      
      addDailyStats(today, todayCalories, weight, todayProtein);
      setNewWeight('');
    }
  };

  // Prepare data for the combined calories and protein chart
  const nutritionData = {
    labels: dates,
    datasets: [
      {
        label: 'Calories',
        data: dates.map(date => {
          const entry = weeklyProgress.dailyStats.calories.find(e => e.date === date);
          return entry ? entry.value : 0;
        }),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y-calories',
      },
      {
        label: 'Protein (g)',
        data: dates.map(date => {
          const entry = weeklyProgress.dailyStats.protein.find(e => e.date === date);
          return entry ? entry.value : 0;
        }),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        yAxisID: 'y-protein',
      },
    ],
  };

  // Prepare data for the lifts chart
  const liftsData = {
    labels: dates,
    datasets: [
      {
        label: 'Squat',
        data: dates.map(date => {
          const entry = weeklyProgress.gymData.squat.find(e => e.date === date);
          return entry ? entry.value : null;
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Bench',
        data: dates.map(date => {
          const entry = weeklyProgress.gymData.bench.find(e => e.date === date);
          return entry ? entry.value : null;
        }),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Deadlift',
        data: dates.map(date => {
          const entry = weeklyProgress.gymData.deadlift.find(e => e.date === date);
          return entry ? entry.value : null;
        }),
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  };

  const nutritionOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Daily Nutrition Overview',
      },
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      'y-calories': {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Calories',
        },
        min: 0,
      },
      'y-protein': {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Protein (g)',
        },
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
      },
    },
  };

  const liftsOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Lift Progress',
      },
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Weight (lbs)',
        },
        min: 0,
      },
    },
  };

  return (
    <div className="p-4 space-y-6">
      {/* Weight Input and Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Weight Tracking</h2>
            <form onSubmit={handleWeightSubmit} className="flex gap-2">
              <div>
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Weight (lbs)"
                  step="0.1"
                  min="0"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Weight
              </button>
            </form>
          </div>
          {latestWeight && (
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">
                {latestWeight.value} lbs
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Last recorded: {new Date(latestWeight.date).toLocaleDateString()}
              </div>
              <div className="text-sm mt-1">
                {weekOldWeight && (
                  <span className={Number(weeklyWeightChange) > 0 ? 'text-red-500' : Number(weeklyWeightChange) < 0 ? 'text-green-500' : 'text-gray-500'}>
                    {Number(weeklyWeightChange) > 0 ? 'Up' : Number(weeklyWeightChange) < 0 ? 'Down' : 'No change'} {Math.abs(Number(weeklyWeightChange))} lbs in the last week!
                  </span>
                )}
              </div>
              {previousWeight && (
                <div className="mt-2 text-sm">
                  <span className={Number(weightChange) > 0 ? 'text-red-500' : Number(weightChange) < 0 ? 'text-green-500' : 'text-gray-500'}>
                    You've {weightChangeDirection} {Math.abs(Number(weightChange))} lbs since last weigh-in
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Nutrition Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nutrition Overview</h2>
        <Line options={nutritionOptions} data={nutritionData} />
      </div>

      {/* Lifts Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lift Progress</h2>
        <Line options={liftsOptions} data={liftsData} />
      </div>
    </div>
  );
};

export default Overview; 