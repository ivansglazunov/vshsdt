import React from 'react';
import { useState } from 'react';

import _ from 'lodash';

export interface IObject {
  id: string;
  [key: string]: any;
}

export interface IHash {
  [key: string]: IObject;
};

export interface INode {
  id: string;
  label?: string; group: string;
  color: string;
  __data?: any;
}

export interface INodes { [key: string]: INode; };

export interface ILinks { [key: string]: ILink };

export interface IRoad {
  [id: string]: boolean;
};

export interface ILink {
  id: string;
  group: string;
  source: string;
  target: string;
  color: string;
  __data?: any;
};

export interface IResults {
  nodes?: INode[];
  links?: ILink[];
};

const parseLink = (input, links: ILinks, _road: IRoad, nodes: INodes) => {
  if (!_.size(input)) return;
  for (let i = 0; i < input.length; i++) {
    const link = input[i];
    if (!_road[`l${link.id}`]) {
      _road[`l${link.id}`] = true;
      nodes[`l${link.id}`] = {
        id: `l${link.id}`,
        group: link.__typename,
        color: '#3f51b5',
        __data: link,
      };
      if (link.sourceId) {
        links[`l${link.id}-source`] = {
          id: `l${link.id}-source`,
          source: `n${link.sourceId}`,
          target: `l${link.id}`,
          group: `${link.__typename}-source`,
          color: '#3f51b5',
          __data: link,
        };
      }
      if (link.targetId) {
        links[`l${link.id}-target`] = {
          id: `l${link.id}-target`,
          source: `l${link.id}`,
          target: `n${link.targetId}`,
          group: `${link.__typename}-target`,
          color: '#3f51b5',
          __data: link,
        };
      }
    }
  }
};

const parseProp = (node, rel, links: ILinks, _road: IRoad, nodes: INodes) => {
  if (!_.size(node[rel])) return;
  for (let p = 0; p < node[rel].length; p++) {
    const pr = node[rel][p];
    nodes[`${rel}${pr.id}`] = {
      id: `${rel}${pr.id}`,
      group: pr.__typename,
      color: '#20ec3d',
      __data: pr,
    };
    links[`pr-${rel}-${pr.id}`] = {
      id: `pr-${rel}-${pr.id}`,
      source: `${rel}${pr.id}`,
      target: `n${pr.ofId}`,
      group: pr.__typename,
      color: '#20ec3d',
      __data: pr,
    };
  }
};

const parseIndex = (node, links: ILinks, _road: IRoad, nodes: INodes) => {
  if (!_.size(node.links_index)) return;
  for (let it = 0; it < node.links_index.length; it++) {
    const index = node.links_index[it];
    if (!_road[`i${index.id}`]) {
      _road[`i${index.id}`] = true;
      nodes[`i${index.id}`] = {
        id: `i${index.id}`,
        label: `i${index.id} n${index.nodeId}(${index.depth})`,
        group: index.__typename,
        color: '#a1a1a1',
        __data: index,
      };
      links[`in${index.id}`] = {
        id: `in${index.id}`,
        source: `i${index.id}`,
        target: `n${index.ofNodeId}`,
        group: `${index.__typename}`,
        color: '#a1a1a1',
        __data: index,
      };
    }
  }
};

export const hashIntoResult = (
  hash: IHash = {},
  result: IObject[] = [],
) => {
  for (let k = 0; k < result.length; k++) {
    if (hash[result[k].id]) {
      if (!_.isEqual(result[k], hash[result[k].id])) {
        _.merge(result[k], hash[result[k].id]);
      }
      delete hash[result[k].id];
    } else {
      delete hash[result[k].id];
      result.splice(k, 1);
      k--;
    }
  }
  const nk = Object.keys(hash);
  for (let k = 0; k < nk.length; k++) {
    result.push(hash[nk[k]]);
  }
  return result;
};

export const onlyChanged = (
  results: IResults = { nodes: [], links: [] },
  hashs: { nodes: INodes; links: ILinks },
) => {
  const _nodes: any = hashIntoResult(hashs.nodes, results.nodes);
  results.nodes = _nodes;
  const _links: any = hashIntoResult(hashs.links, results.links);
  results.links = _links;
  return {
    nodes: results.nodes,
    links: results.links,
  };
};

export function useParsed(
  data: any,
  results: IResults = { nodes: [], links: [] },
) {
  const nodes: INodes = {};
  const _road: IRoad = {};
  const links: ILinks = {};

  const ns = _.get(data, 'nodes');
  if (_.size(ns)) {
    for (let n = 0; n < ns.length; n++) {
      const node = ns[n];
      nodes[`n${node.id}`] = {
        id: `n${node.id}`,
        group: node.__typename,
        color: '#000',
        __data: node,
      };
      parseLink(node.links_by_source, links, _road, nodes);
      parseLink(node.links_by_target, links, _road, nodes);
      parseProp(node, 'passport_passwords', links, _road, nodes);
      parseProp(node, 'sessions', links, _road, nodes);
      parseProp(node, 'types', links, _road, nodes);
      parseIndex(node, links, _road, nodes);
    }
  }

  return onlyChanged(results, { nodes, links });
};
