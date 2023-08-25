/** @format */

import { createContext, useContext } from 'react';

export interface UserInfo {
  name: string;
  mail: string;
  last_login: number | string;
  // setUserInfo: (value: any) => void;
}

export const UserStoreContext = createContext<UserInfo | null>(null);

export const UserInfo = (): UserInfo => {
  const context = useContext(UserStoreContext);
  if (!context) {
    throw new Error(
      'useFilscanStore must be used within a FilscanStoreProvider'
    );
  }
  return context;
};
