import * as React from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';
import { ChatMessage, WorkoutEntry, MealEntry } from '../types';

interface WeeklyProgress {
  gymData: {
    squat: { date: string; value: number }[];
    bench: { date: string; value: number }[];
    deadlift: { date: string; value: number }[];
  };
  dailyStats: {
    calories: { date: string; value: number }[];
    weight: { date: string; value: number }[];
    protein: { date: string; value: number }[];
  };
}

interface DataContextType {
  messages: ChatMessage[];
  workouts: WorkoutEntry[];
  meals: MealEntry[];
  weeklyProgress: WeeklyProgress;
  error: string | null;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  addWorkout: (workout: Omit<WorkoutEntry, 'id'>) => void;
  addMeal: (meal: Omit<MealEntry, 'id'>) => void;
  addGymData: (date: string, squat: number, bench: number, deadlift: number) => void;
  addDailyStats: (date: string, calories: number, weight: number, protein: number) => void;
  clearError: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress>({
    gymData: {
      squat: [],
      bench: [],
      deadlift: [],
    },
    dailyStats: {
      calories: [],
      weight: [],
      protein: [],
    },
  });

  const clearError = () => setError(null);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'> & { id?: string }) => {
    const newMessage: ChatMessage = {
      ...message,
      id: message.id || crypto.randomUUID(),
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addWorkout = (workout: Omit<WorkoutEntry, 'id'>) => {
    try {
      const newWorkout = {
        ...workout,
        id: Date.now().toString(),
      };
      setWorkouts(prev => [...prev, newWorkout]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add workout');
    }
  };

  const addMeal = (meal: Omit<MealEntry, 'id'>) => {
    try {
      const newMeal = {
        ...meal,
        id: Date.now().toString(),
      };
      setMeals(prev => [...prev, newMeal]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add meal');
    }
  };

  const addGymData = (date: string, squat: number, bench: number, deadlift: number) => {
    try {
      setWeeklyProgress(prev => {
        // Helper function to update a specific lift's data
        const updateLiftData = (liftData: { date: string; value: number }[], newValue: number) => {
          const existingIndex = liftData.findIndex(entry => entry.date === date);
          if (existingIndex >= 0) {
            // Update existing entry
            const newData = [...liftData];
            newData[existingIndex] = { date, value: newValue };
            return newData;
          } else {
            // Add new entry
            return [...liftData, { date, value: newValue }];
          }
        };

        return {
          ...prev,
          gymData: {
            squat: updateLiftData(prev.gymData.squat, squat),
            bench: updateLiftData(prev.gymData.bench, bench),
            deadlift: updateLiftData(prev.gymData.deadlift, deadlift),
          },
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add gym data');
    }
  };

  const addDailyStats = (date: string, calories: number, weight: number, protein: number) => {
    try {
      setWeeklyProgress(prev => {
        // Helper function to update daily stats
        const updateDailyStats = (statsData: { date: string; value: number }[], newValue: number, isWeight: boolean) => {
          const existingIndex = statsData.findIndex(entry => entry.date === date);
          if (existingIndex >= 0) {
            // For weight, replace the value; for calories and protein, add to existing value
            const currentValue = statsData[existingIndex].value;
            const newData = [...statsData];
            newData[existingIndex] = { 
              date, 
              value: isWeight ? newValue : currentValue + newValue 
            };
            return newData;
          } else {
            // Add new entry
            return [...statsData, { date, value: newValue }];
          }
        };

        return {
          ...prev,
          dailyStats: {
            calories: updateDailyStats(prev.dailyStats.calories, calories, false),
            weight: updateDailyStats(prev.dailyStats.weight, weight, true),
            protein: updateDailyStats(prev.dailyStats.protein, protein, false),
          },
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add daily stats');
    }
  };

  const value = {
    messages,
    workouts,
    meals,
    weeklyProgress,
    error,
    addMessage,
    addWorkout,
    addMeal,
    addGymData,
    addDailyStats,
    clearError,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}; 