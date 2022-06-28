import { useForm } from 'react-hook-form';
import {
  FormControl,
  Box,
  Flex,
  Input,
  Button,
  Center,
  useToast,
  Heading,
  FormLabel,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import CartContext from '../../Context/CartContext';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  documentId,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import CartDetail from '../Cart/CartDetail';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

const Formulario = () => {
  const { register, handleSubmit } = useForm();
  const { cart, totalCart, removeCart, getQuantity } = useContext(CartContext);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const cantidad = getQuantity();
  const toast = useToast();
  const navigate = useNavigate();
  let date = new Date();

  const onChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const [cliente, setCliente] = useState({
    Nombre: '',
    Apellido: '',
    Email: '',
    EmailConfirm: '',
    Telefono: '',
    Mensaje: '',
  });

  useEffect(() => {
    manejoBoton();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cliente]);

  const manejoBoton = () => {
    const validaNombre = /^[a-zA-Z áéíóúüÁÉÍÓÜÚ]{3,15}$/;
    const validaApellido = /^[a-zA-Z áéíóúüÁÉÍÓÜÚ]{3,15}$/;
    const validaEmail = /^([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
    const validaTel = /^[0-9]{8,15}$/;
    if (
      cantidad === 0 ||
      cliente.Nombre.search(validaNombre) ||
      cliente.Apellido.search(validaApellido) ||
      cliente.Email.search(validaEmail) ||
      cliente.Email.search(validaEmail) ||
      cliente.Telefono.search(validaTel) ||
      cliente.Email !== cliente.EmailConfirm
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  };

  const createOrder = () => {
    setLoading(true);
    const objOrder = {
      cliente,
      fecha: date.toLocaleDateString(),
      hora: date.toLocaleTimeString(),
      items: cart,
      total: totalCart(),
    };

    const idsInCart = cart.map((prod) => prod.id);

    const batch = writeBatch(db);

    const sinStock = [];

    const orderCollectionRef = collection(db, 'Productos');

    getDocs(query(orderCollectionRef, where(documentId(), 'in', idsInCart)))
      .then((response) => {
        response.docs.forEach((doc) => {
          const dataDoc = doc.data();
          const prodCantidad = cart.find(
            (prod) => prod.id === doc.id
          )?.cantidad;

          if (dataDoc.stock >= prodCantidad) {
            batch.update(doc.ref, { stock: dataDoc.stock - prodCantidad });
          } else {
            sinStock.push({ id: doc.id, ...dataDoc });
          }
        });
      })
      .then(() => {
        if (sinStock.length === 0) {
          const orderCollectionRef = collection(db, 'Orden de Compra');
          return addDoc(orderCollectionRef, objOrder);
        } else {
          return Promise.reject({ type: 'out_of_stock', products: sinStock });
        }
      })
      .then(({ id }) => {
        batch.commit();
        removeCart();
        setCliente({
          Nombre: '',
          Apellido: '',
          Email: '',
          EmailConfirm: '',
          Telefono: '',
          Mensaje: '',
        });
        navigate('/');
        toast({
          title: 'Orden creada',
          description: `La orden: ${id} ha sido creada correctamente`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.type === 'out_of_stock') {
          toast({
            title: 'Error',
            description: 'Algunos productos no tienen stock suficiente',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (loading) {
    return <Loader />;
  }
  const onSubmit = (data, e) => {};
  return (
    <Center marginBottom={24}>
      <VStack maxWidth={800} mx={15}>
        <Heading textAlign='start' mb={5}>
          Completa los datos para finalizar tu compra
        </Heading>
        <Flex>
          <CartDetail />
          <Box width={500}>
            <Box backgroundColor='white' rounded={10} shadow='xl' p={10}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type={'text'}
                    autoFocus={true}
                    mb={1}
                    name='Nombre'
                    placeholder='Nombre'
                    {...register('Nombre', { required: true })}
                    value={cliente.Nombre}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    type={'text'}
                    mb={1}
                    name='Apellido'
                    placeholder='Apellido'
                    {...register('Apellido', { required: true })}
                    value={cliente.Apellido}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Telefono</FormLabel>
                  <Input
                    type={'number'}
                    mb={1}
                    name='Telefono'
                    placeholder='1112223333'
                    {...register('Telefono', { required: true })}
                    value={cliente.Telefono}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    mb={1}
                    type={'email'}
                    name='Email'
                    placeholder='email@dominio.com'
                    {...register('Email', {
                      required: true,
                    })}
                    value={cliente.Email}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Confirma el Email</FormLabel>
                  <Input
                    mb={1}
                    type={'email'}
                    name='EmailConfirm'
                    placeholder='email@dominio.com'
                    {...register('EmailConfirm', {
                      required: true,
                    })}
                    value={cliente.EmailConfirm}
                    onChange={onChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Mensaje</FormLabel>
                  <Textarea
                    mb={1}
                    type={'text'}
                    name='Mensaje'
                    placeholder='Que tendríamos que saber?'
                    {...register('Mensaje')}
                    value={cliente.Mensaje}
                    onChange={onChange}
                  />
                  <Button
                    type='submit'
                    disabled={btnDisabled}
                    onClick={() => createOrder()}
                  >
                    Realizar Pedido
                  </Button>
                </FormControl>
              </form>
            </Box>
          </Box>
        </Flex>
      </VStack>
    </Center>
  );
};

export default Formulario;
