import { useGql } from '../lib/use-gql';

import Cookie from 'js-cookie';
import { login } from '../lib/passport';

export default () => {
  return <div>
    <div>{Cookie.get('hasura_token') || 'no token'}</div>
    <div>
      <button onClick={() => {
        login('abc', 'abc');
      }}>login</button>
    </div>
  </div>;
};
