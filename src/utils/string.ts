export function firstLetterCapitalized (pattern: string): string {
  return `${pattern.substr(0, 1).toUpperCase()}${pattern.substr(1).toLowerCase()}`
}
