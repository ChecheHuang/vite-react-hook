import Cookies from "js-cookie";
export const setCookies = (name: string, value: string) => {
  Cookies.set(name, value);
};
export const getCookies = (name: string) => {
  return Cookies.get(name);
};

export const removeCookies = (name: string) => {
   Cookies.remove(name);
};


