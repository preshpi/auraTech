import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserType } from "../../types/auth/user";

// Define a type for the slice state
interface UserDetailsState {
  userDetails: UserType | null;
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserDetailsState = {
  isLoggedIn: false,
  userDetails: null,
};

const userSlice = createSlice({
  name: "userDetails",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleUserDetails: (state, action: PayloadAction<UserType>) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userDetails = null;
    },
  },
});

export const { handleUserDetails, logoutUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userDetails = (state: RootState) => state.user;

export default userSlice.reducer;
