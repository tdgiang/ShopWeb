import firebase, { db, storage } from "firebase-config";
import { generateKeywords } from "utils";

async function get(userId) {
    try {
        const doc = await db.collection("users").doc(userId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        } else {
            throw new Error("Không tìm thấy dữ liệu");
        }
    } catch (error) {
        throw error;
    }
}

async function getAll() {
    try {
        const querySnapshot = await db.collection("users").orderBy("createdDate", "asc").get();
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
            data.push({
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
            });
        });
        return data;
    } catch (error) {
        throw error;
    }
}

async function update(userData) {
    try {
        if (typeof userData.avatar === "object") {
            //upload image
            // Create a root reference
            const storageRef = storage.ref();

            // Create a reference
            const avatarRef = storageRef.child(userData.avatar.name);

            const uploadResult = await avatarRef.put(userData.avatar);
            const imageUrl = await avatarRef.getDownloadURL();

            userData.avatar = imageUrl;
        }
        userData.updatedDate = firebase.firestore.FieldValue.serverTimestamp();
        userData.keywords = generateKeywords(userData.name);
        delete userData.createdDate;
        const email = userData.email;
        delete userData.email;

        const response = await db.collection("users").doc(userData.id).update(userData);
        userData.email = email;
        return userData;
    } catch (error) {
        throw error;
    }
}

async function updateField({ id, field, value }) {
    try {
        await db
            .collection("users")
            .doc(id)
            .update({
                [field]: value,
            });
    } catch (error) {
        throw error;
    }
}

const usersApi = {
    get,
    update,
    getAll,
    updateField,
};

export default usersApi;
