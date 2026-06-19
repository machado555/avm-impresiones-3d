"use server";

import { createCustomRequestEvent } from "@/features/custom-requests/services/request-events";
import { createSafeFileName, validateCustomRequestFile } from "@/features/custom-requests/services/file-validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CustomRequestUploadedBy } from "@/types/custom-requests";

type AttachCustomRequestFilesInput = {
  requestId: string;
  requestNumber: string;
  files: File[];
  uploadedBy: CustomRequestUploadedBy;
  actorId?: string | null;
  isQuoteFile?: boolean;
};

export async function attachCustomRequestFiles({
  requestId,
  requestNumber,
  files,
  uploadedBy,
  actorId = null,
  isQuoteFile = false
}: AttachCustomRequestFilesInput) {
  const supabase = await createSupabaseServerClient();
  const bucket = isQuoteFile ? "quote-files" : "custom-request-files";
  const rows = [];

  for (const file of files) {
    const validation = validateCustomRequestFile(file);

    if (!validation.ok) {
      continue;
    }

    const safeFileName = createSafeFileName(file.name);
    const filePath = `${requestNumber}/${Date.now()}-${safeFileName}`;
    const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
      upsert: false
    });

    if (!error) {
      rows.push({
        request_id: requestId,
        file_name: safeFileName,
        file_path: filePath,
        file_type: validation.extension,
        file_size: file.size,
        is_quote_file: isQuoteFile,
        uploaded_by: uploadedBy
      });
    }
  }

  if (rows.length > 0) {
    await supabase.from("custom_request_files").insert(rows);
    await createCustomRequestEvent({
      requestId,
      event: "files_attached",
      actorType: uploadedBy === "admin" ? "admin" : uploadedBy,
      actorId,
      metadata: { count: rows.length, bucket }
    });
  }

  return { ok: true, attached: rows.length };
}
