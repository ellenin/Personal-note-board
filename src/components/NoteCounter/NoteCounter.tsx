import { useTheme } from "@emotion/react";
import type { AppTheme } from "../../theme/theme";
import { useStyles } from "./NoteCounter.styles";

interface NoteCounterProps {
  count: number;
}

export function NoteCounter({ count }: NoteCounterProps) {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  return <div css={styles.counter}>Активные заметки: {count}</div>;
}
