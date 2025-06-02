export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          role: 'employee' | 'manager'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: 'employee' | 'manager'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: 'employee' | 'manager'
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_by?: string
          created_at?: string
        }
      }
      project_assignments: {
        Row: {
          id: string
          user_id: string
          project_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          created_at?: string
        }
      }
      time_logs: {
        Row: {
          id: string
          user_id: string
          project_id: string
          date: string
          hours: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          date: string
          hours: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          date?: string
          hours?: number
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 