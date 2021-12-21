import { db } from "firebase-config";

async function get() {
    try {
        const querySnapshot = await db.collection("categories").get();
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

const categoriesApi = {
    get,
};

export default categoriesApi;
