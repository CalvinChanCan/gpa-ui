import {User} from "../types/user";

export const getUserFromLocalStorage = (): User => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
};
