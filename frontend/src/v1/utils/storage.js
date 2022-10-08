const STORAGES = {
  saveLocalStorage: (key, value) => {
    return localStorage.setItem(key, value);
  },
  getLocalStorage: (key) => {
    return localStorage.getItem(key);
  },
  saveLocalStorageJson: (key, value) => {
    return localStorage.setItem(key, value);
  },
  getLocalStorageJson: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  clearLocalStorage: (key) => {
    return localStorage.removeItem(key);
  },
  clearLocalStorageAll: () => {
    window.localStorage.clear();
  },
  //* limit character
  except: (str, number) => {
    if (str?.length > number) {
      str = str.substring(0, number) + " " + "...";
    }
    return str;
  },
};
export default STORAGES;
