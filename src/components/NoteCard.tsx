import { css, useTheme } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import type { AppTheme } from "../theme/theme";
import type { Note } from "../types/note";

const COLOR_NAMES: Record<Note["color"], string> = {
  "#ff6b6b": "Работа",
  "#ffd93d": "Хобби",
  "#6bcB77": "Личное",
  "#4d96ff": "Для Паши",
};

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

const cardStyles = (theme: AppTheme) => css`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 16px;
  padding: 14px 16px;
`;

const titleStyles = (theme: AppTheme) => css`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const textBaseStyles = (theme: AppTheme) => css`
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.4;
  color: ${theme.colors.text};
  white-space: pre-wrap;

  overflow-wrap: anywhere;
  word-break: break-word;
`;

const textClampedStyles = (theme: AppTheme) => css`
  ${textBaseStyles(theme)};

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const textExpandedStyles = (theme: AppTheme) => css`
  ${textBaseStyles(theme)};
`;

const footerStyles = css`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const actionsStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const deleteButtonStyles = (theme: AppTheme) => css`
  border: 1px solid ${theme.colors.border};
  background: transparent;
  color: ${theme.colors.text};
  padding: 8px 10px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.danger};
    color: ${theme.colors.danger};
  }
`;

const showMoreButtonStyles = (theme: AppTheme) => css`
  border: none;
  background: transparent;
  color: ${theme.colors.primary};
  cursor: pointer;
  padding: 0;
  font-size: 13px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const tagStyles = (theme: AppTheme, color: Note["color"]) => css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;

  color: ${theme.colors.text};

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 999px;
    display: inline-block;
    background: ${color};
  }
`;

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const theme = useTheme() as AppTheme;

  const [expanded, setExpanded] = useState(false);
  const [isLongText, setIsLongText] = useState(false);

  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    setExpanded(false);

    requestAnimationFrame(() => {
      if (!textRef.current) return;

      const element = textRef.current;

      const isOverflowing = element.scrollHeight > element.clientHeight + 1;

      setIsLongText(isOverflowing);
    });
  }, [note.text]);

  return (
    <div css={cardStyles(theme)}>
      <h3 css={titleStyles(theme)}>{note.title}</h3>

      <div
        ref={textRef}
        css={expanded ? textExpandedStyles(theme) : textClampedStyles(theme)}
      >
        {note.text}
      </div>

      <div css={footerStyles}>
        <div css={tagStyles(theme, note.color)}>
          {COLOR_NAMES[note.color] || note.color}
        </div>

        <div css={actionsStyles}>
          {isLongText && (
            <button
              css={showMoreButtonStyles(theme)}
              onClick={() => setExpanded((prev) => !prev)}
              type="button"
            >
              {expanded ? "Скрыть" : "Показать больше"}
            </button>
          )}

          <button
            css={deleteButtonStyles(theme)}
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