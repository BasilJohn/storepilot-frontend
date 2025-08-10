import React from "react";
import { Box } from "@chakra-ui/react";
import OrdersContent from "../components/OrdersContent";

export default function OrdersPage() {
  return (
        <Box flex={1}>
          <OrdersContent />
        </Box>
  );
}