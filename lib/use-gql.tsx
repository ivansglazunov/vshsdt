import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription, useMutation as _useMutation } from 'react-apollo-hooks';

export { useQuery, useSubscription };

export function useGql(query, options = {}): { error: any; data: any; loading: boolean; } {
  if (!process.browser)
  {
    const qr = useQuery(gql`{ ${query} }`, { ssr: true, suspend: true, ...options });
    return { data: qr.data, loading: qr.loading, error: qr.error };
  } else
  {
    const qr = useQuery(gql`{ ${query} }`, { ...options });
    const sr = useSubscription(gql`subscription { ${query} }`, options);
    if (sr.loading) return { data: qr.data, loading: qr.loading, error: qr.error };
    return { data: sr.data, loading: sr.loading, error: sr.error };
  }
};
