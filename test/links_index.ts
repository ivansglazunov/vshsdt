import 'mocha';
import { initApollo } from '../imports/apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { assert } from 'chai';
import { API } from '../imports/tests/links_index';

export type TNeed = (
  [number, (
    [number, number?]
  )[]]
)[];

const checkIndex = (need: TNeed, all) => {
  const errors = [];

  _.each(need, ([nodeId, indexes], i) => {
    if (!_.find(all.nodes, { id: nodeId })) {
      errors.push(`(i: ${i}) Node ${nodeId} is lost.`);
    }
    _.each(indexes, ([nId, lId], d) => {
      if (!_.find(all.nodes, { id: nId })) {
        errors.push(`(i: ${i}, d: ${d}) Node ${nId} is lost.`);
      }
      if (!_.find(all.links_index, { nodeId: nId, depth: d })) {
        errors.push(`(i: ${i}, d: ${d}) Index for ${nId} & ${lId} in depth ${d} is lost.`);
      }
    });
  });

  if (errors.length) throw errors;
};

describe('links_insert', function() {
  this.timeout(10000);

  const api = new API();

  const clear = async () => {
    await api.clearLinksIndex();
    await api.clearLinks();
    await api.clearNodes();
  };

  let typeId;
  before(async () => {
    await api.clearLinksTypeId();
    typeId = await api.prepareLinksTypeId();
    await clear();
  });
  beforeEach(async () => {
    await clear();
  });
  // after(async () => {
  //   await clear();
  //   await api.clearLinksTypeId();
  // });

  describe('prepare', () => {
    it('A-B-C-D-E fake', async () => {
      await api.insertNodes(10);

      await api.insertLinks(1, 2, typeId);
      await api.insertLinks(2, 3, typeId);
      await api.insertLinks(3, 4, typeId);
      await api.insertLinks(4, 5, typeId);

      await api.insertLinks(6, 7, typeId);

      await api.insertLinks(7, 3, typeId);

      const all = await api.getAll();
      console.log(all);
    });
  });

  describe.skip('nodes_on-insert', () => {
    it('A B', async () => {
      await api.insertNodes(1);
      const all = await api.getAll();

      assert.lengthOf(all.nodes, 1);
      assert.lengthOf(all.links, 0);
      assert.lengthOf(all.links_index, 1);
    });
    it('A-B', async () => {
      const nIds = await api.insertNodes(2);
      const lId0 = await api.insertLinks(nIds[0], nIds[1], typeId);
      const all = await api.getAll();
      assert.lengthOf(all.nodes, 2);
      assert.lengthOf(all.links, 1);
      assert.lengthOf(all.links_index, 2);

      checkIndex(
        [
          [nIds[0], [
            [nIds[0]],
          ]],
          [nIds[1], [
            [nIds[0]],
            [nIds[1], lId0],
          ]],
        ],
        all,
      );
    });
  });
});
