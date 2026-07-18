// src/features/dashboard/pages/DashboardHome.tsx

import Hero from "../components/hero/Hero";
import AiPrompt from "../components/prompt/AiPrompt";
import UploadDropzone from "../components/upload/UploadDropzone";
import UploadQueue from "../components/upload/UploadQueue";
import ProcessingTimeline from "../components/processing/ProcessingTimeline";
import GraphWorkspace from "../components/graph/GraphWorkspace";
import WorkspaceSummary from "../components/summary/WorkspaceSummary";

import { useDashboardStore } from "../store/dashboardStore";

export default function DashboardHome() {
  const workspaceMode = useDashboardStore(
    (state) => state.workspaceMode
  );

  return (
    <main
      className="
        mx-auto
        flex
        min-h-[calc(100vh-72px)]
        w-full
        max-w-7xl
        flex-col
        items-center
        px-8
        py-2
      "
    >
      {(workspaceMode === "idle" ||
        workspaceMode === "upload") && (
        <>
          <Hero />

          <div className="mt-4 w-full max-w-4xl">
            <AiPrompt />
          </div>

          <div className="mt-3 w-full max-w-4xl">
            <UploadDropzone />
          </div>

          <div className="mt-6 w-full max-w-4xl">
            <UploadQueue />
          </div>
        </>
      )}

      {workspaceMode === "processing" && (
        <div className="mt-12 w-full max-w-xl">
          <ProcessingTimeline />
        </div>
      )}

      {workspaceMode === "completed" && (
        <>
          <div className="w-full">
            <GraphWorkspace />
          </div>

          <div className="mt-8 w-full">
            <WorkspaceSummary />
          </div>
        </>
      )}
    </main>
  );
}