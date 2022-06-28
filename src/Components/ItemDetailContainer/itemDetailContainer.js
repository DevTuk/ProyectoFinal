import ItemDetail from '../ItemsDetail/ItemDetail';
import { useEffect, useState } from 'react';
// import { getProductsById } from '../async/async';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../Services/Firebase';

const ItemDetailContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { prodId } = useParams();

  useEffect(() => {
        getDoc(doc(db, 'Productos', prodId))
      .then((response) => {
        const productos = { id: response.id, ...response.data() };
        setProductos(productos);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [prodId]);

  return <>{loading ? <Loader /> : <ItemDetail {...productos} />}</>;
};

export default ItemDetailContainer;
