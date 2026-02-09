export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

export interface AppTheme {
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    danger: string;
  };
}