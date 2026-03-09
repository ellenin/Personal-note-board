import { css } from "@emotion/react";
import type { AppTheme } from "../../theme/theme";
import type { Note } from "../../types/note";

const useStyles = (theme: AppTheme) => {
  return {
    card: css`
      background: ${theme.colors.surface};
      border: 1px solid ${theme.colors.border};
      border-radius: 16px;
      padding: 14px 16px;
    `,

    title: css`
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: ${theme.colors.text};
    `,

    textBase: css`
      margin-top: 8px;
      font-size: 14px;
      line-height: 1.4;
      color: ${theme.colors.text};
      white-space: pre-wrap;

      overflow-wrap: anywhere;
      word-break: break-word;
    `,

    textClamped: css`
      margin-top: 8px;
      font-size: 14px;
      line-height: 1.4;
      color: ${theme.colors.text};
      white-space: pre-wrap;

      overflow-wrap: anywhere;
      word-break: break-word;

      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `,

    textExpanded: css`
      margin-top: 8px;
      font-size: 14px;
      line-height: 1.4;
      color: ${theme.colors.text};
      white-space: pre-wrap;

      overflow-wrap: anywhere;
      word-break: break-word;
    `,

    footer: css`
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    `,

    actions: css`
      display: flex;
      align-items: center;
      gap: 12px;
    `,

    deleteButton: css`
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
    `,

    showMoreButton: css`
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
    `,

    tag: (color: Note["color"]) => css`
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
    `,
  };
};

export default useStyles;
