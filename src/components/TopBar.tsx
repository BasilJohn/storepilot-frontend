// components/TopBar.tsx
import { Box, Flex, Spacer, IconButton } from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

export default function TopBar() {
  return (
    <Flex
      as="header"
      bg="white"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor="gray.200"
      align="center"
    >
      <Box fontSize="xl" fontWeight="semibold">S&T Groceries</Box>
      <Spacer />
      <IconButton
        icon={<FiBell />}
        aria-label="Notifications"
        variant="ghost"
      />
    </Flex>
  );
}