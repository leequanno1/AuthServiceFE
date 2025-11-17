export const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";").map((c) => c.trim());
  for (const p of parts) {
    if (p.startsWith(`${name}=`)) {
      return decodeURIComponent(p.substring(name.length + 1));
    }
  }
  return null;
};

export const setCookie = (name: string, value: string, seconds: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + seconds * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/;`;
};

export const getAccessTokenFromCookie = (): string | null =>
  readCookie("accessToken") ?? readCookie("access_token");

export const getRefreshTokenFromCookie = (): string | null =>
  readCookie("refreshToken") ?? readCookie("refresh_token");

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}