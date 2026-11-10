import { createContext, useContext, useState, type ReactNode } from "react";

export type JournalEntry = {
  id: string;
  type: "pH" | "Титрування" | "Вапнування" | "Завдання";
  title: string;
  date: string;
  studentName: string;
  status: string;
  data: Record<string, string>;
  payload?: unknown;
};

type Ctx = {
  entries: JournalEntry[];
  add: (e: Omit<JournalEntry, "id" | "date" | "studentName">) => void;
  remove: (id: string) => void;
  studentName: string;
  setStudentName: (s: string) => void;
};

const JournalCtx = createContext<Ctx | null>(null);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [studentName, setStudentName] = useState("");
  const add: Ctx["add"] = (e) =>
    setEntries((p) => [
      { ...e, id: crypto.randomUUID(), date: new Date().toLocaleString("uk-UA"), studentName },
      ...p,
    ]);
  const remove = (id: string) => setEntries((p) => p.filter((x) => x.id !== id));
  return (
    <JournalCtx.Provider value={{ entries, add, remove, studentName, setStudentName }}>
      {children}
    </JournalCtx.Provider>
  );
}

export function useJournal() {
  const c = useContext(JournalCtx);
  if (!c) throw new Error("JournalProvider missing");
  return c;
}
