import React, { createContext, useEffect, useState, useContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth => ", currentuser);
            setUser(currentuser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <authContext.Provider
            value={{ user, login, signup, logout }}
        >
            {children}
        </authContext.Provider>
    );
}

export const useUserAuth = () => {
    return useContext(authContext);
}