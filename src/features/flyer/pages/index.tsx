import React from "react";
import { Box, Flex, Spacer, Text, Button, Card, CardBody, Stack } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import UploadFlyerCard from "../components/UploadFlyerCard";

export default function FlyerPage() {
  return (
        <Box flex={1}>
          <UploadFlyerCard />
        </Box>
  );
}