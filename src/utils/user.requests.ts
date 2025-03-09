import { handleUserDetails } from "../redux/slices/userSlice";
import {
  CreateUserOnSanityProps,
  GetUserFromSanityProps,
  UserType,
} from "../types/auth/user";
import Cookies from "js-cookie";
import { config } from "../helper/config";
import { toast } from "sonner";
import { getUserDetails } from "../sanity/sanity.query";
import { client } from "../sanity/sanity";

export const createUserOnSanity = async ({
  userData,
  dispatch,
  navigate,
}: CreateUserOnSanityProps) => {
  console.log(userData, "usernfn");

  try {
    // Create a user document in Sanity
    const doc = {
      _id: userData._id,
      _type: "user",
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      phone: userData?.phone,
      email: userData?.email,
      uid: userData?.uid,
      image: userData?.image,
      isGoogle: userData?.isGoogle,
      emailVerified: false, // set initial email verification status
    };

    const res = await client.create(doc);

    // Dispatch the user details to Redux
    dispatch(
      handleUserDetails({
        _id: res._id,
        firstname: res.firstname,
        lastname: res.lastname,
        email: res.email,
        uid: res.uid,
        image: res.image,
        phone: res.phone,
        isGoogle: res.isGoogle,
        emailVerified: res.emailVerified,
      })
    );

    // Handle routing
    const getLastPageVisit = Cookies.get(config.key.lastPath);
    if (getLastPageVisit) {
      navigate(getLastPageVisit);
    }

    // Set user ID cookie
    Cookies.set(config.key.userId, res.uid || res._id); // Adjust to your logic

    toast.success("Form submitted successfully");
    return { success: true };
  } catch (error) {
    toast.error("Failed to create user. Please try again.");
    return { success: false, error };
  }
};

export const getUserDetailsFromSanity = async ({
  uid,
  dispatch,
}: GetUserFromSanityProps) => {
  const res: UserType = await getUserDetails(uid);
  if (!res) {
    return;
  }
  const {
    _id,
    firstname,
    lastname,
    isGoogle,
    image,
    email,
    emailVerified,
    phone,
    address,
    city,
    country,
    state,
    zipCode,
    uid: userId,
  } = res;
  dispatch(
    handleUserDetails({
      _id,
      firstname,
      lastname,
      email: email,
      image,
      uid: userId,
      phone,
      address: address ? address : "",
      country: country ? country : "",
      state: state ? state : "",
      city: city ? city : "",
      zipCode: zipCode ? zipCode : "",
      emailVerified,
      isGoogle,
    })
  );

  return { success: true };
};
