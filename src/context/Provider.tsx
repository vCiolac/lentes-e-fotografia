import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { Context } from './Context';

type ProviderProps = {
  children: React.ReactNode;
};

function Provider({ children }: ProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [message, showNotification] = useState('');

  return (
    <Context.Provider value={{
      user,
      setUser,
      message,
      showNotification,
    }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;