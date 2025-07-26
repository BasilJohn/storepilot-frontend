// src/features/auth/pages/login.tsx
"use client";

import { Box, Center, Flex } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.50">
      <Box w="full" maxW="md" p={6} boxShadow="lg" bg="white" borderRadius="md">
        <LoginForm />
      </Box>
    </Flex>
  );
}