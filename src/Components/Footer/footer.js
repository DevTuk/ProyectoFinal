import { Center, Stack, Text } from '@chakra-ui/react';
const Footer = () => {
  return (
    <>
      <Stack
        height='10vh'
        marginTop='50vh'
        backgroundColor='white'
        roundedTop={24}
        minWidth='sm'
        position='fixed'
        bottom='0px'
        width='100%'
        shadow='md'
      >
        <Center marginTop='4vh'>
          <Text>© 2022 Copyright | Diego Barros Sofio | Com31190 React JS</Text>
        </Center>
      </Stack>
    </>
  );
};
export default Footer;
