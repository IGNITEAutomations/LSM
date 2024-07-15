export type APIResponse<t> = {
    success: true,
    data: t
} | {
    success: false,
    error: string
}