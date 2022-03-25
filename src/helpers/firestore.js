import { collection } from 'firebase/firestore';
import { firestore } from './firebase';

export const getStats = () => {
    return collection(firestore, 'stats');
}