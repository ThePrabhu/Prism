export const ACCEPTED_TYPES = [
    ".csv",
    ".xlsx",
    ".xls",
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg",
    ".json",
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function validateFile(file: File) {
    const extension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!ACCEPTED_TYPES.includes(extension)) {
        return {
            valid: false,
            message: "Unsupported file type",
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            message: "File exceeds 50MB",
        };
    }

    return {
        valid: true,
        message: "",
    };
}