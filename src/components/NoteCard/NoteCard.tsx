import { useTheme } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import type { AppTheme } from "../../theme/theme";
import type { Note } from "../../types/note";
import useStyles from "./NoteCard.styles";
import { COLOR_NAMES } from "../../constants/noteColors";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  const [expanded, setExpanded] = useState(false);
  const [isLongText, setIsLongText] = useState(false);

  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      if (!textRef.current) return;

      setExpanded(false);

      const element = textRef.current;

      const isOverflowing = element.scrollHeight > element.clientHeight + 1;

      setIsLongText(isOverflowing);
    });
  }, [note.text]);

  return (
    <div css={styles.card}>
      <h3 css={styles.title}>{note.title}</h3>

      <div
        ref={textRef}
        css={expanded ? styles.textExpanded : styles.textClamped}
      >
        {note.text}
      </div>

      <div css={styles.footer}>
        <div css={styles.tag(note.color)}>
          {COLOR_NAMES[note.color] || note.color}
        </div>

        <div css={styles.actions}>
          {isLongText && (
            <button
              css={styles.showMoreButton}
              onClick={() => setExpanded((prev) => !prev)}
              type="button"
            >
              {expanded ? "Скрыть" : "Показать больше"}
            </button>
          )}

          <button
            css={styles.deleteButton}
            onClick={() => onDelete(note.id)}
            type="button"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
