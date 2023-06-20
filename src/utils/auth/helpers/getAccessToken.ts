import { ACCESS_TOKEN } from "./keys";

export const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN) || "";
