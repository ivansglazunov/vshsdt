import React, { useEffect } from 'react';
import { useState } from 'react';
import _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';

import { useGql } from '../imports/use-gql';
import { GET_NODES } from '../imports/sandbox';
import { Paper } from '@material-ui/core';
import Links from '../imports/components/links/index';
import { wrapPage } from '../imports/wrap-page';
import { useParsed } from '../imports/components/links/parse';

export default wrapPage(() => {
  const query = useGql(GET_NODES);
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(0);
  const [main, setMain] = useState({});
  const { nodes, links } = useParsed(history[selectedHistory], main);

  useEffect(() => {
    if (selectedHistory === history.length - 1) {
      setSelectedHistory(selectedHistory + 1);
    }
    setHistory([...history, query.data]);
  }, [query.data]);

  const [selected, setSelected] = useState<any>([]);

  return <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
    <div style={{
      position: 'absolute', left: 0, top: 0,
      width: selected.length ? 'calc(100% - 300px)' : '100%',
      height: '100%',
    }}>
      <Links
        nodes={nodes}
        links={links}
        onNodeClick={(node) => {
          setSelected([node]);
        }}
      />
    </div>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }}>
      {history.map((hi,i) => {
        return <div key={i} style={{
          padding: 2,
          border: '1px solid black',
          float: 'left',
          backgroundColor: selectedHistory === i ? 'gray' : 'transparent',
        }} onClick={() => {
          setSelectedHistory(i);
        }}>{i}</div>;
      })}
    </div>
    {!!selected.length && <Paper
      style={{ position: 'absolute', left: 'calc(100% - 300px)', top: 0, width: 300, height: '100%', overflow: 'scroll' }}
      elevation={6}
    >
      <pre><code>
        {JSON.stringify(selected, null, 2)}
      </code></pre>
    </Paper>}
  </div>;
});
