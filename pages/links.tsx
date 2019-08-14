import { useState } from 'react';
import * as _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';

import { useGql } from '../imports/use-gql';
import { GET_NODES } from '../imports/sandbox';


let ForceGraph2D;
if (process.browser) {
  ForceGraph2D = require('react-force-graph-2d').default;
}

const parseLink = (input, links, _road, nodes) => {
  for (let i = 0; i < input.length; i++) {
    const link = input[i];
    if (!_road[`l${link.id}`]) {
      _road[`l${link.id}`] = true;
      nodes.push({
        id: `l${link.id}`,
        group: link.__typename,
      });
      links.push({
        id: `l${link.id}-source`,
        source: `n${link.sourceId}`,
        target: `l${link.id}`,
        group: `${link.__typename}-source`,
      });
      links.push({
        id: `l${link.id}-target`,
        source: `l${link.id}`,
        target: `n${link.targetId}`,
        group: `${link.__typename}-target`,
      });
      for (let l = 0; l < link.lists.length; l++) {
        const list = link.lists[l];
        console.log(list);
        if (!_road[`li${list.id}`]) {
          _road[`li${list.id}`] = true;
          nodes.push({
            id: `li${list.id}`,
            group: list.__typename,
          });
          links.push({
            id: `li${list.id}`,
            source: `li${list.id}`,
            target: `l${list.linkId}`,
            group: `${list.__typename}`,
          });
          for (let it = 0; it < link.lists.length; it++) {
            const item = list.items[it];
            if (!_road[`i${item.id}`]) {
              _road[`i${item.id}`] = true;
              nodes.push({
                id: `i${item.id}`,
                group: item.__typename,
              });
              links.push({
                id: `i${item.id}`,
                source: `i${item.id}`,
                target: `li${list.id}`,
                group: `${item.__typename}`,
              });
            }
          }
        }
      }
    }
  }
};

const parseProp = (node, rel, links, _road, nodes) => {
  for (let p = 0; p < node[rel].length; p++) {
    const pr = node[rel][p];
    nodes.push({
      id: `${rel}${pr.id}`,
      group: pr.__typename,
    });
    links.push({
      id: `pr${pr.id}`,
      source: `${rel}${pr.id}`,
      target: `n${node.id}`,
      group: pr.__typename,
    });
  }
};

export default () => {
  const query = useGql(GET_NODES);

  const nodes: { id: string, group: string }[] = [];
  const _road: { [id: string]: boolean } = {};
  const links: { id: string, group: string, source: string, target: string }[] = [];
  
  const ns = _.get(query, 'data.nodes');
  if (ns) {
    for (let n = 0; n < ns.length; n++) {
      const node = ns[n];
      nodes.push({
        id: `n${node.id}`,
        group: node.__typename,
      });
      parseLink(node.links_by_source, links, _road, nodes);
      parseLink(node.links_by_target, links, _road, nodes);
      parseProp(node, 'passport_passwords', links, _road, nodes);
      parseProp(node, 'sessions', links, _road, nodes);
      parseProp(node, 'types', links, _road, nodes);
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
