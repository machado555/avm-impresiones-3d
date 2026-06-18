export type CustomRequestType = "custom_model" | "existing_model_print" | "lithophane" | "replacement_part" | "other";
export type CustomRequestStatus =
  | "received"
  | "pending"
  | "reviewing"
  | "quoted"
  | "approved"
  | "printing"
  | "ready"
  | "delivered"
  | "rejected"
  | "cancelled";

export type CustomRequestPriority = "normal" | "urgent";
export type CustomRequestFileType = "stl" | "obj" | "3mf" | "jpg" | "png" | "zip";
export type CustomRequestActorType = "guest" | "customer" | "system" | "admin";
export type CustomRequestUploadedBy = "guest" | "customer" | "admin";

export type CustomRequest = {
  id: string;
  userId: string | null;
  requestNumber: string;
  status: CustomRequestStatus;
  contactName: string;
  contactEmail: string;
  contactPhone: string | null;
  requestType: CustomRequestType;
  priority: CustomRequestPriority;
  projectName: string;
  description: string;
  quantity: number;
  material: string | null;
  color: string | null;
  quality: string | null;
  estimatedSize: string | null;
  estimatedPrice: number | null;
  estimatedDate: string | null;
  notes: string | null;
  internalNotes?: string | null;
  isUrgent?: boolean;
  quotedAt: string | null;
  approvedAt: string | null;
  lastStatusChangeAt?: string | null;
  termsAccepted?: boolean;
  termsAcceptedAt?: string | null;
  privacyAccepted?: boolean;
  privacyAcceptedAt?: string | null;
  fileOwnershipAccepted?: boolean;
  fileOwnershipAcceptedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  files?: CustomRequestFile[];
};

export type CustomRequestFile = {
  id: string;
  requestId: string;
  fileName: string;
  filePath: string;
  fileType: CustomRequestFileType;
  fileSize: number | null;
  isQuoteFile: boolean;
  uploadedBy: CustomRequestUploadedBy;
  createdAt: string;
};

export type CustomRequestEvent = {
  id: string;
  requestId: string;
  event: string;
  metadata: Record<string, unknown>;
  actorType: CustomRequestActorType;
  actorId: string | null;
  createdAt: string;
};

export type CustomRequestQuote = {
  id: string;
  requestId: string;
  material: string;
  estimatedWeightGrams: number;
  estimatedPrintTimeMinutes: number;
  materialCost: number;
  laborCost: number;
  machineCost: number;
  marginPercentage: number;
  subtotal: number;
  finalPrice: number;
  currency: string;
  version: number;
  isActive: boolean;
  validUntil: string | null;
  sentAt: string | null;
  acceptedAt: string | null;
  rejectedAt: string | null;
  notes: string | null;
  createdBy: string | null;
  createdAt: string;
};

export type PrintMaterial = {
  id: string;
  name: string;
  slug: string;
  type: "PLA" | "PETG" | "ABS" | "TPU" | "Resin" | "Other";
  costPerGram: number;
  pricePerGram: number;
  defaultMarginPercentage: number;
  colorOptions: string[];
  isActive: boolean;
};

export type QuoteInput = {
  materialId: string;
  estimatedWeightGrams: number;
  estimatedPrintTimeMinutes: number;
  laborMinutes: number;
};

export type QuoteResult = {
  materialCost: number;
  machineCost: number;
  laborCost: number;
  marginAmount: number;
  finalPrice: number;
};
