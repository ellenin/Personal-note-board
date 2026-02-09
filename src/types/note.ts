export type NoteColor = "#ff6b6b" | "#ffd93d" | "#6bcB77" | "#4d96ff";

export interface Note {
  id: string;
  title: string;
  text: string;
  color: NoteColor;
}