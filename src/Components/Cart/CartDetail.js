import { useContext } from 'react';
import CartContext from '../../Context/CartContext';
import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CartDetail = () => {
  const { cart, totalCart } = useContext(CartContext);

  return (
    <Flex flexDirection={'column'} width='60%' mx={20} >
      <Box
        backgroundColor='white'
        //border='1px solid #c5caff'
        shadow='xl'
        alignItems='center'
        textAlign='center'
        paddingY={1}
        paddingX={1}
        rounded={10}
      >
        <Box>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th fontWeight={700}>Imagen</Th>
                  <Th fontWeight={700}>Cantidad</Th>
                  <Th fontWeight={700}>Producto</Th>
                  <Th fontWeight={700}>Precio unitario</Th>
                </Tr>
              </Thead>
            </Table>
          </TableContainer>
          {cart.map((item) => (
            <TableContainer>
              <Table>
                <Tbody key={item.id}>
                  <Tr>
                    <Td>
                      <Image
                        height='50px'
                        width='50px'
                        display='flex'
                        rounded={100}
                        alignItems='flex-end'
                        justifyContent='flex-start'
                        src={item.imagen}
                      />
                    </Td>
                    <Td>{item.cantidad}</Td>
                    <Td>{item.nombre}</Td>
                    <Td>{item.precio}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          ))}
        </Box>
      </Box>
      <Flex
        // border='1px solid #c5caff'
        padding={5}
        rounded={10}
        shadow='xl'
        backgroundColor='white'
        marginTop={5}
        flexDirection={{ base: 'column', sm: 'row' }}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text fontWeight={700}>Total: {totalCart()}</Text>
        <Button>
          <Link to='/Cart'>Volver al carrito</Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default CartDetail;
