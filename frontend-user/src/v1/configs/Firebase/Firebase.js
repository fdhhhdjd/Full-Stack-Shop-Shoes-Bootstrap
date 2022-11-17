import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import CONFIGS from '../../configs/config';
const firebaseConfig = {
  apiKey: CONFIGS.REACT_APP_API_KEY,
  authDomain: CONFIGS.REACT_APP_AUTH_DOMAIN,
  databaseURL: CONFIGS.REACT_APP_DATA_BASE_URL,
  projectId: CONFIGS.REACT_APP_PROJECT_ID,
  storageBucket: CONFIGS.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: CONFIGS.REACT_APP_MESSAGING_SENDER_ID,
  appId: CONFIGS.REACT_APP_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
