import { css, useTheme } from "@emotion/react";
import { useState } from "react";

import type { AppTheme } from "../theme/theme";
import type { Note } from "../types/note";

interface NoteFormProps {
  onAddNote: (data: {
    title: string;
    text: string;
    color: Note["color"];
  }) => void;
}

const COLOR_NAMES: Record<string, string> = {
  "#ff6b6b": "Работа",
  "#ffd93d": "Хобби",
  "#6bcB77": "Личное",
  "#4d96ff": "Для Паши",
};

export function NoteForm({ onAddNote }: NoteFormProps) {
  const theme = useTheme() as AppTheme;

  const colorOptions: Note["color"][] = [
    "#ff6b6b",
    "#ffd93d",
    "#6bcB77",
    "#4d96ff",
  ];

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [color, setColor] = useState<Note["color"]>(colorOptions[0]);

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
    setColor(colorOptions[0]);
  };

  const formStyles = (theme: AppTheme) => css`
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    border-radius: 16px;
    padding: 16px;
    display: grid;
    gap: 12px;

    max-width: 700px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  `;

  const inputStyles = (theme: AppTheme) => css`
    width: 100%;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid ${theme.colors.border};
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-size: 14px;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: ${theme.colors.primary};
    }
  `;

  const textareaStyles = (theme: AppTheme) => css`
    ${inputStyles(theme)};
    min-height: 100px;
    resize: vertical;
  `;

  const colorsRowStyles = css`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  `;

  const colorButtonStyles = (
    theme: AppTheme,
    color: Note["color"],
    isActive: boolean,
  ) => css`
    width: 34px;
    height: 34px;
    border-radius: 999px;
    border: 2px solid ${isActive ? theme.colors.primary : theme.colors.border};
    background: ${color};
    cursor: pointer;
  `;

  const submitButtonStyles = (theme: AppTheme) => css`
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 14px;
    padding: 10px 12px;
    background: ${theme.colors.primary};
    color: white;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const colorLabelStyles = (theme: AppTheme) => css`
    font-weight: 600;
    color: ${theme.colors.text};
    margin-bottom: 8px;
  `;

  return (
    <form css={formStyles(theme)} onSubmit={handleSubmit}>
      <h2
        css={css`
          margin: 0;
          color: ${theme.colors.text};
          text-align: center;
        `}
      >
        Добавить заметку
      </h2>

      <input
        css={inputStyles(theme)}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
      />

      <textarea
        css={textareaStyles(theme)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Текст заметки..."
      />

      <div>
        <div css={colorLabelStyles(theme)}>
          Тэг:{" "}
          <span
            css={css`
              color: ${theme.colors.text};
              font-weight: 500;
              margin-left: 4px;
            `}
          >
            {COLOR_NAMES[color]}
          </span>
        </div>

        <div css={colorsRowStyles}>
          {colorOptions.map((c) => (
            <button
              key={c}
              type="button"
              css={colorButtonStyles(theme, c, c === color)}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      <button css={submitButtonStyles(theme)} disabled={!isValid}>
        Добавить
      </button>
    </form>
  );
}