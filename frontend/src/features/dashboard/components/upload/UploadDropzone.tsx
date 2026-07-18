// src/features/dashboard/components/upload/UploadDropzone.tsx

import { useRef, type DragEvent } from "react";
import {
  FileText,
  Table2,
  Truck,
  UploadCloud,
} from "lucide-react";

import { useDashboardStore } from "../../store/dashboardStore";
import { useWorkspace } from "../../hooks/useWorkspace";

const ACCEPTED_TYPES = [
  ".csv",
  ".xlsx",
  ".xls",
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".json",
];

const fileTiles = [
  {
    label: "GSTR-1",
    icon: FileText,
  },
  {
    label: "GSTR-2B",
    icon: FileText,
  },
  {
    label: "GSTR-3B",
    icon: FileText,
  },
  {
    label: "Invoices",
    icon: Table2,
  },
  {
    label: "E-waybill",
    icon: Truck,
  },
];

export default function UploadDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedFiles = useDashboardStore(
    (state) => state.selectedFiles
  );

  const setSelectedFiles = useDashboardStore(
    (state) => state.setSelectedFiles
  );

  const setWorkspaceMode = useDashboardStore(
    (state) => state.setWorkspaceMode
  );

  const addFilesToWorkspace = useDashboardStore(
    (state) => state.addFilesToWorkspace
  );

  const { activeWorkspace } = useWorkspace();

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;

    const files = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      workspaceId: "",
      file,
      name: file.name,
      size: file.size,
      mimeType: file.type,
      extension: file.name.split(".").pop() ?? "",
      progress: 0,
      status: "queued" as const,
    }));

    const updatedFiles = [
      ...selectedFiles,
      ...files,
    ];

    setSelectedFiles(updatedFiles);

    if (activeWorkspace) {
      addFilesToWorkspace(activeWorkspace.id, files);
    }

    setWorkspaceMode("upload");
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        accept={ACCEPTED_TYPES.join(",")}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <section
        className="
          rounded-[22px]
          bg-white
          p-3
          shadow-[0_16px_44px_rgba(15,23,42,.07)]
        "
      >
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="
            group
            flex
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-emerald-200
            bg-white
            px-6
            py-6
            text-center
            transition-all
            duration-300
            hover:border-emerald-400
            hover:bg-emerald-50/20
          "
        >
          <UploadCloud
            size={42}
            className="
              text-emerald-600
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
            "
          />

          <p className="mt-3 text-sm font-bold text-zinc-950">
            Drag &amp; drop files here
          </p>

          <p className="mt-1 text-sm font-semibold text-emerald-600">
            or click to browse
          </p>

          <p className="mt-3 text-xs font-medium text-zinc-500">
            Supports CSV, XLSX, PDF — Max 50MB per file
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          {fileTiles.map((tile) => {
            const Icon = tile.icon;

            return (
              <div
                key={tile.label}
                className="
                  flex
                  h-[58px]
                  min-w-0
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-emerald-200
                  bg-white
                  p-3
                  text-[15px]
                  font-semibold
                  text-zinc-800
                  shadow-[0_4px_12px_rgba(15,23,42,.08)]
                "
              >
                <Icon
                  size={19}
                  className="text-emerald-600"
                />

                <span>{tile.label}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}