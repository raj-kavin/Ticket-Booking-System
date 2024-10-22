import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Users } from '../models/model';

interface UserContextType {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined); 

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Users | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
