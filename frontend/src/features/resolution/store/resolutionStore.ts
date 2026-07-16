// src/features/resolution/store/resolutionStore.ts

import { create } from "zustand";

import type {
    ResolutionCase,
    ResolutionFilters,
    ResolutionSummary,
} from "../types/resolution.types";

interface ResolutionStore {
    /* ==========================================================
       STATE
    ========================================================== */

    cases: ResolutionCase[];

    filteredCases: ResolutionCase[];

    selectedCase: ResolutionCase | null;

    loading: boolean;

    drawerOpen: boolean;

    explainOpen: boolean;

    aiPanelOpen: boolean;

    emailModalOpen: boolean;

    filters: ResolutionFilters;

    summary: ResolutionSummary;

    /* ==========================================================
       CASES
    ========================================================== */

    setCases: (cases: ResolutionCase[]) => void;

    addCase: (resolutionCase: ResolutionCase) => void;

    updateCase: (
        id: string,
        updates: Partial<ResolutionCase>
    ) => void;

    removeCase: (id: string) => void;

    clearCases: () => void;

    /* ==========================================================
       SELECTION
    ========================================================== */

    selectCase: (
        resolutionCase: ResolutionCase | null
    ) => void;

    /* ==========================================================
       FILTERS
    ========================================================== */

    setFilters: (
        filters: Partial<ResolutionFilters>
    ) => void;

    resetFilters: () => void;

    /* ==========================================================
       DRAWER
    ========================================================== */

    openDrawer: () => void;

    closeDrawer: () => void;

    /* ==========================================================
       EXPLAIN
    ========================================================== */

    openExplain: () => void;

    closeExplain: () => void;

    /* ==========================================================
       AI PANEL
    ========================================================== */

    openAI: () => void;

    closeAI: () => void;

    /* ==========================================================
       EMAIL
    ========================================================== */

    openEmail: () => void;

    closeEmail: () => void;

    /* ==========================================================
       LOADING
    ========================================================== */

    setLoading: (
        loading: boolean
    ) => void;

    /* ==========================================================
       SUMMARY
    ========================================================== */

    setSummary: (
        summary: ResolutionSummary
    ) => void;
}

const defaultFilters: ResolutionFilters = {
    search: "",

    severity: "all",

    status: "all",

    issueType: "all",

    vendor: "",

    sortBy: "date",

    sortOrder: "desc",
};

const defaultSummary: ResolutionSummary = {
    totalCases: 0,

    openCases: 0,

    resolvedCases: 0,

    criticalCases: 0,

    totalBlockedAmount: 0,

    totalRecoverableAmount: 0,
};

export const useResolutionStore =
    create<ResolutionStore>((set) => ({
        /* ======================================================
           INITIAL STATE
        ====================================================== */

        cases: [],

        filteredCases: [],

        selectedCase: null,

        loading: false,

        drawerOpen: false,

        explainOpen: false,

        aiPanelOpen: false,

        emailModalOpen: false,

        filters: defaultFilters,

        summary: defaultSummary,

        /* ======================================================
           CASES
        ====================================================== */

        setCases: (cases) =>
            set({
                cases,
                filteredCases: cases,
            }),

        addCase: (resolutionCase) =>
            set((state) => ({
                cases: [
                    resolutionCase,
                    ...state.cases,
                ],

                filteredCases: [
                    resolutionCase,
                    ...state.filteredCases,
                ],
            })),

        updateCase: (id, updates) =>
            set((state) => ({
                cases: state.cases.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              ...updates,
                          }
                        : item
                ),

                filteredCases:
                    state.filteredCases.map(
                        (item) =>
                            item.id === id
                                ? {
                                      ...item,
                                      ...updates,
                                  }
                                : item
                    ),

                selectedCase:
                    state.selectedCase?.id === id
                        ? {
                              ...state.selectedCase,
                              ...updates,
                          }
                        : state.selectedCase,
            })),

        removeCase: (id) =>
            set((state) => ({
                cases: state.cases.filter(
                    (item) => item.id !== id
                ),

                filteredCases:
                    state.filteredCases.filter(
                        (item) => item.id !== id
                    ),

                selectedCase:
                    state.selectedCase?.id === id
                        ? null
                        : state.selectedCase,
            })),

        clearCases: () =>
            set({
                cases: [],
                filteredCases: [],
                selectedCase: null,
            }),

        /* ======================================================
           SELECTION
        ====================================================== */

        selectCase: (
            resolutionCase
        ) =>
            set({
                selectedCase:
                    resolutionCase,
            }),

        /* ======================================================
           FILTERS
        ====================================================== */

        setFilters: (filters) =>
            set((state) => ({
                filters: {
                    ...state.filters,
                    ...filters,
                },
            })),

        resetFilters: () =>
            set({
                filters: defaultFilters,
            }),

        /* ======================================================
           DRAWER
        ====================================================== */

        openDrawer: () =>
            set({
                drawerOpen: true,
            }),

        closeDrawer: () =>
            set({
                drawerOpen: false,
            }),

        /* ======================================================
           EXPLAIN
        ====================================================== */

        openExplain: () =>
            set({
                explainOpen: true,
            }),

        closeExplain: () =>
            set({
                explainOpen: false,
            }),

        /* ======================================================
           AI PANEL
        ====================================================== */

        openAI: () =>
            set({
                aiPanelOpen: true,
            }),

        closeAI: () =>
            set({
                aiPanelOpen: false,
            }),

        /* ======================================================
           EMAIL
        ====================================================== */

        openEmail: () =>
            set({
                emailModalOpen: true,
            }),

        closeEmail: () =>
            set({
                emailModalOpen: false,
            }),

        /* ======================================================
           LOADING
        ====================================================== */

        setLoading: (loading) =>
            set({
                loading,
            }),

        /* ======================================================
           SUMMARY
        ====================================================== */

        setSummary: (
            summary
        ) =>
            set({
                summary,
            }),
    }));