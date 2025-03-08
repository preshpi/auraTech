import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserType } from "../../../types/auth/user";

// Define a type for the slice state
interface UserDetailsState {
  userDetails: UserType;
}

// Define the initial state using that type
const initialState: UserDetailsState = {
  userDetails: {
    _id: "",
    uid: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    image: "",
    isGoogle: false,
    emailVerified: false,
  },
};

const userSlice = createSlice({
  name: "userDetails",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleUserDetails: (state, action: PayloadAction<UserType>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { handleUserDetails } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userDetails = (state: RootState) => state.user;

export default userSlice.reducer;
