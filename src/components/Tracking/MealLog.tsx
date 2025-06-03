import * as React from 'react';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MealEntry } from '../../types';

const MealLog = () => {
  const { addMeal, addDailyStats, weeklyProgress, meals } = useData();
  const [entry, setEntry] = useState<Omit<MealEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    calories: 0,
    protein: 0,
    name: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMeal(entry);

    // Calculate total calories for the day
    const todaysMeals = meals.filter(meal => meal.date === entry.date);
    const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0) + entry.calories;
    const totalProtein = todaysMeals.reduce((sum, meal) => sum + meal.protein, 0) + entry.protein;

    // Update daily stats with total calories
    const currentWeight = weeklyProgress.dailyStats.weight.find(stat => stat.date === entry.date)?.value || 0;
    addDailyStats(entry.date, totalCalories, currentWeight, totalProtein);

    // Reset form but keep the date and time
    setEntry({
      ...entry,
      calories: 0,
      protein: 0,
      name: ''
    });
  };

  // Get today's meals
  const todaysMeals = meals
    .filter(meal => meal.date === entry.date)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Calculate totals
  const dailyTotals = {
    calories: todaysMeals.reduce((sum, meal) => sum + meal.calories, 0),
    protein: todaysMeals.reduce((sum, meal) => sum + meal.protein, 0)
  };

  return (
    <div className="space-y-6">
      {/* Meal Entry Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Log a Meal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={entry.date}
              onChange={(e) => setEntry({ ...entry, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={entry.time}
              onChange={(e) => setEntry({ ...entry, time: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Meal Name</label>
            <input
              type="text"
              value={entry.name}
              onChange={(e) => setEntry({ ...entry, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter meal name"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Calories</label>
              <input
                type="number"
                value={entry.calories || ''}
                onChange={(e) => setEntry({ ...entry, calories: Number(e.target.value) || 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter calories"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
              <input
                type="number"
                value={entry.protein || ''}
                onChange={(e) => setEntry({ ...entry, protein: Number(e.target.value) || 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter protein"
                required
                min="0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log Meal
          </button>
        </form>
      </div>

      {/* Today's Meals Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Today's Meals</h2>
          <div className="text-sm text-gray-600">
            <p>Total Calories: {dailyTotals.calories}</p>
            <p>Total Protein: {dailyTotals.protein}g</p>
          </div>
        </div>
        <div className="space-y-4">
          {todaysMeals.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No meals logged for today</p>
          ) : (
            todaysMeals.map((meal) => (
              <div key={meal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{meal.name}</h3>
                    <p className="text-sm text-gray-600">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{meal.calories} cal</p>
                    <p className="text-sm text-gray-600">{meal.protein}g protein</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MealLog; 