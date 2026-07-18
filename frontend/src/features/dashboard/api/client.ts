export const API_BASE_URL =
    import.meta.env.VITE_API_URL ??
    "http://localhost:8000/api";

interface RequestOptions extends RequestInit {
    token?: string;
}

async function request<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { token, headers, body, ...rest } = options;

    const isFormData = body instanceof FormData;

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...rest,

            body,

            headers: {
                ...(isFormData
                    ? {}
                    : {
                          "Content-Type":
                              "application/json",
                      }),

                ...(token && {
                    Authorization: `Bearer ${token}`,
                }),

                ...headers,
            },
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export const apiClient = {
    get: <T>(url: string, token?: string) =>
        request<T>(url, {
            method: "GET",
            token,
        }),

    post: <T>(
        url: string,
        body?: unknown,
        token?: string
    ) =>
        request<T>(url, {
            method: "POST",
            token,
            body:
            body instanceof FormData
            ? body
            : JSON.stringify(body),
            }),

    put: <T>(
        url: string,
        body?: unknown,
        token?: string
    ) =>
        request<T>(url, {
            method: "PUT",
            token,
            body: JSON.stringify(body),
        }),

    delete: <T>(
        url: string,
        token?: string
    ) =>
        request<T>(url, {
            method: "DELETE",
            token,
        }),
};