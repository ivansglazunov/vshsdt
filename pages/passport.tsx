import * as React from 'react';
import { useGql } from '../imports/use-gql';

import { usePassport } from '../imports/passport';

const Content = () => {
  const { token, login, logout } = usePassport();

  return <>
    <div>{token || '-'}</div>
    <div>
      <button onClick={async () => {
        await login('abc', 'abce');
      }}>login</button>
      <button onClick={async () => {
        await logout();
      }}>logout</button>
    </div>
  </>;
};

export default () => {
  return <Content/>;
};
