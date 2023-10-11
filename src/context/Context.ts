import { createContext } from 'react';
import { User } from 'firebase/auth';


export type ContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};

export const Context = createContext({} as ContextType);