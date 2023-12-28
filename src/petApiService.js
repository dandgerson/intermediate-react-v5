import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    breedList: builder.query({
      query: (animal) => ({
        url: `/breeds`,
        params: {
          animal,
        },
      }),
      transformResponse: (response) => response.breeds,
    }),
    search: builder.query({
      query: ({ animal, location, breed }) => ({
        url: `/pets`,
        params: {
          animal,
          location,
          breed,
        },
      }),
      transformResponse: (response) => response.pets ?? [],
    }),
    pet: builder.query({
      query: ({ id }) => ({ url: "pets", params: { id } }),
      transformResponse: (response) => response.pets[0],
    }),
  }),
});

export const { useBreedListQuery, useSearchQuery, usePetQuery } = petApi;
