import Cookie from 'js-cookie';
import * as _ from 'lodash';
import * as Debug from 'debug';

const debug = Debug('passport');

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

export const login = async (username, password) => {
  const q = {
    method: 'post',
    url:`/_passport/signin`,
    data: {
      username,
      password,
    },
  };
  const { data: user } = await request(q);
  debug('login', { user });
  const token = _.get(user, 'sessions.0.token');
  if (token) {
    return Cookie.set('token', token);
  }
  throw new Error('!user.sessions.0.token');
};
