import { USERNAME } from "./keys";

export const getUsername = () => sessionStorage.getItem(USERNAME);