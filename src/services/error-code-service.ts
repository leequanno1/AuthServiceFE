export const getServerErrorCode = (error: any): number => {
    return error?.response?.data?.code || 0;
}