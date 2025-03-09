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

//Get New Arrival
export const getNewArrival = async () => {
  const query = `*[_type == "newArrival"][0]{
    _id, title, products[]->${productQuery}
  
    }`;

  try {
    const newArrival = await client.fetch(query);
    return newArrival;
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

//Get All Products
export const getAllProducts = async () => {
  const query = `*[_type == "product"] | order(_createdAt desc)${productQuery}`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    toast.error((error as { message: string }).message);
    return [];
  }
};

//Get Product Colors
export const getProductColors = async () => {
  const query = `*[_type == "color"]{
  _id, title
  }`;

  try {
    const colors = await client.fetch(query);
    return colors;
  } catch (error) {
    toast.error((error as { message: string }).message);
    return [];
  }
};

// Get solo product
export const getSoloProduct = async (product_id: string | undefined) => {
  const query = `*[_type == "product" && _id == '${product_id}'][0]${productQuery}`;

  try {
    const soloProduct = await client.fetch(query);
    return soloProduct;
  } catch (error) {
    toast.error((error as { message: string }).message);
    return [];
  }
};

// Get similar products
export const getSimilarProducts = async (categoryName: string | undefined) => {
  const query = `*[_type == "product" &&  references(*[_type == "category" && name == '${categoryName}']._id)][0...5]${productQuery}`;

  try {
    const similarProducts = await client.fetch(query);
    return similarProducts;
  } catch (error) {
    toast.error((error as { message: string }).message);
    return [];
  }
};

// Search products by name
export const searchProducts = async (searchTerm: string) => {
  const query = `*[_type == "product" && product_name match '${searchTerm}*']${productQuery}`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    toast.error((error as { message: string }).message);
    return [];
  }
};
