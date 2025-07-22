export function decodeToken(token) {
  try {
    const p = token.split(".")[1];
    return JSON.parse(atob(p));
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const d = decodeToken(token);
  return !d?.exp || Math.floor(Date.now() / 1000) > d.exp;
}
