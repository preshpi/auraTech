import { auth } from "../firebase/firebase";
import { useAppDispatch } from "../hooks/redux.hook";
import { handleUserDetails } from "../redux/slices/userSlice";
import { onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import { getUserDetailsFromSanity } from "../utils/user.requests";

type AuthContextType = {
  user: User | null;
  handleUser: (user: User | null) => void;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useUserAuth = () => {
  const getAuthContext = React.useContext(AuthContext);

  if (!getAuthContext) {
    throw new Error("useUserAuth must be used within a AuthContextProvider");
  }
  return getAuthContext;
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Hooks
  const [user, setUser] = React.useState<User | null>(null);
  const dispatch = useAppDispatch();

  // FUNCTIONS
  const handleUser = (user: User | null) => {
    setUser(user);
    dispatch(
      handleUserDetails({
        _id: "",
        firstname: "",
        lastname: "",
        email: null,
        image: null,
        uid: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        phone: "",
        emailVerified: false,
        isGoogle: false,
      })
    );
  };

  //   USE EFFECTS
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user || null);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (user?.uid) {
      const getUser = async () => {
        await getUserDetailsFromSanity({ uid: user?.uid, dispatch });
      };
      getUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, handleUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
