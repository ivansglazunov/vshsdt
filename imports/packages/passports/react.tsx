import Cookie from 'js-cookie';
import * as _ from 'lodash';
import * as Debug from 'debug';
import useInterval from 'use-interval';
import React, { useState, useEffect, useContext } from 'react';
import { signin, signout } from './api';

const debug = Debug('passport');

export interface IContext {
  token?: string;
  signin: (username: string, password: string) => Promise<{ token?: string, error?: string }>;
  signout: () => Promise<void>;
}

export const Context = React.createContext<IContext | undefined>(undefined);

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
    signout: async () => {
      await signout();
      setToken(undefined);
    },
  }}>
    {children}
  </context.Provider>;
};
