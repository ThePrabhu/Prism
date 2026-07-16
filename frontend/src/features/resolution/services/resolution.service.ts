// src/features/resolution/services/resolution.service.ts

import type { ResolutionCase } from "../types/resolution.types";
import { resolutionCases } from "../mock/resolution.mock";

class ResolutionService {
    async getCases(
        workspaceId: string
    ): Promise<ResolutionCase[]> {
        // TODO:
        // Backend
        //
        // GET /api/workspaces/:workspaceId/resolution

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    resolutionCases.filter(
                        (item) =>
                            item.workspaceId ===
                            workspaceId
                    )
                );
            }, 400);
        });
    }

    async getCase(
        workspaceId: string,
        caseId: string
    ): Promise<ResolutionCase | null> {
        // TODO:
        // GET /api/workspaces/:workspaceId/resolution/:caseId

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    resolutionCases.find(
                        (item) =>
                            item.workspaceId ===
                                workspaceId &&
                            item.id === caseId
                    ) ?? null
                );
            }, 300);
        });
    }

    async explainCase(
        _caseId: string
    ): Promise<string> {
        // TODO:
        // POST /api/resolution/:caseId/explain

        return Promise.resolve(
            "Backend AI explanation will be generated here."
        );
    }

    async askAI(
        caseId: string,
        message: string
    ): Promise<string> {
        // TODO:
        // POST /api/resolution/:caseId/chat

        console.log(caseId, message);

        return Promise.resolve(
            "AI backend is not connected yet."
        );
    }

    async generateEmail(
        caseId: string
    ): Promise<{
        subject: string;
        body: string;
    }> {
        // TODO:
        // POST /api/resolution/:caseId/generate-email

        console.log(caseId);

        return Promise.resolve({
            subject:
                "GST Invoice Follow-up",

            body:
                "AI generated email will come from backend.",
        });
    }

    async sendEmail(
        caseId: string,
        payload: {
            to: string;
            subject: string;
            body: string;
        }
    ) {
        // TODO:
        // POST /api/resolution/:caseId/send-email

        console.log(caseId, payload);

        return Promise.resolve({
            success: true,
        });
    }

    async markResolved(
        caseId: string
    ) {
        // TODO:
        // PATCH /api/resolution/:caseId

        console.log(caseId);

        return Promise.resolve({
            success: true,
        });
    }
}

export const resolutionService =
    new ResolutionService();