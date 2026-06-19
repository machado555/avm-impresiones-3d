import type { CustomRequestFile } from "@/types/custom-requests";

export function AdminRequestFiles({ files }: { files: CustomRequestFile[] }) {
  if (files.length === 0) {
    return <p className="text-sm text-slate-400">Sin archivos adjuntos.</p>;
  }

  return (
    <div className="grid gap-2">
      {files.map((file) => (
        <a
          key={file.id}
          href={`/api/admin/files?path=${encodeURIComponent(file.filePath)}&quote=${file.isQuoteFile ? "1" : "0"}`}
          className="rounded-[8px] border border-white/10 bg-white/[0.05] p-3 text-sm text-cyan-200 hover:bg-white/10"
        >
          {file.fileName} · {file.fileType.toUpperCase()} · {file.uploadedBy}
        </a>
      ))}
    </div>
  );
}
