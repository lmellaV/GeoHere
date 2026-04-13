export function generateId(prefix = ""): string {
  const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return prefix ? `${prefix}_${id}` : id;
}

export function isPasswordCompliant(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export function generateSecurePassword(length = 8): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const alphanum = `${uppercase}${lowercase}${numbers}`;

  const upper = uppercase[Math.floor(Math.random() * uppercase.length)];
  const lower = lowercase[Math.floor(Math.random() * lowercase.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];

  let rest = "";
  for (let i = 0; i < Math.max(length - 3, 0); i++) {
    rest += alphanum[Math.floor(Math.random() * alphanum.length)];
  }

  const allChars = [upper, lower, number, ...rest.split("")];
  for (let i = allChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
  }

  return allChars.join("");
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
