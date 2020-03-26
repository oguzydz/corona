import * as firebase from 'firebase';
import { config } from "./config";
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
export const app = firebase.app();
export const auth = firebase.auth();
export const db = firebase.database();