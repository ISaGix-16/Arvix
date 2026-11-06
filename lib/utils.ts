export { cn } from "cn";

export function submitOnEnter(submit: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key != "Enter" || e.shiftKey) return;
    e.preventDefault();
    submit();
  };
}

const CURSOR_COLORS = [
  "#F97316", // Orange
  "#3B82F6", // Blue
  "#22C55E", // Green
  "#A855F7", // Purple
  "#EC4899", // Pink
  "#EAB308", // Yellow
  "#06B6D4", // Cyan
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#14B8A6", // Teal
];

export function colorForUser(userId: string) {
  let hash = 0;
  for (const char of userId) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length];
}
