import { baseApi } from "./baseApi";

const route = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => {
        return {
          url: `/dashboard/get_all_subscriptions`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getDashboardCount: builder.query({
      query: () => {
        return {
          url: `/dashboard/get_total_count`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getUserGrowth: builder.query({
      query: (year) => {
        return {
          url: `/dashboard/get_subscription_growth?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getGrowth: builder.query({
      query: (selectedYear) => {
        return {
          url: `/dashboard/get_user_growth?year=${selectedYear}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getTransection: builder.query({
      query: ({ searchTerm, page, limit }) => {
        return {
          url: `/payment/get-transaction?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getContact: builder.query({
      query: ({ searchTerm, page, limit }) => {
        return {
          url: `/dashboard/get-message-support?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addSubscription: builder.mutation({
      query: (data) => {
        return {
          url: "/dashboard/create_subscriptions",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addRecipe: builder.mutation({
      query: (data) => {
        return {
          url: "/dashboard/create_recipe",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getRecipe: builder.query({
      query: ({ searchTerm, page, limit }) => {
        return {
          url: `/dashboard/get_all_recipe?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getRecipeDetails: builder.query({
      query: ({ id }) => {
        return {
          url: `/dashboard/get_recipe_details/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateSubscription: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/dashboard/update_subscriptions/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteSub: builder.mutation({
      query: (id) => {
        return {
          url: `/dashboard/delete_subscriptions/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateRecipe: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/dashboard/update_recipe/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteRecipe: builder.mutation({
      query: (id) => {
        return {
          url: `/dashboard/delete_recipe/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useAddSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetTransectionQuery,
  useGetContactQuery,
  useGetDashboardCountQuery,
  useGetUserGrowthQuery,
  useGetGrowthQuery,
  useAddRecipeMutation,
  useGetRecipeQuery,
  useDeleteRecipeMutation,
  useGetRecipeDetailsQuery,
  useUpdateRecipeMutation,
  useDeleteSubMutation
} = route;
