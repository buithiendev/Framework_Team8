import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDQFh3_VkRN4Szyij0iIK2X_jQ7lkuJiPI",
  authDomain: "deathshop-15e27.firebaseapp.com",
  projectId: "deathshop-15e27",
  storageBucket: "deathshop-15e27.appspot.com",
  messagingSenderId: "786360622041",
  appId: "1:786360622041:web:834de5ed8b56bf9fab17c8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)