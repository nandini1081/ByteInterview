import {getApps, initializeApp,cert} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";

const intitFirebaseAdmin = () => {
   const apps = getApps();
   //we do this to ensure that the firebase admin is not initilaised more than  once
   if(!apps.length){
    initializeApp({
        credential: cert({
            projectId : process.env.FIREBASE_PROJECT_ID,
            clientEmail : process.env.FIREBASE_CLIENT_EMAIL,
            privateKey : process.   env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
    })
   }
   return {
    //coming from firebase auth
    auth: getAuth(),
    db : getFirestore()
    }
}

export const{auth,db} = intitFirebaseAdmin();