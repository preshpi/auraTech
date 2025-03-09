/* eslint-disable @typescript-eslint/no-explicit-any */
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "../firebase/firebase";
import { useAppDispatch } from "./redux.hook";
import { logoutUser } from "../redux/slices/userSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      toast.success("User signed out successfully");
    } catch (error: any) {
      toast.error("Error signing out:");
      throw error;
    }
  };

  return { logout };
};
