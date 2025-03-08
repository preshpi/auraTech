/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { config } from "./config";
import {
  createUserOnSanity,
  getUserDetailsFromSanity,
} from "../utils/user.requests";
import { getUserDetails } from "../sanity/sanity.query";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<UserCredential> => {
  const result = await signInWithPopup(auth, googleProvider);
  return result;
};

export { signInWithGoogle };

type GoogleAuthProps = {
  startTransition: React.TransitionStartFunction;
  navigate: any;
  dispatch: any;
  reset: () => void;
  result: UserCredential;
};

export const GoogleAuthSignIn = ({
  startTransition,
  navigate,
  dispatch,
  reset,
  result,
}: GoogleAuthProps) => {
  startTransition(async () => {
    try {
      const { displayName, email, emailVerified, photoURL, uid } = result.user;
      if (uid) {
        const userFromSanity = await getUserDetails(uid);
        if (!userFromSanity) {
          const splitName = displayName?.split(" ");
          const userData = {
            uid,
            firstname: splitName ? splitName[0] : "",
            lastname: splitName ? splitName[1] : "",
            email,
            image: photoURL,
            emailVerified: emailVerified,
            isGoogle: emailVerified,
          };
          await createUserOnSanity({
            userData,
            dispatch,
            navigate,
          });
        } else {
          await getUserDetailsFromSanity({ uid, dispatch });
        }
        const getLastPageVisit = Cookies.get(config.key.lastPath);
        if (getLastPageVisit) {
          navigate(getLastPageVisit);
        } else {
          navigate("/");
        }
        Cookies.set(config.key.userId, uid);
        toast.success("Login Successful");
        reset();
      }
    } catch (error: any) {
      toast.error("Error signing in with Google", error.message);
    }
  });
};
