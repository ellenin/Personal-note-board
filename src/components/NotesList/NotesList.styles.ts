import { css } from "@emotion/react";
import type { AppTheme } from "../../theme/theme";

const useStyles = (theme: AppTheme) => {
  return {
    list: css`
      display: grid;
      gap: 16px;
      overflow-y: auto;
      padding-right: 4px;
      min-height: 0;
      flex: 1;
      align-content: start;
    `,

    noNotes: css`
      color: ${theme.colors.textSecondary};
      text-align: center;
      margin-top: 24px;
      font-size: 16px;
    `,
  };
};

export default useStyles;
