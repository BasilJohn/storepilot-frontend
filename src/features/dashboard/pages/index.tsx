import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FiBarChart2,
  FiBox,
  FiFileText,
  FiPlus,
  FiShoppingBag,
  FiSmartphone,
} from "react-icons/fi";

export default function DashboardPage() {
  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>
        Dashoard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <StatCard icon={FiBarChart2} label="Orders (Today)" value="5 new" />
        <StatCard icon={FiBox} label="Products" value="150 items" />
        <StatCard
          icon={FiFileText}
          label="Weekly Flyer"
          value="Active"
          valueColor="green.500"
        />
      </SimpleGrid>

      <Stack spacing={4}>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          size="md"
          width="fit-content"
        >
          Upload New Flyer
        </Button>
        <ActionButton icon={FiShoppingBag} label="Manage Products" />
        <ActionButton icon={FiBarChart2} label="View Orders" />
        <ActionButton icon={FiSmartphone} label="Send Push Notifications" />
      </Stack>
    </Box>
  );
}

function StatCard({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: any;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <Flex
      direction="column"
      align="center"
      p={6}
      rounded="md"
      shadow="sm"
      bg="white"
    >
      <Icon as={icon} boxSize={6} mb={2} color="blue.500" />
      <Text fontWeight="medium">{label}</Text>
      <Text fontSize="sm" color={valueColor || "gray.600"}>
        {value}
      </Text>
    </Flex>
  );
}

function ActionButton({ icon, label }: { icon: any; label: string }) {
  return (
    <Button
      variant="outline"
      leftIcon={<Icon as={icon} />}
      size="md"
      justifyContent="start"
    >
      {label}
    </Button>
  );
}
