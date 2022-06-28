import { Grid, Center } from '@chakra-ui/react';
import Items from '../Items/Items';

const ItemList = ({ producto }) => {
  return (
    <>
      
        <Grid
          gap={4}
          width='100%'
          templateColumns={{ md: 'repeat(4, 1fr)', base: 'repeat(1, 1fr)' }}
        >
          {producto.map((producto) => (
            <Items key={producto.id} {...producto} />
          ))}
        </Grid>
      
    </>
  );
};

export default ItemList;
