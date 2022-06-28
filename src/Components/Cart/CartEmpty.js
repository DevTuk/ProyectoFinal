import { Box, Text, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import CartContext from '../../Context/CartContext';
const CartEmpty = () => {
  const { getQuantity } = useContext(CartContext);
  const cantidad = getQuantity();
  return (
    <Box
      backgroundColor='white'
      alignItems='center'
      //border='1px solid #c5caff'
      mx={20}
      pl={3}
      pr={3}
      pt={5}
      pb={5}
      rounded={10}
      width={'70%'}
      shadow='md'
    >
      <Text
        fontWeight={700}
        m={4}
        pb={3}
        alignItems='self-start'
        fontSize={{ base: '1xl', sm: '1xl' }}
        borderBottom='1px solid #c5caff'
      >
        Carrito ({cantidad})
      </Text>
      <Flex flexDirection={'column'} width='100%'>
        <Box
          backgroundColor='white'
          alignItems='center'
          textAlign='center'
          m={20}
          pl={3}
          pr={3}
          pt={5}
          pb={5}
          rounded={10}
        >
          <Text fontWeight={100} fontSize={{ base: '2xl', sm: '3xl' }}>
            Tu carrito está vacío
          </Text>
          <Text fontWeight={100} fontSize={{ base: '2xl', sm: 'md' }}>
            ¿No sabés qué comprar? ¡Nuestros productos te esperan!
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartEmpty;
