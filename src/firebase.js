import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyAp6ZSQCFVrPOch2WZvC09F-CCC3W1Y97k",
  authDomain: "netflix-clone-32dc8.firebaseapp.com",
  projectId: "netflix-clone-32dc8",
  storageBucket: "netflix-clone-32dc8.firebasestorage.app",
  messagingSenderId: "953354120564",
  appId: "1:953354120564:web:c50d8e6bee39ff4fbc9021",
  measurementId: "G-5487MGJYSQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        console.log("user",user.uid);

       
         const docRef= await addDoc(collection(db, "users"), { 
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        console.log("firestore data save",docRef.id);

        console.log("User added to Firestore:", user.uid);
        
    } catch (error) {
        console.error("Signup error:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        throw error;
    }
};

const login= async (email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);

    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        throw error;

    }

};

const logout = ()=>{
    signOut(auth);
};


export{auth,db,login,signup,logout};



