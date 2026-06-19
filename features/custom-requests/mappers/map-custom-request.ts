import type { CustomRequest, CustomRequestEvent, CustomRequestFile } from "@/types/custom-requests";

type CustomRequestRow = {
  id: string;
  user_id: string | null;
  request_number: string;
  status: CustomRequest["status"];
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  request_type: CustomRequest["requestType"];
  priority: CustomRequest["priority"];
  project_name: string;
  description: string;
  quantity: number;
  material: string | null;
  color: string | null;
  quality: string | null;
  estimated_size: string | null;
  estimated_price: number | null;
  estimated_date: string | null;
  notes: string | null;
  internal_notes?: string | null;
  is_urgent?: boolean;
  quoted_at: string | null;
  approved_at: string | null;
  last_status_change_at?: string | null;
  terms_accepted?: boolean;
  terms_accepted_at?: string | null;
  privacy_accepted?: boolean;
  privacy_accepted_at?: string | null;
  file_ownership_accepted?: boolean;
  file_ownership_accepted_at?: string | null;
  created_at: string;
  updated_at: string;
  custom_request_files?: CustomRequestFileRow[];
};

type CustomRequestFileRow = {
  id: string;
  request_id: string;
  file_name: string;
  file_path: string;
  file_type: CustomRequestFile["fileType"];
  file_size: number | null;
  is_quote_file: boolean;
  uploaded_by: CustomRequestFile["uploadedBy"];
  created_at: string;
};

type CustomRequestEventRow = {
  id: string;
  request_id: string;
  event: string;
  metadata: Record<string, unknown>;
  actor_type: CustomRequestEvent["actorType"];
  actor_id: string | null;
  created_at: string;
};

export function mapCustomRequest(row: CustomRequestRow): CustomRequest {
  return {
    id: row.id,
    userId: row.user_id,
    requestNumber: row.request_number,
    status: row.status,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    requestType: row.request_type,
    priority: row.priority,
    projectName: row.project_name,
    description: row.description,
    quantity: row.quantity,
    material: row.material,
    color: row.color,
    quality: row.quality,
    estimatedSize: row.estimated_size,
    estimatedPrice: row.estimated_price === null ? null : Number(row.estimated_price),
    estimatedDate: row.estimated_date,
    notes: row.notes,
    internalNotes: row.internal_notes ?? null,
    isUrgent: row.is_urgent ?? false,
    quotedAt: row.quoted_at,
    approvedAt: row.approved_at,
    lastStatusChangeAt: row.last_status_change_at ?? null,
    termsAccepted: row.terms_accepted ?? false,
    termsAcceptedAt: row.terms_accepted_at ?? null,
    privacyAccepted: row.privacy_accepted ?? false,
    privacyAcceptedAt: row.privacy_accepted_at ?? null,
    fileOwnershipAccepted: row.file_ownership_accepted ?? false,
    fileOwnershipAcceptedAt: row.file_ownership_accepted_at ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    files: (row.custom_request_files ?? []).map(mapCustomRequestFile)
  };
}

export function mapCustomRequestFile(row: CustomRequestFileRow): CustomRequestFile {
  return {
    id: row.id,
    requestId: row.request_id,
    fileName: row.file_name,
    filePath: row.file_path,
    fileType: row.file_type,
    fileSize: row.file_size,
    isQuoteFile: row.is_quote_file,
    uploadedBy: row.uploaded_by,
    createdAt: row.created_at
  };
}

export function mapCustomRequestEvent(row: CustomRequestEventRow): CustomRequestEvent {
  return {
    id: row.id,
    requestId: row.request_id,
    event: row.event,
    metadata: row.metadata,
    actorType: row.actor_type,
    actorId: row.actor_id,
    createdAt: row.created_at
  };
}
