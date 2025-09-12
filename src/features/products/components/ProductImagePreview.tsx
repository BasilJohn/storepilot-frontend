import { Box, Image, Text, VStack } from "@chakra-ui/react";

type Props = {
  imageUrl?: string;  // product main image (if any)
};

export default function ProductImagePreview({ imageUrl }: Props) {
  return (
    <VStack
      spacing={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      w="full"
      align="center"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Product Preview"
          boxSize="200px"
          objectFit="cover"
          borderRadius="md"
        />
      ) : (
        <Box
          boxSize="200px"
          bg="gray.100"
          border="1px dashed"
          borderColor="gray.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
        >
          <Text color="gray.500" fontSize="sm">
            No Image Selected
          </Text>
        </Box>
      )}
      <Text fontSize="sm" color="gray.600">
        Product Preview
      </Text>
    </VStack>
  );
}