import { css } from "@emotion/react";
import type { AppTheme } from "../../theme/theme";

export const useStyles = (theme: AppTheme) => {
  return {
    button: css`
      width: 100%;
      max-width: 200px;
      margin: 0 auto;

      border: 1px solid ${theme.colors.border};
      background: ${theme.colors.surface};
      color: ${theme.colors.text};
      padding: 10px 12px;
      border-radius: 14px;
      cursor: pointer;

      font-weight: 600;

      &:hover {
        border-color: ${theme.colors.primary};
      }
    `,
  };
};
