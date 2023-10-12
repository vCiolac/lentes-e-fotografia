import { createContext } from 'react';
import { User } from 'firebase/auth';


export type ContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  message: string;
  showNotification: React.Dispatch<React.SetStateAction<string>>;
};

export const Context = createContext({} as ContextType);