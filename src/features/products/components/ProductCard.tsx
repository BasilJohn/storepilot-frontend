import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
import { Product } from "../types";
import { useEffect, useRef, useState } from "react";
import { useDeleteProduct } from "../hooks/useProducts";
import { useRouter } from "next/router";

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: () => void; // Trigger refetch or UI update
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(product.id, {
      onSuccess: () => {
        toast({
          title: "Product deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onDelete(); // Refetch or remove locally
        onClose();
      },
      onError: () => {
        toast({
          title: "Failed to delete product.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  const handleEdit = () => {
    router.push(`/products/${product.id}`);
    onEdit();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box p={4} borderWidth={1} borderRadius="md" textAlign="center">
      {/* {isClient && <Text fontSize="4xl">{product.emoji}</Text>} */}
      <Text fontWeight="medium" mt={2}>
        {product.name}
      </Text>
      <Image
        src={product.imageUrl}
        alt={product.name}
        boxSize="120px"
        objectFit="cover"
        mx="auto"
        mb={3}
        borderRadius="md"
      />
      <Text mb={4}>${product.price.toFixed(2)}</Text>
      <Flex justify="center" gap={2}>
        <Button size="sm" colorScheme="blue" onClick={handleEdit}>
          Edit
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          variant="outline"
          onClick={onOpen} // ✅ opens modal
        >
          Delete
        </Button>
      </Flex>

      {/* ✅ Confirmation Modal */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Product</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete <strong>{product.name}</strong>?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={isPending}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
