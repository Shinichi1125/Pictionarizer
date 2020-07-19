

const loginId: string = '0'; 

export const setLoginId = (id) => localStorage.setItem(loginId, id);

export const getLoginId = () => localStorage.getItem(loginId);


