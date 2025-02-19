export interface User {
    id: number;
    username: string;
    password: string; // This will store the hashed password
  }
  
  export interface Task {
    id: number;
    title: string;
    description?: string;
    is_complete: boolean;
    user_id: number;
  }