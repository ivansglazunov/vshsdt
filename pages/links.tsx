import { useState } from 'react';
import * as _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';

import { useGql } from '../imports/use-gql';
import { GET_NODES } from '../imports/sandbox';
import { Paper } from '@material-ui/core';
import Links from '../components/links';

export default () => {
  const query = useGql(GET_NODES);

  const [selected, setSelected] = useState<any>([]);

  return <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
    <div style={{ position: 'absolute', left: 0, top: 0, width: 'calc(100% - 300px)', height: '100%' }}>
    >
      <Links
        data={query.data}
        onNodeClick={(node) => {
          setSelected([node]);
        }}
      />
    </div>
    <Paper
      style={{ position: 'absolute', left: 'calc(100% - 300px)', top: 0, width: 300, height: '100%', overflow: 'scroll' }}
      elevation={6}
    >
      <pre><code>
        {JSON.stringify(selected, null, 2)}
      </code></pre>
    </Paper>
  </div>;
};
