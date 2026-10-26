import { Character, GetCharactersResponse } from '@/types/character';
import { baseApi } from './baseApi'

export const charactersApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateCharacter: builder.mutation({
      query: (data) => ({
        url: '/characters/generate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Character'],
    }),
    getCharacters: builder.query<GetCharactersResponse, any>({
      query: (params) => ({
        url: '/characters',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.characters.map(({ _id }) => ({ type: 'Character' as const, id: _id })),
              'Character',
            ]
          : ['Character'],
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => ({
        url: `/characters/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Character', id }],
    }),
    updateCharacter: builder.mutation<Character, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/characters/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Character', id }],
    }),
    deleteCharacter: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/characters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Character'],
    }),
  }),
})

export const {
  useGenerateCharacterMutation,
  useGetCharactersQuery,
  useGetCharacterQuery,
  useUpdateCharacterMutation,
  useDeleteCharacterMutation,
} = charactersApiSlice
