import {
  Text,
  Box,
  Image,
  AspectRatio,
  Stack,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { transform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Items = ({ id, nombre, imagen, precio }) => {
  return (
    <Stack marginBottom={24}>
      <Box
        background='#ffffff'
        margin={5}
        marginY={8}
        width='80%'
        overflow='hidden'
        textAlign='center'
        //bgGradient='linear(to-b, green.300, white)'
        fontWeight='bold'
        rounded={24}
        shadow='md'
        transition='all 0.1s'
        onMouseOver={() => transform}
        _hover={{ transform: 'scale(1.01,1.01)', shadow: 'xl' }}
      >
        <AspectRatio ratio={3 / 4}>
          <Image
            src={imagen}
            alt={nombre}
            draggable='false'
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
            roundedBottom={24}
            shadow='md'
          />
        </AspectRatio>

        <Box padding={4} paddingBottom={6} textAlign='center' color='gray.800'>
          <Text fontWeight='bold' fontSize='xl' color='gray.800'>
            {nombre}
          </Text>
          <Text fontSize='md' marginBottom={3} color='gray.800'>
            {precio}
          </Text>
        </Box>

        <Link to={`/detail/${id}`}>
          <Box
            fontSize='sm'
            width='100%'
            size='md'
            height={10}
            padding={2}
            color='gray.800'
            backgroundColor='#C5CAFF'
          >
            Ver detalles
          </Box>
        </Link>
      </Box>
    </Stack>
  );
};

export default Items;
