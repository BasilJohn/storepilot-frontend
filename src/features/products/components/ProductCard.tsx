import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Product } from "../types";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box p={4} borderWidth={1} borderRadius="md" textAlign="center">
      {isClient && <Text fontSize="4xl">{product.emoji}</Text>}
      <Text fontWeight="medium" mt={2}>{product.name}</Text>
      <Text mb={4}>${product.price.toFixed(2)}</Text>
      <Flex justify="center" gap={2}>
        <Button size="sm" colorScheme="blue" onClick={onEdit}>Edit</Button>
        <Button size="sm" colorScheme="red" variant="outline" onClick={onDelete}>Delete</Button>
      </Flex>
    </Box>
  );
}