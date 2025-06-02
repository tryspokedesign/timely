export type UserRole = 'employee' | 'manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  created_by: string;
}

export interface ProjectAssignment {
  id: string;
  user_id: string;
  project_id: string;
}

export interface TimeLog {
  id: string;
  user_id: string;
  project_id: string;
  date: string;
  hours: number;
  notes: string;
} 