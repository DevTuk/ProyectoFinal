import { useEffect, useState } from 'react';
import ItemList from '../Items/ItemList';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Box, Text } from '@chakra-ui/react';
import { getProduct } from '../../Services/Firebase/Firestore';

const ItemListContainer = () => {
  const [products, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    getProduct(categoryId)
      .then((response) => {
        setProductos(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {products.length > 0 ? (
        <ItemList producto={products} />
      ) : (
        <Box
          // alignItems='center'
          border='1px solid #c5caff'
          // mx={10}
          // pl={3}
          // pr={3}
          // pt={5}
          // pb={5}
          rounded={10}
        >
          <Text
            fontWeight={700}
            textAlign='center'
            fontSize={{ base: '2xl', sm: '2xl' }}
          >
            Ups... ¡No hay productos!
          </Text>
        </Box>
      )}
    </>
  );
};

export default ItemListContainer;
