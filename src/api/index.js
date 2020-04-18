import firebaseProvider from '../config/Firebase';

const auth = firebaseProvider.auth();
const db = firebaseProvider.firestore();

const api = {
    fetchRestaurant: (id) => {
        return db.collection('/restaurants').where('api_id', '==', id).get();
    }
};

export default api;
