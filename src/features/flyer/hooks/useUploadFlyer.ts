import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFlyerStatus,
  updateFlyer,
  getAllFlyers,
  createFlyer,
  createMediaUpload,
  markMediaUploaded,
  getFlyerWithUrl
} from "../api/flyer";
import type { Flyer, FlyerStatus,FlyerWithUrl,SaveOrUpdateInput } from "../types";
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

export function useSaveFlyer() {
  const toast = useToast();
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    // 👇 the whole upload + create/update pipeline
    mutationFn: async (input: SaveOrUpdateInput) => {
      const { file, title, weekLabel, startsAt, endsAt, visibility = "private" } = input;
      // 1) Ask backend for presigned PUT
      const ext = (file.name.match(/\.\w+$/)?.[0] || "").toLowerCase();
      const { uploadUrl, media } = await createMediaUpload({
        contentType: file.type,
        ext,
        visibility,
        folder: "flyers",
        originalFileName: file.name,
      });

      // 2) Upload binary directly to S3/MinIO (IMPORTANT: use fetch with Content-Type)
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) {
        const text = await putRes.text().catch(() => "");
        throw new Error(`Upload failed (${putRes.status}) ${text}`);
      }

      // 3) (optional) mark media uploaded with size
      await markMediaUploaded(media.id, file.size);

      // 4) Create or update the flyer that references mediaId
      if (input.flyerId) {
        return await updateFlyer(input.flyerId, {
          title,
          mediaId: media.id,
          weekLabel,
          startsAt,
          endsAt,
          status: "published",
        });
      } else {
        return await createFlyer({
          title,
          mediaId: media.id,
          weekLabel,
          startsAt,
          endsAt,
          status: "published",
        });
      }
    },

    onSuccess: (_data, variables) => {
      toast({
        title: variables.flyerId ? "Flyer updated" : "Flyer created",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      // refresh lists that show flyers
      qc.invalidateQueries({ queryKey: FLYER_KEYS.flyers });
      router.push("/flyer");
    },

    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save flyer";
      toast({ title: "Error", description: msg, status: "error", duration: 3500, isClosable: true });
    },
  });
}

export const useGetActiveFlyerData = () => {
  return useQuery<FlyerWithUrl>({
    queryKey: FLYER_KEYS.flyers,
    queryFn: getFlyerWithUrl,
  });
};