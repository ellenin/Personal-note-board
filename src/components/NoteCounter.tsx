import { css, useTheme } from "@emotion/react";
import type { AppTheme } from "../theme/theme";

interface NoteCounterProps {
  count: number;
}

const counterStyles = (theme: AppTheme) => css`
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 600;
`;

export function NoteCounter({ count }: NoteCounterProps) {
  const theme = useTheme() as AppTheme;

  return <div css={counterStyles(theme)}>Активные заметки: {count}</div>;
}