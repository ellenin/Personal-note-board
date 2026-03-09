import { css } from "@emotion/react";
import type { AppTheme } from "../../theme/theme";
import type { Note } from "../../types/note";

export const useStyles = (theme: AppTheme) => {
  const input = css`
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

  return {
    form: css`
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
    `,

    title: css`
      margin: 0;
      color: ${theme.colors.text};
      text-align: center;
    `,

    input,

    textarea: css`
      ${input};
      min-height: 100px;
      resize: vertical;
    `,

    colorsRow: css`
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    `,

    colorButton: (color: Note["color"], isActive: boolean) => css`
      width: 34px;
      height: 34px;
      border-radius: 999px;
      border: 2px solid ${isActive ? theme.colors.primary : theme.colors.border};
      background: ${color};
      cursor: pointer;
    `,

    submitButton: css`
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
    `,

    colorLabel: css`
      font-weight: 600;
      color: ${theme.colors.text};
      margin-bottom: 8px;
    `,

    colorName: css`
      color: ${theme.colors.text};
      font-weight: 500;
      margin-left: 4px;
    `,
  };
};
