import _ from 'lodash';
import Debug from 'debug';
import useInterval from 'use-interval';
import React, { useState, useEffect, useContext } from 'react';
import { signin, signup, signout } from './api.client';

const debug = Debug('passport');

export interface IContext {
  token?: string;
  signin: (username: string, password: string) => Promise<{ token?: string, error?: string }>;
  signup: (username: string, password: string) => Promise<{ token?: string, error?: string }>;
  signout: () => Promise<void>;
}

export const Context = React.createContext<IContext | undefined>({
  token: undefined,
  signin: async (username, password) => ({}),
  signup: async (username, password) => ({}),
  signout: async () => {},
});

export function usePassport() {
  const context = useContext(Context);
  return context;
};

export const PassportProvider = ({
  context = Context,
  children = null,
  defaultToken,
}: {
  context?: React.Context<IContext>;
  children?: any;
  defaultToken: string;
}) => {
  const [token, setToken] = useState<string | undefined>(defaultToken);

  return <context.Provider value={{
    token,
    signin: async (username, password) => {
      const result = await signin(username, password);
      setToken(result.token);
      return result;
    },
    signup: async (username, password) => {
      const result = await signup(username, password);
      setToken(result.token);
      return result;
    },
    signout: async () => {
      await signout();
      setToken(undefined);
    },
  }}>
    {children}
  </context.Provider>;
};
