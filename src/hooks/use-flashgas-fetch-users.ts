import { flashGasApiClient } from '@/api/flashgas.client';
import { FetchClientErrorType } from '@geut/openapi-box';
import { useQuery } from '@tanstack/react-query';

export const useFlashGasFetchUsers = () =>
  useQuery({
    queryKey: ['flashgas-users'],
    queryFn: async () => {
      const { data, error, clientError } = await flashGasApiClient.fetch({
        path: '/users',
        method: 'GET',
        args: {
          query: {
            page: -1,
            pageSize: 10,
          },
        },
      });
      console.log({ data, error, clientError });

      if (error) return Promise.reject<typeof error>(error);
      if (clientError) return Promise.reject<FetchClientErrorType>(clientError);

      return Promise.resolve<typeof data>(data);
    },
  });
