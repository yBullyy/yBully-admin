import { collection, query, where, orderBy, limit, setDoc, doc, updateDoc, writeBatch, deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import { firestore, storage } from './firebase';
import { getDownloadURL, ref } from 'firebase/storage';

// get download url from firebase storage
export const getModelDownloadUrl = async (filePath) => {
    const storageRef = ref(storage, filePath);
    const url = await getDownloadURL(storageRef);
    return url;
}

export const getLastModel = async () => {
    const modelsSnapshot = await getDocs(collection(firestore, 'models'));
    const lastModel = modelsSnapshot.docs[modelsSnapshot.docs.length - 1];
    return lastModel.data();
}

export const deactivateCurrentlyActiveModel = async () => {
    const modelsSnapshot = await getDocs(collection(firestore, 'models'));
    const activeModel = modelsSnapshot.docs.find(model => model.data().isActive === true);
    if(activeModel)
        await updateDoc(doc(firestore, 'models', activeModel.data().version.toString()), { isActive: false });
}

export const activateModel = async (model_version) => {
    await updateDoc(doc(firestore, 'models', model_version.toString()), { isActive: true });
}



export const getStats = () => {
    return collection(firestore, 'stats');
}

export const getDailyScans = () => {
    return query(collection(firestore, 'dailyScans'), orderBy('timestamp', 'asc'));
}

export const getDailyReports = () => {
    return query(collection(firestore, 'dailyReports'), orderBy('timestamp', 'asc'));
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
    return query(usersRef, where("role", "==", "trustedUser"), orderBy('trustScore', 'desc'), limit(5));
}

export const addAdmin = async (uid, name, email) => {
    await setDoc(doc(firestore, 'users', uid), { name, email, role: "admin", timestamp: Date.now() });
}

export const updateUser = async (uid, user) => {
    await updateDoc(doc(firestore, 'users', uid), user);
}

export const getReportedTweets = () => {
    const reportedTweetsRef = collection(firestore, 'reportedTweets');
    return query(reportedTweetsRef, orderBy('reportCount', 'desc'));
}

export const getApprovedTweets = () => {
    const approvedTweetsRef = collection(firestore, 'approvedTweets');
    return query(approvedTweetsRef, orderBy('reportCount', 'desc'));
}

export const deleteSingleAprrovedTweet = async (tweetId) => {
    await deleteDoc(doc(firestore, 'approvedTweets', tweetId));
}

export const batchDeleteReportedTweets = async (tweetIds) => {
    const batch = writeBatch(firestore);
    tweetIds.forEach(tweetId => {
        batch.delete(doc(firestore, 'reportedTweets', tweetId));
    });
    await batch.commit();
}

export const batchAddApprovedTweets = async (tweets) => {
    const batch = writeBatch(firestore);
    tweets.forEach(tweet => {
        batch.set(doc(firestore, 'approvedTweets', tweet.tweetId), tweet);
    });
    await batch.commit();
}

export const batchDeleteApprovedTweets = async (tweetIds) => {
    const batch = writeBatch(firestore);
    tweetIds.forEach(tweetId => {
        batch.delete(doc(firestore, 'approvedTweets', tweetId));
    });
    await batch.commit();
}

export const updateUserStats = async (
    userId,
    totalScannedTweets = 0,
    totalBullyTweets = 0,
    totalReportedTweets = 0,
    totalApprovedTweets = 0,) => {
    try {
        const user = await getDoc(doc(firestore, 'users', userId));
        const previousTotalScannedTweets = user.data().totalScannedTweets;
        const previousTotalBullyTweets = user.data().totalBullyTweets;
        const previousTotalReportedTweets = user.data().totalReportedTweets;
        const previousTotalApprovedTweets = user.data().totalApprovedTweets;

        const newTotalScannedTweets = previousTotalScannedTweets + totalScannedTweets;
        const newTotalBullyTweets = previousTotalBullyTweets + totalBullyTweets;
        const newTotalReportedTweets = previousTotalReportedTweets + totalReportedTweets;
        const newTotalApprovedTweets = previousTotalApprovedTweets + totalApprovedTweets;
        const newTrustScore = newTotalApprovedTweets / newTotalReportedTweets;

        const userData = {
            totalScannedTweets: newTotalScannedTweets,
            totalBullyTweets: newTotalBullyTweets,
            totalReportedTweets: newTotalReportedTweets,
            totalApprovedTweets: newTotalApprovedTweets,
            trustScore: newTrustScore,
        }
        await updateDoc(doc(firestore, 'users', userId), userData);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getModels = () => {
    return collection(firestore, 'models');
}

