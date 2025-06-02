export interface ChatMessage {
  id?: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: number;
}

export interface WorkoutEntry {
  id: string;
  date: string;
  lift: string;
  weight: number;
}

export interface MealEntry {
  id: string;
  date: string;
  calories: number;
  protein: number;
  weight?: number;
  mealType: 'daily';
}

export interface DateValue {
  date: string;
  value: number;
}

export interface WeeklyProgress {
  gymData: {
    squat: DateValue[];
    bench: DateValue[];
    deadlift: DateValue[];
  };
  dailyStats: {
    calories: DateValue[];
    weight: DateValue[];
  };
} 