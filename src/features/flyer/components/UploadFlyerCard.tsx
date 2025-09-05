"use client";
import React, { useEffect } from "react";
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
  Select,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useGetActiveFlyerData, useSaveFlyer } from "../hooks/useUploadFlyer";
import { FlyerStatus } from "../types";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED = ["application/pdf", "image/png", "image/jpeg", "image/webp"];

export default function UploadFlyerCard() {
  const toast = useToast();
  const fileInput = React.useRef<HTMLInputElement | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [drag, setDrag] = React.useState(false);

  const [status, setStatus] = React.useState<
    "draft" | "published" | "archived"
  >("published");
  const [isActiveState, setIsActiveState] = React.useState(true);

  const { data: flyer, isLoading: isLoadingFlyers } = useGetActiveFlyerData();

  const { mutate: saveFlyer, isPending, error } = useSaveFlyer();

useEffect(
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

  useEffect(()=>{
    if(flyer?.status){
      setStatus(flyer?.status);
    }
  },[flyer])
  
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

            <Button
              variant="outline"
              onClick={() => fileInput.current?.click()}
            >
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
              ) : flyer?.media?.url ? (
                <Image
                  src={flyer?.media?.url}
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
                //colorScheme={flyer?.isActive ?? true ? "green" : "gray"}
                rounded="full"
                px={3}
                py={1}
              >
                <HStack spacing={1}>
                  <CheckIcon />
                  <Text fontWeight="medium">
                    Status:{" "}
                    {/* {flyer?.isActive ?? true ? "Flyer Active" : "Inactive"} */}
                  </Text>
                </HStack>
              </Badge>
            </HStack>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              w="full"
              maxW="xl"
            >
              <FormControl maxW="xs">
                <FormLabel>Flyer Status</FormLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as FlyerStatus)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </Select>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Active</FormLabel>
                <Switch
                  isChecked={isActiveState}
                  onChange={(e) => setIsActiveState(e.target.checked)}
                />
              </FormControl>
            </Stack>
            <Button
              colorScheme="purple"
              w="56"
              isDisabled={!file}
              isLoading={isPending}
              onClick={() =>
                saveFlyer({
                  file,
                  title: "Weekly Flyer",
                  weekLabel: "Week 1",
                  startsAt: new Date(),
                  endsAt: new Date(),
                  visibility: "private",
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
