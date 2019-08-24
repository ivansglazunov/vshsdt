import Cookie from 'js-cookie';
import * as _ from 'lodash';
import * as Debug from 'debug';
import useInterval from 'use-interval';
import React, { useState, useEffect, useContext } from 'react';

const debug = Debug('passport');

// TODO url support for microservices (now only current app)

let rp, axios, request;
if (process.browser) {
  axios = require('axios');
  request = ({
    method,
    url,
    data,
  }: {
    method: string;
    url: string;
    data: { [key: string]: string; };
  }) => axios({
    method: method.toLowerCase(),
    url,
    data,
  });
} else {
  rp = require('request-promise');
  request = ({
    method,
    url,
    data,
  }: {
    method: string;
    url: string;
    data: { [key: string]: string; };
  }) => rp({
    method: method.toUpperCase(),
    uri: url,
    body: data,
  });
}

export const login = async (
  username: string,
  password: string,
): Promise<{ token?: string, error?: string }> => {
  const q = {
    method: 'post',
    url:`/_passports/login`,
    data: {
      username,
      password,
    },
  };
  const { data: { node, error } } = await request(q);
  debug('login', { node });
  const token = _.get(node, 'sessions.0.token');
  if (token) Cookie.set('token', token);
  return { token, error };
};

export const logout = async (): Promise<void> => {
  const q = {
    method: 'get',
    url:`/_passports/logout`,
  };
  await request(q);
  Cookie.remove('token');
};

export interface IContext {
  token?: string;
  login: (username: string, password: string) => Promise<{ token?: string, error?: string }>;
  logout: () => Promise<void>;
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
    login: async (username, password) => {
      const result = await login(username, password);
      setToken(result.token);
      return result;
    },
    logout: async () => {
      await logout();
      setToken(undefined);
    },
  }}>
    {children}
  </context.Provider>;
};
