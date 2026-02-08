import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ searchTerm, page, limit } = {}) => {
        let url = "/category/get-categories";
        const params = [];
        if (searchTerm) params.push(`searchTerm=${searchTerm}`);
        if (page) params.push(`page=${page}`);
        if (limit) params.push(`limit=${limit}`);

        if (params.length > 0) {
          url += `?${params.join("&")}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),

    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category/create-category",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/delete-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
