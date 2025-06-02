export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface GymData {
  date: Date;
  squat: number;
  bench: number;
  deadlift: number;
}

export interface DailyStats {
  date: Date;
  calories: number;
  weight: number;
}

export interface WeeklyProgress {
  startDate: Date;
  endDate: Date;
  gymData: GymData[];
  dailyStats: DailyStats[];
} 