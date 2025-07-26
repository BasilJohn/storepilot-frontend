import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ProductForm() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Product Name:</FormLabel>
          <Input placeholder="e.g. Green Mango" />
        </FormControl>

        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Price ($):</FormLabel>
            <Input type="number" placeholder="3.99" />
          </FormControl>

          <FormControl>
            <FormLabel>Unit:</FormLabel>
            <Select defaultValue="1 lb">
              <option value="1 lb">1 lb</option>
              <option value="1 pc">1 pc</option>
              <option value="1 bag">1 bag</option>
            </Select>
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Description:</FormLabel>
          <Textarea placeholder="Optional notes..." />
        </FormControl>

        <FormControl>
          <FormLabel>Product Image:</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <Image src={preview} boxSize="120px" mt={2} />}
        </FormControl>

        <FormControl>
          <FormLabel>Status:</FormLabel>
          <Select defaultValue="in_stock">
            <option value="in_stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </Select>
        </FormControl>

        <Button colorScheme="blue" mt={4}>
          Save Product
        </Button>
      </VStack>
    </Box>
  );
}