import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WeeklyProgress, DateValue } from '../../types';

interface ProgressChartsProps {
  gymData: WeeklyProgress['gymData'];
  dailyStats: WeeklyProgress['dailyStats'];
}

interface ChartDataPoint {
  date: string;
  squat: number;
  bench: number;
  deadlift: number;
  weight: number;
  calories: number;
}

const ProgressCharts: React.FC<ProgressChartsProps> = ({ gymData, dailyStats }) => {
  // Transform data for charts
  const transformData = () => {
    // Create a map of all dates
    const dateMap = new Map<string, ChartDataPoint>();

    // Add all dates from all data sources
    const allDates = [
      ...gymData.squat,
      ...gymData.bench,
      ...gymData.deadlift,
      ...dailyStats.weight,
      ...dailyStats.calories
    ].map((item: DateValue) => item.date);

    // Create unique set of dates
    new Set(allDates).forEach(date => {
      dateMap.set(date, {
        date,
        squat: 0,
        bench: 0,
        deadlift: 0,
        weight: 0,
        calories: 0
      });
    });

    // Fill in the values
    gymData.squat.forEach((item: DateValue) => {
      if (dateMap.has(item.date)) {
        const point = dateMap.get(item.date);
        if (point) {
          point.squat = item.value;
        }
      }
    });

    gymData.bench.forEach((item: DateValue) => {
      if (dateMap.has(item.date)) {
        const point = dateMap.get(item.date);
        if (point) {
          point.bench = item.value;
        }
      }
    });

    gymData.deadlift.forEach((item: DateValue) => {
      if (dateMap.has(item.date)) {
        const point = dateMap.get(item.date);
        if (point) {
          point.deadlift = item.value;
        }
      }
    });

    dailyStats.weight.forEach((item: DateValue) => {
      if (dateMap.has(item.date)) {
        const point = dateMap.get(item.date);
        if (point) {
          point.weight = item.value;
        }
      }
    });

    dailyStats.calories.forEach((item: DateValue) => {
      if (dateMap.has(item.date)) {
        const point = dateMap.get(item.date);
        if (point) {
          point.calories = item.value;
        }
      }
    });

    // Convert map to array and sort by date
    return Array.from(dateMap.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const chartData = transformData();

  return (
    <div className="space-y-8">
      {/* Lift Progress Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Lift Progress</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="squat" stroke="#8884d8" name="Squat" />
              <Line type="monotone" dataKey="bench" stroke="#82ca9d" name="Bench" />
              <Line type="monotone" dataKey="deadlift" stroke="#ffc658" name="Deadlift" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weight and Calories Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Weight & Calories</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="weight" 
                stroke="#8884d8" 
                name="Weight (lbs)" 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="calories" 
                stroke="#82ca9d" 
                name="Calories" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts; 