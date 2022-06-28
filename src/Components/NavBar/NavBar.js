import {
  Stack,
  StackDivider,
  MenuItemOption,
  MenuButton,
  MenuList,
  Menu,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';

import Logo from '../Logo/logo.js';
import Cartwidget from '../CartWidget/CartWidget';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../Services/Firebase';
import { collection, getDocs } from 'firebase/firestore';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    const refCollection = collection(db, 'Category');

    getDocs(refCollection).then((response) => {
      const categoria = response.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setCategoria(categoria);
    });
  }, []);

  return (
    <>
      <Stack
        shadow='md'
        alignItems='center'
        backgroundColor='white'
        marginBottom={5}
        rounded={24}
        position='sticky'
        top='1'
        zIndex={1}
        paddingX={10}
        direction='row'
        height='90px'
        justifyContent='space-between'
        minWidth='sm'
      >
        <Link to='/'>
          <Logo />
        </Link>
        <Stack
          direction='row'
          divider={<StackDivider borderColor='black' />}
          marginTop={{ base: 60, sm: 0 }}
          spacing='6'
          display={['none', 'none', 'flex', 'flex']}
        >
          <Menu closeOnSelect={true}>
            <MenuButton>Categorias</MenuButton>

            <MenuList>
              {categoria.map((categoria) => (
                <Link key={categoria.id} to={`/category/${categoria.id}`}>
                  {' '}
                  <MenuItemOption>{categoria.descripcion} </MenuItemOption>
                </Link>
              ))}
            </MenuList>
          </Menu>
          <Link to='/cart'>
            <Cartwidget />
          </Link>
        </Stack>
        <IconButton
          aria-label='Open Menu'
          size='lg'
          mr={2}
          icon={<HamburgerIcon />}
          display={['flex', 'flex', 'none', 'none']}
          onClick={onOpen}
        />
        <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              paddingX={10}
              borderBottomWidth='1px'
              alignContent='center'
              display='flex'
              justifyContent='space-between'
            >
              <Logo />
              <IconButton
                aria-label='Open Menu'
                size='md'
                icon={<CloseIcon />}
                onClick={onClose}
              />
            </DrawerHeader>
            <DrawerBody>
              <Stack
                align='center'
                direction='column'
                divider={<StackDivider />}
                marginTop='4'
                marginBottom='4'
                spacing='4'
              >
                <Menu closeOnSelect={true}>
                  <MenuButton>Categorias</MenuButton>
                  <MenuList>
                    {categoria.map((categoria) => (
                      <Link key={categoria.id} to={`/category/${categoria.id}`}>
                        {' '}
                        <MenuItemOption>
                          {categoria.descripcion}{' '}
                        </MenuItemOption>
                      </Link>
                    ))}
                  </MenuList>
                </Menu>
                <Link to='/'>Nosotros</Link>
                <Link to='/'>Contacto</Link>
                <Link to='/cart'>
                  <Cartwidget />
                </Link>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Stack>
    </>
  );
};

export default Navbar;
