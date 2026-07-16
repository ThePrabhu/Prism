// src/features/resolution/hooks/useResolution.ts

import { useEffect, useMemo, useState } from "react";

import { resolutionService } from "../services/resolution.service";

import type {
    ResolutionCase,
    ResolutionFilters,
} from "../types/resolution.types";

export function useResolution(
    workspaceId: string | null
) {
    const [cases, setCases] = useState<
        ResolutionCase[]
    >([]);

    const [selectedCase, setSelectedCase] =
        useState<ResolutionCase | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [filters, setFilters] =
        useState<ResolutionFilters>({
            search: "",

            severity: "all",

            status: "all",

            issueType: "all",

            vendor: "",

            sortBy: "date",

            sortOrder: "desc",
        });

    useEffect(() => {
        if (!workspaceId) {
            return;
        }

        async function loadCases() {
            try {
                setLoading(true);

                const data =
                    await resolutionService.getCases(
                        workspaceId!
                    );

                setCases(data);
            } finally {
                setLoading(false);
            }
        }

        loadCases();
    }, [workspaceId]);

    const filteredCases = useMemo(() => {
        let data = [...cases];

        if (filters.search) {
            const value =
                filters.search.toLowerCase();

            data = data.filter(
                (item) =>
                    item.title
                        .toLowerCase()
                        .includes(value) ||
                    item.vendorName
                        .toLowerCase()
                        .includes(value) ||
                    item.invoiceNumber
                        .toLowerCase()
                        .includes(value)
            );
        }

        if (filters.severity !== "all") {
            data = data.filter(
                (item) =>
                    item.severity ===
                    filters.severity
            );
        }

        if (filters.status !== "all") {
            data = data.filter(
                (item) =>
                    item.status ===
                    filters.status
            );
        }

        if (filters.issueType !== "all") {
            data = data.filter(
                (item) =>
                    item.issueType ===
                    filters.issueType
            );
        }

        if (filters.vendor) {
            data = data.filter((item) =>
                item.vendorName
                    .toLowerCase()
                    .includes(
                        filters.vendor.toLowerCase()
                    )
            );
        }

        return data;
    }, [cases, filters]);

    async function refreshCases() {
        if (!workspaceId) return;

        const data =
            await resolutionService.getCases(
                workspaceId
            );

        setCases(data);
    }

    async function markResolved(
        caseId: string
    ) {
        await resolutionService.markResolved(
            caseId
        );

        setCases((prev) =>
            prev.map((item) =>
                item.id === caseId
                    ? {
                          ...item,
                          status: "resolved",
                      }
                    : item
            )
        );

        if (
            selectedCase &&
            selectedCase.id === caseId
        ) {
            setSelectedCase({
                ...selectedCase,
                status: "resolved",
            });
        }
    }

    return {
        loading,

        cases,

        filteredCases,

        filters,

        setFilters,

        selectedCase,

        setSelectedCase,

        refreshCases,

        markResolved,
    };
}