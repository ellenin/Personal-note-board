import { useTheme } from "@emotion/react";
import type { AppTheme, ThemeMode, ThemePreference } from "../../theme/theme";
import { useStyles } from "./ThemeSwitcher.styles";

interface ThemeSwitcherProps {
  themePreference: ThemePreference;
  onChange: (value: ThemePreference) => void;
}

export function ThemeSwitcher({
  themePreference,
  onChange,
}: ThemeSwitcherProps) {
  const theme = useTheme() as AppTheme;
  const styles = useStyles(theme);

  const systemTheme: ThemeMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";

  const actualTheme: ThemeMode =
    themePreference === "system" ? systemTheme : themePreference;

  const getLabel = (): string => {
    if (themePreference === "light") return "Тема: Светлая";
    if (themePreference === "dark") return "Тема: Тёмная";

    return actualTheme === "light" ? "Тема: Системная" : "Тема: Системная";
  };

  const handleClick = (): void => {
    if (themePreference === "light") return onChange("dark");
    if (themePreference === "dark") return onChange("system");
    return onChange("light");
  };

  return (
    <button type="button" css={styles.button} onClick={handleClick}>
      {getLabel()}
    </button>
  );
}
