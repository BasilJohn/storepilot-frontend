"use client";
import React from "react";
import {
  Button,
  Box,
  CardBody,
  Card,
  Center,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  Badge,
  Alert,
  AlertIcon,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useFlyerStatus, useUploadFlyer } from "../hooks/useUploadFlyer";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED = ["application/pdf", "image/png", "image/jpeg", "image/webp"];

export default function UploadFlyerCard() {
  const toast = useToast();
  const fileInput = React.useRef<HTMLInputElement | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [drag, setDrag] = React.useState(false);

  const { data: status } = useFlyerStatus();
  const { mutate: doUpload, isPending, error } = useUploadFlyer();

  React.useEffect(
    () => () => preview && URL.revokeObjectURL(preview),
    [preview]
  );

  function validate(f: File) {
    if (!ACCEPTED.includes(f.type))
      return "Only PDF or image files (PNG/JPG/WEBP) are allowed.";
    if (f.size > MAX_SIZE) return "Max size is 10MB.";
    return null;
  }

  function setPicked(f?: File) {
    if (!f) return;
    const msg = validate(f);
    if (msg) return toast({ status: "error", title: msg });
    setFile(f);
    setPreview(f.type.startsWith("image/") ? URL.createObjectURL(f) : null);
  }

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>
        Upload Flyer
      </Heading>
     <Card>
      <CardBody>
        <Stack align="center" spacing={4} maxW="xl" mx="auto">
          <Input
            ref={fileInput}
            type="file"
            display="none"
            accept={ACCEPTED.join(",")}
            onChange={(e) => setPicked(e.target.files?.[0] ?? undefined)}
          />

          <Button variant="outline" onClick={() => fileInput.current?.click()}>
            Choose File
          </Button>

          <Box
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              setPicked(e.dataTransfer.files?.[0]);
            }}
            borderWidth="1px"
            borderStyle={drag ? "dashed" : "solid"}
            borderColor={drag ? "purple.400" : "gray.200"}
            rounded="xl"
            p={4}
          >
            {file ? (
              preview ? (
                <Image
                  src={preview}
                  alt={file.name}
                  boxSize="160px"
                  objectFit="cover"
                  rounded="lg"
                />
              ) : (
                <Center bg="yellow.50" rounded="lg" boxSize="160px">
                  <Text fontWeight="semibold">PDF</Text>
                </Center>
              )
            ) : status?.url ? (
              <Image
                src={status.url}
                alt="Current flyer"
                boxSize="160px"
                objectFit="cover"
                rounded="lg"
              />
            ) : (
              <Center bg="orange.50" rounded="lg" boxSize="160px">
                <Box w="48px" h="48px" bg="orange.300" rounded="md" />
              </Center>
            )}
          </Box>

          <HStack>
            <Badge
              colorScheme={status?.active ?? true ? "green" : "gray"}
              rounded="full"
              px={3}
              py={1}
            >
              <HStack spacing={1}>
                <CheckIcon />
                <Text fontWeight="medium">
                  Status: {status?.active ?? true ? "Flyer Active" : "Inactive"}
                </Text>
              </HStack>
            </Badge>
          </HStack>

          <Button
            colorScheme="purple"
            w="56"
            isDisabled={!file}
            isLoading={isPending}
            onClick={() =>
              file &&
              doUpload(file, {
                onSuccess: () => {
                  toast({
                    status: "success",
                    title: "Flyer updated successfully",
                  });
                  setFile(null);
                  setPreview(null);
                  if (fileInput.current) fileInput.current.value = "";
                },
              })
            }
          >
            Update Flyer
          </Button>

          {error && (
            <Alert status="error" rounded="lg">
              <AlertIcon />
              {error.message}
            </Alert>
          )}
        </Stack>
      </CardBody>
      </Card>
    </Box>
  );
}
