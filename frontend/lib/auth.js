
export const getToken = () => localStorage.getItem('auth-token')
export const setToken = (token) => localStorage.setItem('auth-token', token)
export const deleteToken = () => localStorage.removeItem('auth-token')
