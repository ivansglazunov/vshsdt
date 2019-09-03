import React, { useContext } from 'react';

import { wrapPage } from '../imports/wrap-page';
import { useQuery } from '../imports/packages/use-query';

export const Content = () => {
  const [{ x }, setValue] = useQuery('abc', { x: 1 });

  return <div>
    <pre><code>{`const [{ x }, setValue] = useQuery('abc', { x: 1 });`}</code></pre>
    <div>{JSON.stringify({ x }, null, 1)}</div>
    <button onClick={() => setValue({ x: x + 1 })}>{`setValue({ x: x + 1 })`}</button>
  </div>;
};

export default wrapPage(Content);