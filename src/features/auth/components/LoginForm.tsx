"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { login } from "../api/login";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toast = useToast();
  const router = useRouter();

  type LoginResponse = {
    token: string;
    // add other properties if needed
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = (await login({ email, password })) as LoginResponse;

      // store token or user
      localStorage.setItem("accessToken", res?.token);

      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // redirect to dashboard or home
      router.push("/dashboard");
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message || "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        rounded="lg"
        bg="white"
        boxShadow="lg"
        p={10}
        w={{ base: "90%", md: "450px" }}
      >
        <Stack spacing={4} textAlign="center" mb={6}>
          <Flex justify="center" mb={4}>
            <Icon as={FiShoppingCart} boxSize={8} />
          </Flex>{" "}
          <Heading fontSize="2xl">Store Pilot Admin</Heading>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Flex justify="space-between" align="center">
              <Checkbox colorScheme="blue">Remember me</Checkbox>
              <Link color="blue.500" fontSize="sm">
                Forgot password?
              </Link>
            </Flex>

            <Button type="submit" colorScheme="blue" w="full">
              Login
            </Button>

            {error && (
              <Text color="red.500" fontSize="sm" textAlign="center">
                {error}
              </Text>
            )}
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
