import { collection, query, where, orderBy, limit, setDoc, doc, updateDoc, writeBatch, deleteDoc, getDoc } from 'firebase/firestore';
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





// temp functions delete later
// export const addReportedTweet = async () => {
//     const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//     const randomInt = Math.floor(Math.random() * 100) + 1;
//     await setDoc(doc(firestore, 'reportedTweets', randomId), {
//         tweetId: randomId,
//         correctLabel: 'bully',
//         reportCount: randomInt,
//         tweetText: 'this is the reported tweet text',
//         reportedBy: ['userid1']
//     });
// }

// export const addApprovedTweet = async () => {
//     const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//     const randomInt = Math.floor(Math.random() * 100) + 1;
//     await setDoc(doc(firestore, 'approvedTweets', randomId), {
//         tweetId: randomId,
//         correctLabel: 'bully',
//         reportCount: randomInt,
//         tweetText: 'this is the reported tweet text',
//         reportedBy: ['userid1']
//     });
// }
