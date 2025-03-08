/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserType = {
  _id?: string;
  uid: string;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | null;
  emailVerified: boolean;
  isGoogle: boolean;
  phone?: string | undefined;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  image?: string | null;
};

export type CreateUserOnSanityProps = {
  dispatch: any;
  userData: UserType;
  navigate: any;
};

export type GetUserFromSanityProps = {
  dispatch: any;
  uid: string;
};
