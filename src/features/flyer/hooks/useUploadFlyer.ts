import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFlyerStatus, uploadFlyer } from "../api/flyer";
import type { FlyerStatus, UploadFlyerResponse } from "../types";

export const FLYER_KEYS = {
  status: ["flyer", "status"] as const,
};

export function useFlyerStatus() {
  return useQuery<FlyerStatus>({
    queryKey: FLYER_KEYS.status,
    queryFn: getFlyerStatus,
    staleTime: 60_000,
  });
}

export function useUploadFlyer() {
  const qc = useQueryClient();
  return useMutation<UploadFlyerResponse, Error, File>({
    mutationFn: uploadFlyer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: FLYER_KEYS.status });
    },
  });
}