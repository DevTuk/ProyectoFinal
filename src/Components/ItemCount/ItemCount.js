import { Text, Flex, Button, Box } from '@chakra-ui/react';
import { useState } from 'react';

const ItemCount = ({ stock, onAdd, countInicial = 0 }) => {
  const [count, setCount] = useState(
    stock >= 1 ? (countInicial = 1) : (countInicial = 0)
  );
  const [btnActivo, setBtnActivo] = useState(false);

  const restar = () => {
    if (count > 0) {
      setCount(count - 1);
      setBtnActivo(false);
    }
  };
  const sumar = () => {
    if (count < stock) {
      setCount(count + 1);
    }
    if (count >= stock) {
      setBtnActivo(true);
    }
  };
  const comprar = () => {
    onAdd(count);
  };
  return (
    <Flex direction='column'>
      <Box>
        <Flex justifyContent='center' align={'center'} m={5}>
          <Button
            variant='solid'
            size='md'
            backgroundColor='#C5CAFF'
            color='gray.800'
            onClick={restar}
          >
            -
          </Button>
          <Text color='gray.800' ml={5} mr={5}>
            {count}
          </Text>
          <Button
            className='btnActivo'
            variant='solid'
            size='md'
            border={1}
            backgroundColor='#C5CAFF'
            color='gray.800'
            onClick={sumar}
            disabled={btnActivo}
          >
            +
          </Button>
        </Flex>
        {countInicial >= 1 ? (
          <Button
            variant='solid'
            size='md'
            color='gray.800'
            backgroundColor='#ffbcde'
            onClick={comprar}
            disabled={count === 0 ? true : false}
          >
            Agregar al carrito
          </Button>
        ) : (
          <Button
            variant='solid'
            size='md'
            color='gray.800'
            backgroundColor='#ffbcde'
            disabled={true}
          >
            Sin Stock
          </Button>
        )}
      </Box>
    </Flex>
  );
};
export default ItemCount;
