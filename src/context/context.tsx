import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Users, Movie } from '../models/model';
interface UserContextType {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
  movie: Movie[]; 
  setMovie: React.Dispatch<React.SetStateAction<Movie[]>>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined); 

interface UserProviderProps {
  children: ReactNode;
}

// Provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [movie, setMovie] = useState<Movie[]>([]); // Array of movies

  return (
    <UserContext.Provider value={{ user, setUser, movie, setMovie }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
