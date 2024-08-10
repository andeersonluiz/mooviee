'use client';
import { createContext, useContext } from 'react';

interface UserAgentProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const UserAgentContext = createContext<UserAgentProps>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});

export const UserAgentProvider = ({
  children,
  value,
}: {
  children: any;
  value: UserAgentProps;
}) => {
  return (
    <UserAgentContext.Provider value={value}>
      {children}
    </UserAgentContext.Provider>
  );
};

export const useUserAgentData = () => {
  return useContext(UserAgentContext);
};
