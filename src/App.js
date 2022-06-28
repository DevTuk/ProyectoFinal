import { ChakraProvider } from '@chakra-ui/react';
import Header from './Components/Header/Header';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import Footer from './Components/Footer/footer';
import ItemDetailContainer from './Components/ItemDetailContainer/itemDetailContainer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Cart from './Components/Cart/Cart';
import { CartContextProvider } from './Context/CartContext';
import Formulario from './Components/Formulario/Formulario';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CartContextProvider>
        <BrowserRouter marginBotton='500px'>
          <Header />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route
              path='/category/:categoryId'
              element={<ItemListContainer />}
            />
            <Route path='/detail/:prodId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/Formulario' element={<Formulario />} />
            <Route path='*' element={<h1>Página no encontrada</h1>} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </CartContextProvider>
    </ChakraProvider>
  );
}
export default App;
