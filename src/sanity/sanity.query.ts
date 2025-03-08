import { client } from "./sanity";

const userQuery = `*[_type == "user" && uid == $uid][0] {
    _id,
    uid,
    firstname,
    lastname,
    email,
    emailVerified,
    isGoogle,
    phone,
    address,
    country,
    state,
    city,
    zipCode,
    image
  }`;

// Get user Details
export const getUserDetails = async (uid: string) => {
  const params = { uid };
  const user = await client.fetch(userQuery, params);
  return user;
};
