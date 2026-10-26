import { ImpersonationResponse, ImpersonationStatusResponse } from '@/types'
import { baseApi } from './baseApi'

export const impersonationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getImpersonationStatus: builder.query<ImpersonationStatusResponse, void>({
      query: () => '/impersonation/status',
      providesTags: ['User'],
    }),
    startImpersonation: builder.mutation<ImpersonationResponse, { targetUserId: string }>({
      query: (body) => ({
        url: '/impersonation/start',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    stopImpersonation: builder.mutation<ImpersonationResponse, void>({
      query: () => ({
        url: '/impersonation/stop',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetImpersonationStatusQuery,
  useStartImpersonationMutation,
  useStopImpersonationMutation,
} = impersonationApi
