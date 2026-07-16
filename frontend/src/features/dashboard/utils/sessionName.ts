const prefixes = [
    "GST",
    "Vendor",
    "Purchase",
    "Compliance",
    "Monthly",
    "Annual",
];

const suffixes = [
    "Workspace",
    "Audit",
    "Reconciliation",
    "Review",
    "Filing",
    "Session",
];

export function generateWorkspaceName() {
    const prefix =
        prefixes[
            Math.floor(
                Math.random() *
                    prefixes.length
            )
        ];

    const suffix =
        suffixes[
            Math.floor(
                Math.random() *
                    suffixes.length
            )
        ];

    return `${prefix} ${suffix}`;
}

export function generateWorkspaceFromFiles(
    files: File[]
) {
    if (files.length === 0)
        return generateWorkspaceName();

    const first =
        files[0].name
            .replace(/\.[^/.]+$/, "")
            .replace(/[_-]/g, " ");

    return first;
}