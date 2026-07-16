export async function uploadFiles(files: File[]) {
    await new Promise((resolve) =>
        setTimeout(resolve, 1200)
    );

    return files.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
    }));
}