import { Spinner } from '@chakra-ui/react';

export const Loader = () => {
  return (
    <Spinner
      h='80px'
      w='80px'
      mt='10%'
      mb='30%'
      ml='50%'
      mr='auto'
      bgGradient={[
        'linear(to-tr, teal.300, green.300)',
        'linear(to-t, #C5CAFF, #C5CAFF)',
        'linear(to-b, orange.100, purple.300)',
      ]}
      size={'xl'}
    />
  );
};
