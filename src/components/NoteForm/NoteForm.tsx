import { useTheme } from "@emotion/react";
import { useState } from "react";

import type { AppTheme } from "../../theme/theme";
import type { Note } from "../../types/note";
import { useStyles } from "./NoteForm.styles";
import { COLOR_NAMES, NOTE_COLORS } from "../../constants/noteColors";

interface NoteFormProps {
  onAddNote: (data: {
    title: string;
    text: string;
    color: Note["color"];
  }) => void;
}

export function NoteForm({ onAddNote }: NoteFormProps) {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [color, setColor] = useState<Note["color"]>(NOTE_COLORS[0]);

  const isValid = title.trim().length > 0 && text.trim().length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isValid) return;

    onAddNote({
      title: title.trim(),
      text: text.trim(),
      color,
    });

    setTitle("");
    setText("");
    setColor(NOTE_COLORS[0]);
  };

  return (
    <form css={styles.form} onSubmit={handleSubmit}>
      <h2 css={styles.title}>Добавить заметку</h2>

      <input
        css={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
      />

      <textarea
        css={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Текст заметки..."
      />

      <div>
        <div css={styles.colorLabel}>
          Тэг: <span css={styles.colorName}>{COLOR_NAMES[color]}</span>
        </div>

        <div css={styles.colorsRow}>
          {NOTE_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              css={styles.colorButton(c, c === color)}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      <button css={styles.submitButton} disabled={!isValid}>
        Добавить
      </button>
    </form>
  );
}
