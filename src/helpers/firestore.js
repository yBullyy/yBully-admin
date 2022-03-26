import { collection, query, where, orderBy, getDocs, limit, setDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const getStats = () => {
    return collection(firestore, 'stats');
}

export const getDailyScans = () => {
    return collection(firestore, 'dailyScans');
}

export const getUsers = () => {
    return collection(firestore, 'users');
}

export const getOnlyUsers = () => {
    const usersRef = collection(firestore, 'users');
    return query(usersRef, where("role", "!=", "admin"));
}

export const getAdmins = () => {
    const usersRef = collection(firestore, 'users');
    return query(usersRef, where("role", "==", "admin"));
}

export const getTop5Users = () => {
    const usersRef = collection(firestore, 'users');
    return query(usersRef, where("role", "==", "trustedUser"), orderBy('trustScore','desc'), limit(5));
}

export const addAdmin = async (uid, name, email) => {
    await setDoc(doc(firestore, 'users', uid), { name, email, role: "admin", timestamp: Date.now() });
}

export const updateUser = async (uid, user) => {
    await updateDoc(doc(firestore, 'users', uid), user);
}