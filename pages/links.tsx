import React, { useEffect } from 'react';
import Head from 'next/head';
import { useState } from 'react';
import _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';
import fetch from 'isomorphic-fetch';

import { useGql } from '../imports/use-gql';
import { GET_NODES } from '../imports/sandbox';
import { Paper } from '@material-ui/core';
import Links from '../imports/components/links/index';
import { wrapPage } from '../imports/wrap-page';
import { useParsed } from '../imports/components/links/parse';
import useQuery from '../imports/packages/use-query/index';

let GraphiQL;
if (process.browser) {
  GraphiQL = require('graphiql');
}

const gqlWrap = (gql: string) => `query ${gql}`;
const gqlUnwrap = (gql: string) => {
  let query = gql;
  for (let i = 0; i < gql.length; i ++) {
    if (gql[i] === '{') {
      query = gql.slice(i - 1);
      break;
    }
  }
  return query;
}

export default wrapPage(() => {
  const [gqlParams, setGqlParams] = useState({
    query: GET_NODES,
    variables: null,
  }); 
  const query = useGql(gqlParams.query, { variables: gqlParams.variables });
  const [viewType, setVieType] = useQuery('view-type', { type: '3d' });
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(0);
  const [main, setMain] = useState({});
  const { nodes, links } = useParsed(history[selectedHistory], main);
  
  function graphQLFetcher(params) {
    if (!params.query.includes('__schema')) {
      const gqlp = { query: gqlUnwrap(params.query), variables: params.variables };
      setGqlParams(gqlp);
    }
    return fetch('https://isg-hasura-lerny.herokuapp.com/v1/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': '7777',
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response.json();
    });
  }

  useEffect(() => {
    if (!_.isEqual(query.data, history[history.length - 1])) {
      if (selectedHistory === history.length - 1) {
        setSelectedHistory(selectedHistory + 1);
      }
      setHistory([...history, query.data]);
    }
  }, [query.data]);

  const [selected, setSelected] = useState<any>([]);

  return <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
    <Head>
      <link
        rel="stylesheet"
        href="/static/graphiql.css"
      />
    </Head>
    <div style={{
      position: 'absolute', left: 0, top: 0,
      width: selected.length ? 'calc(100% - 300px)' : '100%',
      height: 'calc(100% - 300px)',
    }}>
      <Links
        type={viewType.type}
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
      right: 0,
    }}>
      <div style={{
        padding: 2,
        border: '1px solid black',
        float: 'right',
        backgroundColor: viewType.type === '2d' ? 'gray' : 'transparent',
      }} onClick={() => {
        setVieType({ type: '2d' });
      }}>2d</div>
      <div style={{
        padding: 2,
        border: '1px solid black',
        float: 'right',
        backgroundColor: viewType.type === '3d' ? 'gray' : 'transparent',
      }} onClick={() => {
        setVieType({ type: '3d' });
      }}>3d</div>
    </div>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'calc(100% - 50px)',
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
      style={{ position: 'absolute', left: 'calc(100% - 300px)', top: 0, width: 300, height: 'calc(100% - 300px)', overflow: 'scroll' }}
      elevation={6}
    >
      <pre><code>
        {JSON.stringify(selected, null, 2)}
      </code></pre>
    </Paper>}
    <Paper style={{
      position: 'absolute',
      bottom: 0, left: 0,
      width: '100%',
      height: 300,
    }}>
      {GraphiQL && process.browser && <GraphiQL
        fetcher={graphQLFetcher}
        defaultQuery={`query ${GET_NODES}`}
      />}
    </Paper>
  </div>;
});
