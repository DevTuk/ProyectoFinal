import { useContext } from 'react';
import CartContext from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import {
  Box,
  Center,
  Stack,
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

import CartEmpty from './CartEmpty';

const Cart = () => {
  const {
    cart,
    addCantidad,
    removeCantidad,
    totalCart,
    removeItems,
    removeCart,
    getQuantity,
  } = useContext(CartContext);
  const cantidad = getQuantity();

  return (
    <>
      <Center>
        <Flex
          alignSelf={'center'}
          flexDirection={{ base: 'column', sm: 'row' }}
          justify={'center'}
          width={'90%'}
        >
          {cantidad === 0 ? (
            <CartEmpty />
          ) : (
            <Box
              backgroundColor='white'
              alignItems='center'
              shadow='md'
              //border='1px solid #c5caff'
              marginRight={10}
              marginLeft={0}
              paddingX={3}
              paddingY={5}
              rounded={10}
              width={'100%'}
            >
              <Text
                fontWeight={700}
                margin={3}
                paddingBottom={3}
                alignItems='self-start'
                fontSize={{ base: '1xl', sm: '1xl' }}
                borderBottom='1px solid #c5caff'
              >
                Carrito ({cantidad})
              </Text>
              <Box
                alignItems='center'
                justifyContent='space-between'
                display='flex'
                flexDirection='column'
                backgroundColor='white'
              >
                {cart.map((item) => (
                  <Box
                    key={item.id}
                    alignItems='center'
                    backgroundColor='white'
                    rounded={10}
                    margin={1}
                    width='100%'
                    borderBottom='1px solid #ffbcde'
                  >
                    <Stack spacing={1} mt={4} mr={0}>
                      <Stack
                        justifyContent='space-around'
                        alignItems='center'
                        spacing={2}
                        margin={2}
                        flexDirection={{ base: 'row', sm: 'column' }}
                        width='100%'
                      >
                        <Flex
                          alignItems='center'
                          justifyContent='space-around'
                          display='flex'
                          flexDirection={{ base: 'column', md: 'row' }}
                          width='100%'
                        >
                          <Link to={`/detail/${item.id}`}>
                            <Image
                              height='80px'
                              width='80px'
                              display='flex'
                              alignItems='flex-start'
                              justifyContent='flex-start'
                              rounded={100}
                              src={item.imagen}
                            />
                          </Link>
                          <Text fontWeight={700}>{item.nombre}</Text>
                          <Text fontWeight={700}>
                            <Button
                              marginX={2}
                              onClick={() => removeCantidad(item.id)}
                            >
                              -
                            </Button>

                            {item.cantidad}
                            <Button
                              marginX={2}
                              onClick={() => addCantidad(item.id)}
                            >
                              +
                            </Button>
                          </Text>
                          <Text fontWeight={700}>{item.precio}</Text>
                          <Button onClick={() => removeItems(item.id)}>
                            X
                          </Button>
                        </Flex>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {cantidad === 0 ? (
            ''
          ) : (
            <Flex flexDirection={'column'}>
              <Box
                backgroundColor='white'
                alignItems='center'
                textAlign='center'
                margin={0}
                paddingX={3}
                paddingY={5}
                rounded={10}
                shadow='md'
              >
                <Text fontWeight={700} fontSize={{ base: '2xl', sm: '3xl' }}>
                  Resumen de Compra
                </Text>

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
                <Button mt={6} mx={2} onClick={() => removeCart()}>
                  Vaciar Carrito
                </Button>
                <Link to='/'>
                  <Button mt={6} mx={2}>
                    Agregar más productos
                  </Button>
                </Link>
              </Box>
              <Box
                background='white'
                shadow='md'
                padding={5}
                rounded={10}
                marginTop={5}
                display='flex'
                flexDirection={{ base: 'column', sm: 'row' }}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text fontWeight={700}>Total: {totalCart()}</Text>
                <Button>
                  <Link to='/Formulario'>Finalizar Compra</Link>
                </Button>
              </Box>
            </Flex>
          )}
        </Flex>
      </Center>
    </>
  );
};

export default Cart;
