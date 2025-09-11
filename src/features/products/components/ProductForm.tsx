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
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCreateProduct, useGetProductById, useUpdateProduct, useSaveProduct } from "../hooks/useProducts"; 


export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("1 lb");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"in_stock" | "out_of_stock">("in_stock");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const { id } = router.query;

  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: product, isLoading, isError } = useGetProductById();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: saveProduct, isPending: isSaving } = useSaveProduct();

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price?.toString() || "");
      setUnit(product.unit || "1 lb");
      setDescription(product.description || "");
      setStatus(product.status === "out_of_stock" ? "out_of_stock" : "in_stock");
      // If product has an image URL, use it for preview
      // if (product.imageUrl) {
      //   setPreview(product.imageUrl);
      // }
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProduct({ file: image, productId: id as string, name, description, price:parseFloat(price), status, imageUrl:preview || "", unit });
  };

  if (isLoading || isUpdating) return <Spinner />;
  if (isError) return <p>Error loading product</p>;

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>
        {id ? "Edit Product" : "Add New Product"}
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
            {id ? "Update Product" : "Save Product"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
