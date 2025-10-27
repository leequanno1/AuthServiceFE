export const DateService = {

    formatDate: (date: Date | undefined): string => {
        if (!date) {
            date = new Date();
        }
        const formatted = date.toString().slice(0, 10).replace(/-/g, '/');
        return formatted;
    },

}