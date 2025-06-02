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
  reps: number;
  sets: number;
}

export interface MealEntry {
  id: string;
  date: string;
  calories: number;
  protein: number;
  weight?: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
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

export interface GymData {
  squat: DateValue[];
  bench: DateValue[];
  deadlift: DateValue[];
}

export interface DailyStats {
  calories: DateValue[];
  weight: DateValue[];
} 