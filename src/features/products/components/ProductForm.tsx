"use client";

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
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateProduct } from "../hooks/useCreateProduct";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("1 lb");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"in_stock" | "out_of_stock">("in_stock");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData: {
      name: string;
      price: number;
      description: string;
      unit: string;
      status: "in_stock" | "out_of_stock"; // ✅ precise type
      imageUrl: string;
    } = {
      name,
      price: parseFloat(price),
      description,
      unit,
      status,
      imageUrl: "https://cdn.example.com/carrot.png", // hardcoded for now
    };

    createProduct(productData);
  };

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>
        Add New Product
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Product Name:</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Green Mango"
            />
          </FormControl>

          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Price ($):</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="3.99"
                min="0"
                step="0.01"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Unit:</FormLabel>
              <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="1 lb">1 lb</option>
                <option value="1 pc">1 pc</option>
                <option value="1 bag">1 bag</option>
              </Select>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel>Description:</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes..."
            />
          </FormControl>

          <FormControl>
            <FormLabel>Product Image:</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <Image src={preview} boxSize="120px" mt={2} />}
          </FormControl>

          <FormControl>
            <FormLabel>Status:</FormLabel>
            <Select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "in_stock" | "out_of_stock")
              }
            >
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={4} isLoading={isPending}>
            Save Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
