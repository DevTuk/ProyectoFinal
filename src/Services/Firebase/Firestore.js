import { db } from '../../Services/Firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

export const getProduct = (categoryId) => {
  return new Promise((resolve, reject) => {
    const referenciaColeccion = categoryId
      ? query(collection(db, 'Productos'), where('category', '==', categoryId))
      : collection(db, 'Productos');

    getDocs(referenciaColeccion)
      .then((response) => {
        const products = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
