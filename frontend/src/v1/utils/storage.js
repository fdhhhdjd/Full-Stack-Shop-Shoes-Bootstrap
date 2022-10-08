const STORAGES = {
  saveLocalStorage: (key, value) => {
    return localStorage.setItem(key, value);
  },
  getLocalStorage: (key) => {
    return localStorage.getItem(key);
  },
  clearLocalStorage: (key) => {
    return localStorage.removeItem(key);
  },
};
export default STORAGES;
