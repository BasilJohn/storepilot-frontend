import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Icon,
  Stack,
  Center,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { useRouter } from "next/router";
import { useProducts } from "../hooks/useProducts";

const mockProducts: Product[] = [
  { id: "1", name: "Green Mango (1 lb)", price: 3.99, emoji: "🥭" },
  { id: "2", name: "Tomato (1 lb)", price: 0.99, emoji: "🍅" },
  { id: "3", name: "Indian Carrots (1 lb)", price: 3.99, emoji: "🥕" },
];

export default function ProductsPage() {
  const router = useRouter();

  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <Center minH="200px">
        <Spinner size="lg" />
      </Center>
    );
  }
  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading products
      </Alert>
    );
  }

  if (products?.length === 0 && !isLoading) {
    return (
      <Center py={10}>
        <Heading size="md">No products found</Heading>
      </Center>
    );
  }

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>
        Manage Products
      </Heading>

      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mb={6}
      >
        <InputGroup maxW="md">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} />
          </InputLeftElement>
          <Input type="text" placeholder="Search" />
        </InputGroup>
        <Button
          onClick={() => router.push("/products/add")}
          leftIcon={<FiPlus />}
          colorScheme="blue"
        >
          Add New Product
        </Button>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => console.log("Edit", product.id)}
            onDelete={() => console.log("Delete", product.id)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
