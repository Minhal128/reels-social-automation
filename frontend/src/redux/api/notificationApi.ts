import { NotificationsResponse } from '@/types/notification';
import { baseApi } from './baseApi'

export const notificationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationsResponse, { page?: number; limit?: number; is_read?: boolean; type?: string }>({
      query: ({ page = 1, limit = 10, is_read, type } = {}) => ({
        url: `/notification?page=${page}&limit=${limit}${is_read !== undefined ? `&is_read=${is_read}` : ''}${type ? `&type=${type}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),

    markAsRead: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notification/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notification'],
    }),

    markAllAsRead: builder.mutation<any, void>({
      query: () => ({
        url: '/notification/read-all',
        method: 'PUT',
      }),
      invalidatesTags: ['Notification'],
    }),

    deleteNotifications: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: '/notification/delete',
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationsMutation,
} = notificationApi
