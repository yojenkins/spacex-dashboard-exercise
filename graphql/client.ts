import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import fetch from 'cross-fetch'

let apolloClient: ApolloClient<NormalizedCacheObject>; 

const httpLink = new HttpLink({
    uri: 'https://api.spacex.land/graphql/',
    fetch,
  });

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            launches: {
              keyArgs: ['find'],
              merge: (existing, incoming) => {
                if (!existing) return incoming

                return [...existing, ...incoming]
              }
            }
          }
        }
      }
    }),
  });
}

export function initializeApollo(initialState?: NormalizedCacheObject) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
