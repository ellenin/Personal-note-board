import { css, useTheme } from "@emotion/react";
import type { AppTheme, ThemeMode, ThemePreference } from "../theme/theme";

interface ThemeSwitcherProps {
  themePreference: ThemePreference;
  onChange: (value: ThemePreference) => void;
}

const buttonStyles = (theme: AppTheme) => css`
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
`;

export function ThemeSwitcher({
  themePreference,
  onChange,
}: ThemeSwitcherProps) {
  const theme = useTheme() as AppTheme;

  const systemTheme: ThemeMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";

  const actualTheme: ThemeMode =
    themePreference === "system" ? systemTheme : themePreference;

  const getLabel = (): string => {
    if (themePreference === "light") return "Тема: Светлая ☀️";
    if (themePreference === "dark") return "Тема: Тёмная 🌙";

    return actualTheme === "light"
      ? "Тема: Системная ☀️"
      : "Тема: Системная 🌙";
  };

  const handleClick = (): void => {
    if (themePreference === "light") return onChange("dark");
    if (themePreference === "dark") return onChange("system");
    return onChange("light");
  };

  return (
    <button type="button" css={buttonStyles(theme)} onClick={handleClick}>
      {getLabel()}
    </button>
  );
}