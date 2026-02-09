import { css, ThemeProvider } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";

import { NoteCounter } from "./components/NoteCounter";
import { NoteForm } from "./components/NoteForm";
import { NotesList } from "./components/NotesList";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

import { darkTheme } from "./theme/darkTheme";
import { lightTheme } from "./theme/lightTheme";
import type { ThemeMode, ThemePreference } from "./theme/theme";

import type { Note } from "./types/note";

const STORAGE_KEY = "notes_app_notes";
const THEME_KEY = "notes_app_theme_preference";

export default function App() {
  const [themePreference, setThemePreference] = useState<ThemePreference>(
    () => {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark" || saved === "system")
        return saved;
      return "system";
    },
  );

  const [notes, setNotes] = useState<Note[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const data: unknown = JSON.parse(raw);
      return Array.isArray(data) ? (data as Note[]) : [];
    } catch {
      return [];
    }
  });

  const getSystemTheme = (): ThemeMode =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const themeMode: ThemeMode =
    themePreference === "system" ? getSystemTheme() : themePreference;

  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, themePreference);
  }, [themePreference]);

  useEffect(() => {
    if (themePreference !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setThemePreference("system");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [themePreference]);

  const changeThemePreference = (value: ThemePreference) =>
    setThemePreference(value);

  const addNote = (data: {
    title: string;
    text: string;
    color: Note["color"];
  }) => {
    const newNote: Note = { id: crypto.randomUUID(), ...data };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const pageStyles = (theme: typeof lightTheme) => css`
    min-height: 100vh;
    padding: 24px;
    background: ${theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: flex-start;
  `;

  const layoutStyles = css`
    max-width: 700px;
    width: 100%;
    display: grid;
    gap: 16px;
  `;

  const hrStyles = (theme: typeof lightTheme) => css`
    border: none;
    border-top: 1px solid ${theme.colors.border};
    margin: 16px 0;
  `;

  const titleStyles = (theme: typeof lightTheme) => css`
    margin: 0;
    color: ${theme.colors.text};
    text-align: center;
  `;

  return (
    <ThemeProvider theme={theme}>
      <div css={pageStyles(theme)}>
        <div css={layoutStyles}>
          <h1 css={titleStyles(theme)}>Мои заметки</h1>

          <ThemeSwitcher
            themePreference={themePreference}
            onChange={changeThemePreference}
          />

          <hr css={hrStyles(theme)} />

          <NoteForm onAddNote={addNote} />

          <hr css={hrStyles(theme)} />

          <NoteCounter count={notes.length} />

          <NotesList notes={notes} onDeleteNote={deleteNote} />
        </div>
      </div>
    </ThemeProvider>
  );
}