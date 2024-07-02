export const config: { apiUrl: string } = {
    apiUrl: import.meta.env.SERVER_API_URL || "http://localhost:3000/api",
};
