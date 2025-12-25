
export enum ChapterStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}

export enum DayStatus {
  COMPLETED = 'completed',
  PARTIAL = 'partial',
  MISSED = 'missed',
  FUTURE = 'future'
}

export interface Chapter {
  id: string;
  name: string;
  status: ChapterStatus;
}

export type SubjectMedium = 'English' | 'Marathi' | 'Sanskrit';

export interface Subject {
  id: string;
  name: string;
  medium: SubjectMedium;
  chapters: Chapter[];
  isWeak?: boolean;
}

export enum AppPhase {
  SYLLABUS = 'Syllabus Completion',
  PAPER_SOLVING = 'Paper Solving'
}

export interface DayLog {
  date: string; // YYYY-MM-DD
  status: DayStatus;
  notes?: string;
}

export interface UserData {
  startDate: string; // App creation date
  journeyStartedAt?: string; // Date when "Start" button was pressed
  isStarted: boolean; // Tracking if the journey has officially begun
  subjects: Subject[];
  targetDays: number; // usually 340
  logs: Record<string, DayLog>; // key is YYYY-MM-DD
}

export interface DailySchedule {
  time: string;
  start: number; // Hour in 24h format for logic
  end: number;
  task: string;
  type: 'busy' | 'study' | 'rest';
  category: 'coaching' | 'school' | 'self' | 'rest';
}
