import { css, useTheme } from "@emotion/react";
import type { AppTheme } from "../theme/theme";
import type { Note } from "../types/note";
import { NoteCard } from "./NoteCard";

interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

export function NotesList({ notes, onDeleteNote }: NotesListProps) {
  const theme = useTheme() as AppTheme;

  const listStyles = css`
    display: grid;
    gap: 16px;
  `;

  const noNotesStyles = css`
    color: ${theme.colors.textSecondary};
    text-align: center;
    margin-top: 24px;
    font-size: 16px;
  `;

  if (notes.length === 0) {
    return <p css={noNotesStyles}>Нет заметок</p>;
  }

  return (
    <div css={listStyles}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDeleteNote} />
      ))}
    </div>
  );
}