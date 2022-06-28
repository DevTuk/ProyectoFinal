import { extendTheme, theme } from '@chakra-ui/react';

export default extendTheme({
  styles: {
    global: {
      'html, body': {
        height: '100%',
      },
      'body': {
        backgroundColor: 'yellow.100',
      },
    },
  },
  colors: {
    primary: {
      ...theme.colors.pink,
    },
  },
  
});