import * as _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';

import { useGql, gql } from '../lib/use-gql';
import { useState } from 'react';

let ForceGraph2D;
if (process.browser) {
  ForceGraph2D = require('react-force-graph-2d').default;
}

const GET_NODES = gql`
  nodes {
    id
  }
`;

const GET_LINKS = gql`
  links {
    id
    sourceId
    targetId
  }
`;

export default () => {
  const nodesQ = useGql(GET_NODES);
  const linksQ = useGql(GET_LINKS);

  const [{ width, height }, setSize] = useState({ width: 100, height: 100 });

  const nodes = _.map(_.get(nodesQ, 'data.nodes', []), node => ({ node, id: node.id, group: node.__typename }));
  const links = _.map(_.get(linksQ, 'data.links', []), link => ({ link, id: link.id, source: link.sourceId, target: link.targetId }));

  return <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
    <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => {
      setSize({ width, height });
    }}/>
    {process.browser && <ForceGraph2D
      width={width}
      height={height}
      graphData={{
        nodes,
        links,
      }}
      nodeAutoColorBy="group"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = `n${node.id}`;
        const fontSize = 12/globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
        ctx.fillStyle = '#fff';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.fillText(label, node.x, node.y);
      }}
    />}
  </div>;
};
