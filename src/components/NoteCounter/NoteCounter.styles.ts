import { css } from "@emotion/react";
import type { AppTheme } from "../../theme/theme";

export const useStyles = (theme: AppTheme) => ({
  counter: css`
    color: ${theme.colors.text};
    font-size: 14px;
    font-weight: 600;
  `,
});
