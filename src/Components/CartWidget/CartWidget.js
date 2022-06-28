import { Box, Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import CartContext from '../../Context/CartContext';

const Cartwidget = (props) => {
  const { getQuantity } = useContext(CartContext);
  const cantidad = getQuantity(props.product);
  return (
    <>
      <Flex justifyContent='space-evenly'>
        <Box mx={2}>
          <FontAwesomeIcon icon={faCartShopping} />
        </Box>
        <Box>
          {cantidad === 0 ? '' : <Text textAlign='center'>{cantidad}</Text>}
        </Box>
      </Flex>
    </>
  );
};

export default Cartwidget;
