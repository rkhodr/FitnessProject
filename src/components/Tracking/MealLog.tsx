import * as React from 'react';
import { useState } from 'react';
import { useData } from '../../context/DataContext';

interface DailyNutrition {
  date: string;
  calories: number;
  protein: number;
  weight?: number;
}

const MealLog = () => {
  const { addMeal, addDailyStats, weeklyProgress } = useData();
  const [entry, setEntry] = useState<DailyNutrition>({
    date: new Date().toISOString().split('T')[0],
    calories: 0,
    protein: 0,
    weight: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMeal({
      ...entry,
      mealType: 'daily' // Using this as a placeholder since the type requires it
    });

    // Get current values for the selected date
    const getLatestValueForDate = (statsData: { date: string; value: number }[]) => {
      const todaysStats = statsData.find(stat => stat.date === entry.date);
      return todaysStats?.value || 0;
    };

    // Update daily stats with calories and weight if provided
    const currentWeight = entry.weight || getLatestValueForDate(weeklyProgress.dailyStats.weight);
    addDailyStats(entry.date, entry.calories, currentWeight);

    // Reset form calories and protein but keep the date and weight
    setEntry({
      ...entry,
      calories: 0,
      protein: 0,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Log Daily Nutrition</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={entry.date}
            onChange={(e) => setEntry({ ...entry, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Daily Calories</label>
          <input
            type="number"
            value={entry.calories || ''}
            onChange={(e) => setEntry({ ...entry, calories: Number(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter total calories for the day"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Daily Protein (g)</label>
          <input
            type="number"
            value={entry.protein || ''}
            onChange={(e) => setEntry({ ...entry, protein: Number(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter total protein for the day"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (lbs) (optional)</label>
          <input
            type="number"
            value={entry.weight || ''}
            onChange={(e) => setEntry({ ...entry, weight: Number(e.target.value) || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your current weight"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log Daily Nutrition
        </button>
      </form>
    </div>
  );
};

export default MealLog; 