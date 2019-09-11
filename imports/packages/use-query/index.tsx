import { useRouter } from 'next/router';

const fakeRouter: any = {};

export function useQuery<T>(name: string, defaultValue?: T) {
  const router = useRouter();

  const {
    query,
    pathname,
    push,
  } = router || fakeRouter;

  const result: [T, (T) => void] = [
    query && query[name] ? JSON.parse(String(query[name])) : defaultValue,
    (value) => {
      push({
        pathname,
        query: {
          ...query,
          [name]: JSON.stringify(value),
        },
      });
    },
  ];

  return result;
};

export default useQuery;
