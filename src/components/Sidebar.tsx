"use client";

import {
  Box,
  VStack,
  Icon,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiHome, FiBox, FiFileText, FiGrid } from "react-icons/fi";
import NextLink from "next/link";

const menuItems = [
  { label: "Dashboard", icon: FiHome, path: "/dashboard" },
  { label: "Products", icon: FiBox, path: "/products" },
  { label: "Orders", icon: FiFileText, path: "/orders" },
  { label: "Flyers", icon: FiGrid, path: "/flyer" },
];

export default function Sidebar() {
  return (
    <Box
      w="64"
      bg="gray.800"
      color="white"
      p={4}
      minH="100vh"
      position="sticky"
      top="0"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        🛒 StorePilot
      </Text>
      <VStack align="stretch" spacing={4}>
        {menuItems.map((item) => (
          <ChakraLink
            key={item.label}
            as={NextLink}
            href={item.path}
            display="flex"
            alignItems="center"
            px={3}
            py={2}
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
          >
            <Icon as={item.icon} mr={3} />
            <Text>{item.label}</Text>
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
}