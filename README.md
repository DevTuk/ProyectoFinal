# Artemi Ecommerce

Ecommerce de ropa de diseño independiente.

## Instalación Git Clone

Para realizar la clonacion del proyecto, ejecutar en la consola:

```bash
  git clone https://github.com/DevTuk/React-Js.git
```

Y ejecutar :

```bash
npm install --save firebase
npm start
```

## Desarrollado con

- React

## Demostracion del sitio

![Alt Text](./public/Artemi.gif)

## Dependencias NPM

- [React-router-dom](https://v5.reactrouter.com/web/guides/quick-start) - Routing en el browser.

- [Chakra UI](https://react-bootstrap.github.io) - Utilizado para maquetar y dar estilos al sitio.

- [React Hook Form](https://react-hook-form.com) - Utilizado para resolver el formulario de contacto - compra.

#### Colección products:

Documento: id generado automático

| CAMPO       | TIPO   | VALOR                          |
| ----------- | ------ | ------------------------------ |
| category    | string | categoría a la que pertenece   |
| descripcion | string | descripción del producto       |
| imagen      | string | ruta de la imagen del producto |
| nombre      | string | nombre del producto            |
| precio      | number | precio del producto            |
| stock       | number | cantidad en stock              |

## Análisis de los Componentes

Nuestro home muestra en forma de grilla todos los productos del sitio web. La ruta inicial es '/' e.

- ItemListContainer: Componente donde se muestran todos los productos y filtramos por categoria, agregamos un Spinner para mostrar cuando los productos se estar cargando.

- ItemList: Componente que nos permite traer todos los datos desde el componente Item a traves de un map.

- Item: Componente que se visualiza en cada card de producto donde aparecen los datos de cada producto. Ademas del Link para ir al detalle del mismo.

La ruta '/detail/:productId' nos permite ir al detalle del producto seleccionado en ItemListContainer. Donde podemos ver el nombre, precio, imagen, descripcion, su stock y la opción para agregarlo al carrito.

- ItemDetailContainer: Componente que usamos para filtrar por ID cada producto y desestructuramos su contenido para enviarlo a nuestro ItemListDetail donde desestructuramos su contenido para ser recibido en nuestro ItemDetail para ser mostrado al usuario.

- ItemDetailList: Componente que nos permite traer todos los datos desde el componente ItemDetail a traves de un map.

- ItemDetail: Componente encargado de mostrar los detalles del producto en pantalla, tiene incorporado el componente de ItemCount y una notificacion al agregar nuevo producto al carrito.

- ItemCount: Componente que contiene las funciones de ambos botones sumar o restar producto. Funciona según stock del producto seleccionado, el botón de agregar cantidad se bloquea al superar el stock máximo del producto y se vuelve a habilitar cuando la selección es menor al stock de cada producto. El botón de agregar al carrito entrega un mensaje de alerta de la cantidad de productos seleccionados y a su vez resetea el contador a cero.

En la pagina principal encontramos la Navbar la cual contiene el nombre del sitio, y las categorias de los productos.

- Navbar: Contiene el logo y se puede navegar por las distintas categorias de los productos, y contiene el CartWidget que a futuro nos mostrara la cantidad de productos agregados al carrito.

- CartWidget: Es el encargado de mostrar cuantos productos hay en el carrito. Si esta en 0 no se muestra.

- Loader: Componente del Loader es el encargado de renderizar nuestro spinner.

- Header: Componente que renderiza nuestro componente Nav

- Footer: Muestra un footer en el pie de nuestra página.

- CartContextProvider: Inyecta nuestras funciones para mantener el estado de compra en el carrito. AddItems, agrega el item seleccionado al carrito y comprueba por medio de isInCart si el item ya se encuentra en el carrito, si es verdadero solo suma la cantidad del mismo. removeItems elimina el item seleccionado del carrito de compras. removeCart vacía todo el carrito de compras. getQuantity recibe la cantidad de productos seleccionados. totalCart se encarga de sumar el total a pagar según la cantidad de productos agregados y el precio. addCantidad y removeCantidad se encargan de agregar o restar la cantidad de productos que ya estan en el carrito. Cada función relevante incluye un sessionStorage, para que al actualizar la página no se pierdan los datos del usuario.

-Formulario: En el formulario vamos a tomar los datos importantes del usuario para poder generar la orden de compra correspondiente. Tiene inputs requeridos, que si no estan llenos y corresponden al tipo de inputo el botón de enviar no va a estar disponible. Este botón tampoco va a estar disponible si el carrito esta vacio.

## Utilización de Firebase

Deberías completar con tus datos de API siguiendo el ejemplo de variables de entorno para conectar tu proyecto con firestore respetando los datos de la colección de productos detallada más arriba.

- REACT_APP_apiKey=
- REACT_APP_authDomain=
- REACT_APP_projectId=
- REACT_APP_storageBucket=
- REACT_APP_messagingSenderId=
- REACT_APP_appId=

## Deploy de la APP

- [Artemi](https://artemi-final.netlify.app/)

## Autor

- Diego Barros Sofio
