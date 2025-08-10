"use client";

import React from "react";
import {
  Box,
  Heading,
  HStack,
  Stack,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Button,
  Tag,
  Text,
  IconButton,
  Card,
  CardBody,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { FiSearch, FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Order = {
  id: number;
  customerName: string;
  items: number;
  amount: number; // in dollars
};

const mockOrders: Order[] = [
  { id: 1234, customerName: "John DoDoe", items: 3, amount: 8.97 },
  { id: 1233, customerName: "Jane Smith", items: 2, amount: 5.99 },
];

export default function OrdersContent() {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("white", "gray.800");

  // wire these up to your data layer / react-query later
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<string>("");

  const orders = mockOrders.filter((o) =>
    o.customerName.toLowerCase().includes(query.toLowerCase())
  );

  return (
      <Box p={8}>
          <Heading size="lg" mb={6}>
            Upload Flyer
          </Heading>
      {/* Search + Sort */}
      <HStack spacing={3} mb={6} align="stretch">
        <InputGroup maxW="360px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            bg={inputBg}
            placeholder="Search orders"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            borderRadius="md"
          />
        </InputGroup>

        <Select
          maxW="200px"
          placeholder="Sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          bg={inputBg}
          borderRadius="md"
        >
          <option value="latest">Latest</option>
          <option value="amount_desc">Amount: High → Low</option>
          <option value="amount_asc">Amount: Low → High</option>
        </Select>
      </HStack>

      {/* Orders Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
        {orders.map((order) => (
          <Card key={order.id} bg={cardBg} borderWidth="1px" borderColor={border} shadow="sm">
            <CardBody>
              <Stack spacing={3}>
                <Tag w="fit-content" variant="subtle" colorScheme="gray">
                  #{order.id}
                </Tag>

                <Heading size="md">{order.customerName}</Heading>

                <HStack color="gray.600" fontSize="sm" spacing={2}>
                  <Icon as={FiShoppingCart} />
                  <Text>
                    {order.items} {order.items === 1 ? "item" : "items"} • ${order.amount.toFixed(2)}
                  </Text>
                </HStack>

                <HStack pt={1} spacing={2}>
                  <Button
                    colorScheme="green"
                    leftIcon={<Text as="span">✅</Text>}
                    onClick={() => console.log("mark ready", order.id)}
                  >
                    Mark Ready
                  </Button>
                  <Button variant="outline" onClick={() => console.log("view", order.id)}>
                    View
                  </Button>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Pagination */}
      <HStack justify="center" spacing={4} mt={6}>
        <IconButton
          aria-label="Previous page"
          icon={<FiChevronLeft />}
          variant="outline"
        />
        <HStack spacing={3}>
          <Button variant="ghost" isDisabled>
            1
          </Button>
          <Button variant="ghost">2</Button>
        </HStack>
        <IconButton
          aria-label="Next page"
          icon={<FiChevronRight />}
          variant="outline"
        />
      </HStack>
    </Box>
  );
}