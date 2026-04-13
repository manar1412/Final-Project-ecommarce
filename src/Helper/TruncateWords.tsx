export function truncateWords(text: string, wordsCount: number): string {
  return text.split(" ").slice(0, wordsCount).join(" ");
}
