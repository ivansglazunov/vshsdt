import * as rp from 'request-promise';
import config from './config';

export async function replace(metadata) {
  await rp({
    method: 'POST',
    uri: `https://${config.HASURA}/v1/query`,
    headers: {
      'X-Hasura-Admin-Secret': config.HASURA_ADMIN_SECRET,
    },
    body: {
      type: 'replace_metadata',
      args: metadata,
    },
    json: true,
  });
}
