import { Blog, BlogResponse } from '@/types';
import { baseApi } from './baseApi'

export const blogApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogResponse, any>({
      query: (params) => ({
        url: '/blog',
        params,
      }),
      providesTags: ['Blog'],
    }),
    getBlogBySlug: builder.query<Blog, string>({
      query: (slug) => `/blog/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Blog', id: slug }],
    }),
    getBlogById: builder.query<Blog, string>({
      query: (id) => `/blog/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation<any, Partial<Blog>>({
      query: (data) => ({
        url: '/blog',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation<any, { id: string; data: Partial<Blog> }>({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ['Blog', { type: 'Blog', id }],
    }),
    deleteBlog: builder.mutation<any, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
    bulkDeleteBlogs: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: '/blog/bulk-delete',
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['Blog'],
    }),
    bulkPublishBlogs: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: '/blog/bulk-publish',
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['Blog'],
    }),
    bulkScheduleBlogs: builder.mutation<any, { ids: string[]; published_at: string }>({
      query: (body) => ({
        url: '/blog/bulk-schedule',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Blog'],
    }),
    bulkArchiveBlogs: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: '/blog/bulk-archive',
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['Blog'],
    }),
    bulkAssignTagsBlogs: builder.mutation<any, { ids: string[]; tagIds: string[] }>({
      query: (body) => ({
        url: '/blog/bulk-assign-tags',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Blog'],
    }),
    bulkUnarchiveBlogs: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: '/blog/bulk-unarchive',
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['Blog'],
    }),
    getBlogDashboard: builder.query<any, void>({
      query: () => '/blog/dashboard',
      providesTags: ['Blog'],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useBulkDeleteBlogsMutation,
  useBulkPublishBlogsMutation,
  useBulkScheduleBlogsMutation,
  useBulkArchiveBlogsMutation,
  useBulkUnarchiveBlogsMutation,
  useBulkAssignTagsBlogsMutation,
  useGetBlogDashboardQuery,
} = blogApi
