import { useGql } from '../imports/use-gql';

import Cookie from 'js-cookie';
import { login } from '../imports/passport';

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
