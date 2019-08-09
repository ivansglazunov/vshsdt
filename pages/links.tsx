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
    props {
      nodeId
      id
      passport_passwords {
        id
        propId
      }
      sessions {
        id
        propId
      }
      types {
        id
        propId
      }
    }
    links_by_source {
      id
      sourceId
      targetId
    }
    links_by_target {
      id
      sourceId
      targetId
    }
  }
`;

const parseLink = (input, links, _links, nodes) => {
  for (let l = 0; l < input.length; l++) {
    const link = input[l];
    if (!_links[link.id]) {
      _links[link.id] = true;
      nodes.push({
        id: `l${link.id}`,
        group: link.__typename,
      });
      links.push({
        id: `l${link.id}`,
        source: `n${link.sourceId}`,
        target: `l${link.id}`,
        group: `${link.__typename}-source`,
      });
      links.push({
        id: `l${link.id}`,
        source: `l${link.id}`,
        target: `n${link.targetId}`,
        group: `${link.__typename}-target`,
      });
    }
  }
};

const parseProp = (prop, rel, links, _links, nodes) => {
  for (let p = 0; p < prop[rel].length; p++) {
    const pr = prop[rel][p];
    nodes.push({
      id: `${rel}${pr.id}`,
      group: pr.__typename,
    });
    links.push({
      id: `pr${pr.id}`,
      source: `${rel}${pr.id}`,
      target: `p${prop.id}`,
      group: pr.__typename,
    });
  }
};

export default () => {
  const query = useGql(GET_NODES);

  const nodes: { id: string, group: string }[] = [];
  const _links: { [id: string]: boolean } = {};
  const links: { id: string, group: string, source: string, target: string }[] = [];
  
  const ns = _.get(query, 'data.nodes');
  if (ns) {
    for (let n = 0; n < ns.length; n++) {
      const node = ns[n];
      nodes.push({
        id: `n${node.id}`,
        group: node.__typename,
      });
      parseLink(node.links_by_source, links, _links, nodes);
      parseLink(node.links_by_target, links, _links, nodes);
      for (let p = 0; p < node.props.length; p++) {
        const prop = node.props[p];
        nodes.push({
          id: `p${prop.id}`,
          group: prop.__typename,
        });
        links.push({
          id: `p${prop.id}`,
          source: `p${prop.id}`,
          target: `n${prop.nodeId}`,
          group: prop.__typename,
        });
        parseProp(prop, 'passport_passwords', links, _links, nodes);
        parseProp(prop, 'sessions', links, _links, nodes);
        parseProp(prop, 'types', links, _links, nodes);
      }
    }
  }

  const [{ width, height }, setSize] = useState({ width: 100, height: 100 });

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
        const label = node.id;
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
