/* eslint-disable @typescript-eslint/no-explicit-any */
import { colornames } from "color-name-list";

export const getColorCode = (colorName: string): string => {
  const color = colornames.find(
    (c: any) => c.name.toLowerCase() === colorName.toLowerCase()
  );
  return color ? color.hex : "#000000";
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (telephone: string) => {
  const telephoneRegex = /^\d{11}$/;
  return telephoneRegex.test(telephone);
};
