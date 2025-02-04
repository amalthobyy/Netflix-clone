import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, EmailAuthCredential, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { response } from "express";


const firebaseConfig = {
  apiKey: "AIzaSyAp6ZSQCFVrPOch2WZvC09F-CCC3W1Y97k",
  authDomain: "netflix-clone-32dc8.firebaseapp.com",
  projectId: "netflix-clone-32dc8",
  storageBucket: "netflix-clone-32dc8.firebasestorage.app",
  messagingSenderId: "953354120564",
  appId: "1:953354120564:web:9471c1b1d19c3909bc9021",
  measurementId: "G-6RJCX9M8ZB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup =async (name,email,password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
         const user= res.user;
         await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,

         });
    }catch(error) {
        console.log(error);
        alert(error);
    }

}

const login= async ( email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }catch(error){
        console.log(error);
        alert(error);

    }
    
}
const logout=()=>{
    signOut(auth);

}
export {auth,db,login,signup,logout};
