import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription, useMutation as _useMutation } from 'react-apollo-hooks';

export { useQuery, useSubscription };

export function useGql(query, options = {}) {
  if (!process.browser)
  {
    return useQuery(gql`{ ${query} }`, { ssr: true, suspend: true, ...options });
  } else
  {
    const qr = useQuery(gql`{ ${query} }`, { ...options });
    const sr = useSubscription(gql`subscription { ${query} }`, options);
    if (sr.loading) return qr;
    return sr;
  }
};
