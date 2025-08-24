export const DateService = {

    formatDate: (date: Date): string => {
        const formatted = date.toISOString().slice(0, 10).replace(/-/g, '/');
        return formatted;
    },

}