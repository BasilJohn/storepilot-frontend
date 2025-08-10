import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFlyerStatus,
  updateFlyer,
  getAllFlyers,
  createFlyer,
} from "../api/flyer";
import type { Flyer, FlyerStatus } from "../types";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const FLYER_KEYS = {
  status: ["flyer", "status"] as const,
  flyers: ["flyer"] as const,
};

export const useFlyers = () => {
  return useQuery<Flyer[]>({
    queryKey: FLYER_KEYS.flyers,
    queryFn: getAllFlyers,
  });
};

export function useFlyerStatus() {
  return useQuery<FlyerStatus>({
    queryKey: FLYER_KEYS.status,
    queryFn: getFlyerStatus,
    staleTime: 60_000,
  });
}

export const useSaveFlyer = (existingFlyerId?: string) => {
  const toast = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: Flyer) =>
      existingFlyerId
        ? updateFlyer(existingFlyerId, payload)
        : createFlyer(payload),
    onSuccess: () => {
      toast({
        title: existingFlyerId ? "Flyer updated" : "Flyer created",
        description: `The flyer was successfully ${
          existingFlyerId ? "updated" : "created"
        }.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/flyer");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to save flyer.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
};
