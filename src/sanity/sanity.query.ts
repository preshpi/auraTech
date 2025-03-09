import { toast } from "sonner";
import { client } from "./sanity";

export const productQuery = `{
  _id,
  _createdAt,
  product_name,
  categories[]->{_id, image, name, slug},
  product_desc,
  imgUrl,
  otherImages,
  price,
  status,
  slug,
  colors[]->{_id, title},
}`;

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

// Get categories
export const getCategories = async () => {
  const query = `*[_type == "category"]{
  _id, name, image, slug, description
  }`;

  try {
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    toast.error((error as { message: string }).message);
    return [];
  }
};

//Get Best Sellers
export const getBestSellers = async () => {
  const query = `*[_type == "bestSeller"][0]{
  _id, title, products[]->${productQuery}

  }`;

  try {
    const bestSellers = await client.fetch(query);
    return bestSellers;
  } catch (error) {
    toast.error((error as { message: string }).message);
    return [];
  }
};
