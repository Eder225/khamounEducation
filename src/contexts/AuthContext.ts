import { createContext } from 'react';
import { User } from 'firebase/auth';

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin' | null;

export interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthReady: boolean;
  isLoadingRole: boolean;
}

export const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  role: null,
  isAuthReady: false,
  isLoadingRole: false
});

