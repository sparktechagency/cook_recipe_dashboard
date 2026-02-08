import { baseApi } from "./baseApi";

const setting = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getFaq: builder.query({
      query: () => {
        return {
          url: `/dashboard/get-faqs`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addFaq: builder.mutation({
        query: (data) => {
          return {
            url: "/dashboard/add-faqs",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["updateProfile"],
      }),


      updateFaq: builder.mutation({
        query: ({data,id}) => {
          return {
            url: `/dashboard/update-faqs/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["updateProfile"],
      }),


      deleteFaq :  builder.mutation({
        query : (id)=>{
            return {
                url : `/dashboard/delete-faqs/${id}`,
                method : 'DELETE'
            }
        },
        invalidatesTags :['updateProfile']
    }),


    addTerms: builder.mutation({
      query: (data) => {
        return {
          url: "/dashboard/addupdate-termsConditions",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getTerms: builder.query({
      query: () => {
        return {
          url: `/dashboard/get-rules`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addPrivacy: builder.mutation({
      query: (data) => {
        return {
          url: "/dashboard/addupdate-privacy-policy",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getPrivacy: builder.query({
      query: () => {
        return {
          url: `/dashboard/get-privacy-policy`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


   addAboutUs: builder.mutation({
      query: (data) => {
        return {
          url: "/dashboard/addupdate-about",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAboutUs: builder.query({
      query: () => {
        return {
          url: `/dashboard/get-about`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),



       addHelpSupport: builder.mutation({
      query: (data) => {
        return {
          url: "/dashboard/addupdate-help",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getHelpSupport: builder.query({
      query: () => {
        return {
          url: `/dashboard/get-help`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


 getSubscribe: builder.query({
      query: ({page,limit}) => {
        return {
          url: `/dashboard/get-subscribe-mail?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),





    getAllAdd: builder.query({
      query: ({page,limit}) => {
        return {
          url: `/dashboard/all-adds?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addAdd: builder.mutation({
      query: (data) => {
        return {
          url: "/dashboard/create-adds",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteAdd :  builder.mutation({
      query : (id)=>{
          return {
              url : `/dashboard/delete-adds/${id}`,
              method : 'DELETE'
          }
      },
      invalidatesTags :['updateProfile']
  }),


  updateAdd: builder.mutation({
    query: ({data,id}) => {
      return {
        url: `/dashboard/edit-adds/${id}`,
        method: "PATCH",
        body: data,
      };
    },
    invalidatesTags: ["updateProfile"],
  }),

   
  }),
});

export const {
 useGetFaqQuery,
 useAddFaqMutation,
 useUpdateFaqMutation,
 useDeleteFaqMutation,
 useAddTermsMutation,
 useGetTermsQuery,
 useAddPrivacyMutation,
 useGetPrivacyQuery,
 useGetAllAddQuery,
 useAddAddMutation,
 useDeleteAddMutation,
 useUpdateAddMutation,
 useGetAboutUsQuery,useAddAboutUsMutation,useAddHelpSupportMutation,useGetHelpSupportQuery,useGetSubscribeQuery
} = setting;
