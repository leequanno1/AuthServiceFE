const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailFormat = (email : string) => {
    return emailPattern.test(email);
}