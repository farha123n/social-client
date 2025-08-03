import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../fire.init';


export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
           const [loading,setLoading]=useState(true)
           const [bitProvider, setBitProvider] = useState([]);
const provider = new GoogleAuthProvider();
    const [user, setUser] = useState('')
    
  
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return()=> unSubscribe()

    },[])
    const logIn=(email,password)=>{
        setLoading(true)
     return   signInWithEmailAndPassword(auth, email, password)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        
    }
    const updateUser = (update) => {
        return updateProfile(auth.currentUser, update)
    }

    const signOutUser = () => {
        return signOut(auth)
    }
    const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const authInfo = {
        createUser, user, setUser, updateUser, signOutUser,logIn,googleSignIn,bitProvider,setBitProvider,loading
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;