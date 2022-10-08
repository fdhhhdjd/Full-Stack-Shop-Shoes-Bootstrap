import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../configs/Firebase/Firebase";
const STORAGES = {
  //* LocalStorage No JSON
  saveLocalStorage: (key, value) => {
    return window.localStorage.setItem(key, value);
  },
  getLocalStorage: (key) => {
    return window.localStorage.getItem(key);
  },
  //* LocalStorage JSON
  saveLocalStorageJson: (key, value) => {
    return localStorage.setItem(key, value);
  },
  getLocalStorageJson: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  //* LocalStorage Delete Key
  clearLocalStorage: (key) => {
    return localStorage.removeItem(key);
  },
  //* LocalStorage Delete All
  clearLocalStorageAll: () => {
    return window.localStorage.clear();
  },
  //* Limit Character
  except: (str, number) => {
    if (str?.length > number) {
      str = str.substring(0, number) + " " + "...";
    }
    return str;
  },
  //* Check Recaptcha Firebase
  checkRecapChaFirebase: (number) => {
    console.log(number, "-----phone_number----");
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  },
};
export default STORAGES;
