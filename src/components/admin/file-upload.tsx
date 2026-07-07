"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/utils";

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: Record<string, string[]>;
  maxSize?: number;
  label?: string;
  uploading?: boolean;
}

export function FileUpload({
  onUpload,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB
  label = "拖拽文件到此处，或点击上传",
  uploading = false,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setSelectedFile(file);
      await onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    disabled: uploading,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-[6px] border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)] p-8 transition-colors duration-150",
          isDragActive && "border-[var(--accent)] bg-[var(--accent-subtle)]",
          uploading && "cursor-not-allowed opacity-60"
        )}
      >
        <input {...getInputProps()} />
        <Upload size={24} className="text-[var(--text-tertiary)] mb-3" />
        <p className="text-sm text-[var(--text-secondary)]">{label}</p>
        <p className="mt-1 text-xs text-[var(--text-tertiary)]">
          最大 {formatFileSize(maxSize)}
        </p>
      </div>

      {/* Selected file preview */}
      {selectedFile && (
        <div className="mt-3 flex items-center gap-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
          <FileText size={16} className="text-[var(--text-tertiary)] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">
              {selectedFile.name}
            </p>
            <p className="text-xs text-[var(--text-tertiary)]">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
          {uploading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
          )}
        </div>
      )}
    </div>
  );
}
