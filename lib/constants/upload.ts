import type { CustomRequestFileType } from "@/types/custom-requests";

export const customRequestUploadConfig = {
  bucket: "custom-request-files",
  maxFileSizeBytes: 50 * 1024 * 1024,
  maxFiles: 8,
  allowedExtensions: ["stl", "obj", "3mf", "jpg", "png", "zip"] satisfies CustomRequestFileType[],
  allowedMimeTypes: [
    "model/stl",
    "application/octet-stream",
    "model/3mf",
    "application/zip",
    "application/x-zip-compressed",
    "image/jpeg",
    "image/png"
  ]
} as const;

export const productImageUploadConfig = {
  bucket: "product-images",
  maxFileSizeBytes: 5 * 1024 * 1024,
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"]
} as const;

export const productFileUploadConfig = {
  bucket: "product-files",
  maxFileSizeBytes: 50 * 1024 * 1024,
  allowedMimeTypes: ["model/stl", "application/octet-stream", "application/pdf", "image/jpeg", "image/png"]
} as const;
