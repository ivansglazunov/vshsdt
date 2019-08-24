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

export const signin = async (
  username: string,
  password: string,
): Promise<{ token?: string, error?: string }> => {
  if (!username) return { error: '!node' };
  if (!password) return { error: '!password' };
  const q = {
    method: 'post',
    url:`/_passports/signin`,
    data: {
      username,
      password,
    },
  };
  const { data: { node, error } } = await request(q);
  debug('signin', { node });
  const token = _.get(node, 'sessions.0.token');
  if (token) Cookie.set('token', token);
  return { token, error };
};

export const signout = async (): Promise<void> => {
  const q = {
    method: 'get',
    url:`/_passports/signout`,
  };
  await request(q);
  Cookie.remove('token');
};
