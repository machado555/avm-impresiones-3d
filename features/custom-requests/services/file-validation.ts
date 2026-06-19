import { customRequestUploadConfig } from "@/lib/constants/upload";
import type { CustomRequestFileType } from "@/types/custom-requests";

export function getFileExtension(fileName: string): CustomRequestFileType | null {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) {
    return null;
  }

  return customRequestUploadConfig.allowedExtensions.includes(extension as CustomRequestFileType)
    ? (extension as CustomRequestFileType)
    : null;
}

export function validateCustomRequestFile(file: File) {
  const extension = getFileExtension(file.name);

  if (!extension) {
    return { ok: false as const, message: "Tipo de archivo no permitido." };
  }

  if (file.size > customRequestUploadConfig.maxFileSizeBytes) {
    return { ok: false as const, message: "El archivo supera el tamano maximo permitido." };
  }

  return { ok: true as const, extension };
}

export function createSafeFileName(fileName: string) {
  const normalized = fileName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalized.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}
