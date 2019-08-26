import Cookie from 'js-cookie';
import _ from 'lodash';
import Debug from 'debug';
import useInterval from 'use-interval';
import React, { useState, useEffect, useContext } from 'react';
import bcrypt from 'bcryptjs';

export const isEqualHashAndPassword = ({
  hash, password,
}: {
  hash: string;
  password: string;
}): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const createHashFromPassword = async ({
  password,
}: {
  password: string;
}): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

createHashFromPassword({ password: 'abc' }).then(console.log);
