import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription, useMutation as _useMutation } from 'react-apollo-hooks';

export { useQuery, useSubscription };

export function useGql(query, options?) {
  return process.browser
    ? useSubscription(gql`subscription { ${query} }`, options)
    : useQuery(gql`{ ${query} }`, { ssr: true, suspend: true });
};
