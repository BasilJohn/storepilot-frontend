// layout/AdminLayout.tsx
import { Box, Flex } from "@chakra-ui/react";
// Update the import path below if Sidebar is in 'src/components/Sidebar.tsx'
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar />
      <Box flex="1">
        <TopBar />
        <Box p={6}>{children}</Box>
      </Box>
    </Flex>
  );
}