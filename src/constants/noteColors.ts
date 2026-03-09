import type { Note } from "../types/note";

export const COLOR_NAMES: Record<Note["color"], string> = {
  "#ff6b6b": "Работа",
  "#ffd93d": "Хобби",
  "#6bcB77": "Личное",
  "#4d96ff": "Для Паши",
};

export const NOTE_COLORS: Note["color"][] = [
  "#ff6b6b",
  "#ffd93d",
  "#6bcB77",
  "#4d96ff",
];
