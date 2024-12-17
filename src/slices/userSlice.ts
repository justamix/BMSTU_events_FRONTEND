import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: Date;
    // Дополнительные поля, которые есть в UserSerializer
  } | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
