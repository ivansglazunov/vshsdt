import rp from 'request-promise';

export async function replace(metadata) {
  await rp({
    method: 'POST',
    uri: `https://${process.env.HASURA_URL}/v1/query`,
    headers: {
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: {
      type: 'replace_metadata',
      args: metadata,
    },
    json: true,
  });
}
