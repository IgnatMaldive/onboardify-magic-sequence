
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  profileDescription: string;
  setProfileDescription: (profileDescription: string) => void;
  themeColor: string;
  setThemeColor: (themeColor: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('User Name');
  const [profileDescription, setProfileDescription] = useState<string>(
    'Edit this profile description. En un país multicolor nació una abeja bajo el sol. Y fue famosa en el lugar, por su alegría y su bondad.'
  );
  const [themeColor, setThemeColor] = useState<string>('#0f172a'); // Default dark blue

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        username,
        setUsername,
        profileDescription,
        setProfileDescription,
        themeColor,
        setThemeColor
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
