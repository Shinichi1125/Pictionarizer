
const loginId: string = '0'; 

export const setLoginId = (id: string) => localStorage.setItem(loginId, id);

export const getLoginId = () => localStorage.getItem(loginId);

export const logout = () => localStorage.setItem(loginId, '0');




