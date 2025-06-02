import * as React from 'react';
import { useState } from 'react';
import { useData } from '../../context/DataContext';

interface WorkoutEntry {
  date: string;
  lift: string;
  weight: number;
}

const WorkoutLog = () => {
  const { addWorkout, addGymData, weeklyProgress } = useData();
  const [entry, setEntry] = useState<WorkoutEntry>({
    date: new Date().toISOString().split('T')[0],
    lift: 'squat',
    weight: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkout(entry);

    // Get the latest values for each lift on the selected date
    const getLatestValueForDate = (liftData: { date: string; value: number }[], lift: string) => {
      const todaysLift = liftData.find(entry => entry.date === entry.date);
      return todaysLift?.value || 0;
    };

    // Get current values for each lift type on the selected date
    const latestSquat = entry.lift === 'squat' ? entry.weight : 
      getLatestValueForDate(weeklyProgress.gymData.squat, 'squat');
    const latestBench = entry.lift === 'bench' ? entry.weight :
      getLatestValueForDate(weeklyProgress.gymData.bench, 'bench');
    const latestDeadlift = entry.lift === 'deadlift' ? entry.weight :
      getLatestValueForDate(weeklyProgress.gymData.deadlift, 'deadlift');

    // Update progress with new PR and maintain other lifts for the same date
    addGymData(entry.date, latestSquat, latestBench, latestDeadlift);

    // Reset form weight but keep the date
    setEntry({
      ...entry,
      weight: 0
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Log PR Lift</h2>
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
          <label className="block text-sm font-medium text-gray-700">Lift</label>
          <select
            value={entry.lift}
            onChange={(e) => setEntry({ ...entry, lift: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="squat">Squat</option>
            <option value="bench">Bench Press</option>
            <option value="deadlift">Deadlift</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">PR Weight (lbs)</label>
          <input
            type="number"
            value={entry.weight || ''}
            onChange={(e) => setEntry({ ...entry, weight: Number(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your PR weight"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log PR
        </button>
      </form>
    </div>
  );
};

export default WorkoutLog; 