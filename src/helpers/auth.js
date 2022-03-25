import { firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const isAuthenticated = () =>{
    let user = JSON.parse(localStorage.getItem('user'));
    return !!user;
}

export const getUser = (uid) => {
    return getDoc(doc(firestore, 'users', uid));
}
