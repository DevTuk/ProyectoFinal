import { useState, createContext } from 'react';
import { useToast } from '@chakra-ui/react';
const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(sessionStorage.getItem('cart')) || []
  );
  const toast = useToast();
  const addItem = (productToAdd) => {
    if (!isInCart(productToAdd.id)) {
      setCart([...cart, productToAdd]);
      sessionStorage.setItem('cart', JSON.stringify([...cart, productToAdd]));
    } else {
      const productInCart = cart.find(
        (product) => product.id === productToAdd.id
      );
      productInCart.cantidad += productToAdd.cantidad;
      setCart([...cart]);
      sessionStorage.setItem('cart', JSON.stringify([...cart, productToAdd]));
    }
  };
  const isInCart = (id) => {
    return cart.some((product) => product.id === id);
  };

  const removeItems = (id) => {
    setCart(cart.filter((product) => product.id !== id));
    sessionStorage.setItem(
      'cart',
      JSON.stringify(cart.filter((product) => product.id !== id))
    );
  };
  const removeCart = () => {
    setCart([]);
    sessionStorage.removeItem('cart', JSON.stringify([]));
  };
  const getProduct = (id) => {
    return cart.find((prod) => prod.id === id);
  };

  const getQuantity = () => {
    let acumulador = 0;
    cart.forEach((productToAdd) => {
      acumulador += productToAdd.cantidad;
    });
    return acumulador;
  };

  const addCantidad = (id) => {
    cart.forEach((product) => {
      if (product.id === id && product.cantidad < product.stock) {
        product.cantidad += 1;
      } else if (product.cantidad === product.stock) {
        toast({
          title: '',
          description: 'Ya seleccionaste el máximo de stock',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }
    });
    setCart([...cart]);
    sessionStorage.setItem('cart', JSON.stringify([...cart]));
  };
  const removeCantidad = (id) => {
    cart.forEach((product) => {
      if (product.id === id && product.cantidad > 1) {
        product.cantidad -= 1;
      }
    });
    setCart([...cart]);
    sessionStorage.setItem('cart', JSON.stringify([...cart]));
  };

  const totalCart = () => {
    let acumulador = 0;
    cart.forEach((productToAdd) => {
      const precio = Number(productToAdd.precio.replace('$', ''));
      acumulador += precio * productToAdd.cantidad;
    });
    return '$' + acumulador;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCantidad,
        removeCantidad,
        addItem,
        isInCart,
        getQuantity,
        removeItems,
        totalCart,
        removeCart,
        getProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
