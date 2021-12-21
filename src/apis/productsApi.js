import firebase, { db, storage } from "firebase-config";
import { generateKeywords, getRandomInt, removeVnMark } from "utils";
import {dataShow} from "../pages/Client/Products/dataFake";

async function get(productId) {
    try {
        const doc = await db.collection("products").doc(productId).get();
        
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
       // const querySnapshot = await db.collection("products").orderBy("createdDate", "desc").get();
        let data = [];
        dataShow.forEach((documentSnapshot) => {
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

async function create(productData) {
    try {
        //upload image
        // Create a root reference
        const storageRef = storage.ref();

        // Create a reference
        const productImageRef = storageRef.child(productData.productImage.name);
            
        const uploadResult = await productImageRef.put(productData.productImage);
        const imageUrl = await productImageRef.getDownloadURL();

        productData.createdDate = firebase.firestore.FieldValue.serverTimestamp();
        productData.productImage = imageUrl;
        productData.keywords = generateKeywords(productData.productName);
        productData.rating = getRandomInt(2, 5);

        const response = await db.collection("products").add(productData);

        return response;
    } catch (error) {
        throw error;
    }
}

async function update(productData) {
    try {
        if (typeof productData.productImage === "object") {
            //upload image
            // Create a root reference
            const storageRef = storage.ref();

            // Create a reference
            const productImageRef = storageRef.child(productData.productImage.name);

            const uploadResult = await productImageRef.put(productData.productImage);
            const imageUrl = await productImageRef.getDownloadURL();

            productData.productImage = imageUrl;
        }
        productData.updatedDate = firebase.firestore.FieldValue.serverTimestamp();
        productData.keywords = generateKeywords(productData.productName);
        delete productData.createdDate;
        const response = await db.collection("products").doc(productData.id).update(productData);

        return response;
    } catch (error) {
        throw error;
    }
}

async function remove(productId) {
    try {
        await db.collection("products").doc(productId).delete();
    } catch (error) {
        throw error;
    }
}

async function search(keywords) {
    try {
        // const querySnapshot = await db
        //     .collection("products")
        //     .where("keywords", "array-contains", removeVnMark(keywords))
        //     .get();
        let data = [];
        dataShow.forEach((documentSnapshot) => {
          data.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
            keywords,
          });
        });
        return data;
    } catch (error) {
        throw error;
    }
}

async function getWithFilters(filters) {
    try {
        let query = db.collection("products");
        const { params, sort } = filters;

        for (let key in params) {
            const { label, operator, value } = params[key];
            if (value && value?.length !== 0) {
                query = query.where(label, operator, value);
            }
        }

        if (sort.value) {
            query = query.orderBy(sort.label, sort.value);
        }

        const doc = await query.get();
        let data = [];
        doc.forEach((documentSnapshot) => {
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

async function comment(commentData) {
    try {
        commentData.createdDate = firebase.firestore.FieldValue.serverTimestamp(); 
        await db.collection("comments").add(commentData);
    } catch (error) {
        throw error;
    }
}

const productsApi = {
    get,
    getAll,
    create,
    update,
    remove,
    search,
    getWithFilters,
    comment,
};

export default productsApi;
