import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { Context } from './Context';

type ProviderProps = {
  children: React.ReactNode;
};

function Provider({ children }: ProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [errorMsg, setErrorMsg] = useState('');


  return (
    <Context.Provider value={{
      user,
      setUser,
      errorMsg,
      setErrorMsg,
    }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;