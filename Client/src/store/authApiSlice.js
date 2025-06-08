import apiSlice from "./apiSlice";

const AUTH_URL = "/auth";
const USER_URL = "/user";
const NOTE_URL = "/note";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (Credentials) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: Credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    refreshtoken: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/verifyRefreshToken`,
        method: "POST",
      }),
    }),
    registerAccount: builder.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/update`,
        method: "PUT",
        body: userData,
      }),
    }),
    passwordUpdate: builder.mutation({
      query: (passwordData) => ({
        url: `${USER_URL}/update-password`,
        method: "PUT",
        body: passwordData,
      }),
    }),
    accountDeactivate: builder.mutation({
      query: () => ({
        url: `${USER_URL}/deactivate-account`,
        method: "PUT",
      }),
    }),
    accountActivate: builder.mutation({
      query: (activationData) => ({
        url: `${USER_URL}/activate-account`,
        method: "PUT",
        body: activationData,
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: `${USER_URL}/delete-account`,
        method: "DELETE",
      }),
    }),
  }),
});

export const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotes: builder.mutation({
      query: () => ({
        url: `${NOTE_URL}/getNotes`,
        method: "GET",
      }),
      providesTags: ["Note"],
    }),
    createNote: builder.mutation({
      query: (noteData) => ({
        url: `${NOTE_URL}/addNote`,
        method: "POST",
        body: noteData,
      }),
      providesTags: ["Note"],
    }),
    //   async onQueryStarted(noteData, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       dispatch(addNote(data));
    //     } catch (error) {
    //       console.error("Failed to update note:", error);
    //     }
    //   },
    editNote: builder.mutation({
      query: (note) => ({
        url: `${NOTE_URL}/update-note`,
        method: "PUT",
        body: note,
      }),
      providesTags: ["Note"],
    }),
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `${NOTE_URL}/delete-note`,
        method: "DELETE",
        body: { _id: noteId },
      }),
      providesTags: ["Note"],
    }),
    completeNote: builder.mutation({
      query: (noteId) => ({
        url: `${NOTE_URL}/completeNote`,
        method: "PUT",
        body: { _id: noteId },
      }),
      providesTags: ["Note"],
    }),
    addFavNote: builder.mutation({
      query: (noteId) => ({
        url: `${NOTE_URL}/addFavorite`,
        method: "PUT",
        body: { _id: noteId },
      }),
      providesTags: ["Note"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshtokenMutation,
  useRegisterAccountMutation,
} = authApiSlice;

export const {
  useCurrentUserMutation,
  useUpdateProfileMutation,
  usePasswordUpdateMutation,
  useAccountDeactivateMutation,
  useAccountActivateMutation,
  useDeleteAccountMutation,
} = userApiSlice;

export const {
  useGetAllNotesMutation,
  useCreateNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
  useCompleteNoteMutation,
  useAddFavNoteMutation,
  useGetFavNotesMutation,
} = noteApiSlice;
