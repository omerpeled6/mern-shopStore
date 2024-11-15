import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct);
    console.log('message - ', message);
    console.log('success - ', success);
    if (!success) {
      toast({
        title: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({ name: '', price: '', image: '' });
    }
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create a new product
          <Box
            marginTop={4}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            p={6}
            rounded={'lg'}
            shadow={'md'}
          >
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Pice"
                name="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
              <Button colorScheme="blue" onClick={handleAddProduct} w={'full'}>
                Create
              </Button>
            </VStack>
          </Box>
        </Heading>
      </VStack>
    </Container>
  );
};

export default CreatePage;
