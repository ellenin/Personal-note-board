import { useTheme } from "@emotion/react";
import type { AppTheme } from "../../theme/theme";
import type { Note } from "../../types/note";
import { NoteCard } from "../NoteCard/NoteCard";
import useStyles from "./NotesList.styles";

interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

export function NotesList({ notes, onDeleteNote }: NotesListProps) {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  if (notes.length === 0) {
    return <p css={styles.noNotes}>Нет заметок</p>;
  }

  return (
    <div css={styles.list}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDeleteNote} />
      ))}
    </div>
  );
}
