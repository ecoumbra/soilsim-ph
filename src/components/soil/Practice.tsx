import { useState } from "react";
import { 
  Shuffle, 
  CheckCheck, 
  Download, 
  Printer, 
  Save, 
  RotateCcw, 
  Trash2, 
  FolderOpen, 
  X, 
  FlaskConical, 
  GraduationCap, 
  BookOpen, 
  Sparkles,
  Lock,
  Unlock
} from "lucide-react";
import { toast } from "sonner";
import { checkAnswer, toCSV, fmt, type Check } from "@/lib/soil";
import { useJournal, type JournalEntry } from "@/lib/journal";
import { Panel, Btn, Tag } from "./shared";

// ----------------------------------------------------------------------
// 1. СПЕЦІАЛЬНОСТІ ТА ШИФРИ ГРУП
// ----------------------------------------------------------------------

interface Specialty {
  id: string;
  code: string;
  name: string;
  prefix: string;
  focus: string;
  taskDescription: string;
}

const SPECIALTIES: Specialty[] = [
  { 
    id: "206", 
    code: "206", 
    name: "206 Агрономія", 
    prefix: "206-АГ",
    focus: "Розрахунок доз меліорантів та розрахунково-балансовий метод",
    taskDescription: "Обчислити ємність поглинання (ЄП = СВО + Hг), ступінь насиченості основами (СНО, V%) та норму CaCO₃ (т/га) для орного шару."
  },
  { 
    id: "205", 
    code: "205", 
    name: "205 Геодезія та землевпорядкування", 
    prefix: "205-ЗМ",
    focus: "Кадастрова оцінка придатності та придатність під угіддя",
    taskDescription: "Визначити рівень деградації ґрунту за СНО (V, %) та надати висновок щодо придатності ділянки під сади й ріллю."
  },
  { 
    id: "203", 
    code: "203", 
    name: "203 Екологія", 
    prefix: "203-ЕК",
    focus: "Оцінка рухливості токсикантів (Al³⁺) та екологічний ризик",
    taskDescription: "Оцінити за значенням обмінної кислотності (Нобм) ризик токсичності алюмінію та рухливості важких металів у ґрунті."
  },
  { 
    id: "200", 
    code: "200", 
    name: "200 Біологія", 
    prefix: "200-БІ",
    focus: "Ґрунтова мікробіота та засвоюваність N, P, K",
    taskDescription: "Оцінити вплив актуальної pH(H₂O) та ступеня насиченості основами (СНО) на активність азотфіксаторів."
  }
];

export interface ExtendedSampleRow {
  id: string;
  group: string;
  phH2O: number;
  phKCl: number;
  hobm: number;   // мг-екв/100 г (Обмінна)
  hg: number;     // мг-екв/100 г (Гідролітична)
  svo: number;    // мг-екв/100 г (Сума вбираних основ)
  sno: number;    // % (Ступінь насиченості основами V%)
  capacityT: number; // мг-екв/100 г (Ємність поглинання ЄП = СВО + Hг)
  caco3: number;  // т/га
  density: number;
}

type Col = "hg" | "svo" | "sno" | "capacityT" | "caco3";

const COLS: { key: Col; label: string; unit: string }[] = [
  { key: "svo", label: "СВО", unit: "мг-екв/100 г" },
  { key: "hg", label: "Hг", unit: "мг-екв/100 г" },
  { key: "capacityT", label: "ЄП", unit: "мг-екв/100 г" },
  { key: "sno", label: "СНО", unit: "%" },
  { key: "caco3", label: "CaCO₃", unit: "т/га" }
];

type Answers = Record<string, Partial<Record<Col, string>>>;
type Saved = { rows: ExtendedSampleRow[]; hidden: Col[]; answers: Answers; group: string };

const TEACHER_PIN = "2026"; // Пароль для розблокування режиму викладача

// ----------------------------------------------------------------------
// ГЕНЕРАЦІЯ СИНТЕТИЧНИХ ДАНИХ
// ----------------------------------------------------------------------

function generateExtendedSamples(count: number, groupCode: string): ExtendedSampleRow[] {
  return Array.from({ length: count }).map((_, i) => {
    const density = Number((1.1 + Math.random() * 0.3).toFixed(2));
    const phKCl = Number((4.2 + Math.random() * 2.3).toFixed(2));
    const phH2O = Number((phKCl + 0.5 + Math.random() * 0.4).toFixed(2));
    
    const hg = Number((1.2 + Math.random() * 4.5).toFixed(2));
    const hobm = phKCl < 5.0 ? Number((0.2 + Math.random() * 1.5).toFixed(2)) : 0;
    const svo = Number((5.0 + Math.random() * 25.0).toFixed(2));
    
    const capacityT = Number((svo + hg).toFixed(2));
    const sno = Number(((svo / capacityT) * 100).toFixed(2));
    const caco3 = Number((0.05 * hg * density * 20).toFixed(2));

    return {
      id: `S-${String(i + 1).padStart(2, "0")}`,
      group: groupCode,
      phH2O,
      phKCl,
      hobm,
      hg,
      svo,
      sno,
      capacityT,
      caco3,
      density
    };
  });
}

function printReport(title: string, student: string, specName: string, html: string) {
  const w = window.open("", "_blank");
  if (!w) { toast.error("Дозвольте спливаючі вікна для друку звіту"); return; }
  w.document.write(`<!doctype html><html lang="uk"><head><meta charset="utf-8"><title>${title}</title>
  <style>
    body{font-family:Georgia,serif;margin:32px;color:#1e293b;line-height:1.5}
    h1{font-size:20px;margin-bottom:4px;color:#0f172a}
    .sub{font-size:12px;color:#64748b;margin-bottom:16px}
    table{border-collapse:collapse;width:100%;font-size:11px;margin:12px 0}
    td,th{border:1px solid #cbd5e1;padding:5px 8px;text-align:left}
    th{background-color:#f8fafc;font-weight:bold}
    .f{font-family:monospace;background:#f1f5f9;padding:6px;border-radius:4px}
    .ok{color:#15803d;font-weight:bold}
    .bad{color:#b91c1c;font-weight:bold}
    .footer-box{margin-top:24px;padding-top:12px;border-top:1px stroke #94a3b8;display:flex;justify-content:space-between;font-size:11px}
  </style></head>
  <body>
    <h1>${title}</h1>
    <div class="sub">Напрям підготовки: <b>${specName}</b> · Студент: <b>${student || "____________________"}</b> · Дата: ${new Date().toLocaleDateString("uk-UA")}</div>
    ${html}
    <div class="footer-box">
      <div>Підпис студента: ____________</div>
      <div>Оцінка викладача: ____________ / Підпис: ____________</div>
    </div>
  </body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 300);
}

// ----------------------------------------------------------------------
// ГОЛОВНИЙ КОМПОНЕНТ PRACTICE TAB
// ----------------------------------------------------------------------

export function PracticeTab({ onSendToLab }: { onSendToLab?: (sample: ExtendedSampleRow) => void }) {
  const { add, entries, remove, studentName, setStudentName } = useJournal();
  
  const [selectedSpec, setSelectedSpec] = useState<Specialty>(SPECIALTIES[0]!);
  const [subGroup, setSubGroup] = useState("1");
  const fullGroupCode = `${selectedSpec.prefix}-${subGroup}`;

  const [rows, setRows] = useState<ExtendedSampleRow[]>(() => generateExtendedSamples(20, fullGroupCode));
  
  // Режим студента є БАЗОВИМ (за замовчуванням увімкнений)
  const [studentMode, setStudentMode] = useState(true);
  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPin, setInputPin] = useState("");

  const [hidden, setHidden] = useState<Col[]>(["capacityT", "sno", "caco3"]);
  const [answers, setAnswers] = useState<Answers>({});
  const [checks, setChecks] = useState<Record<string, Partial<Record<Col, Check>>> | null>(null);
  const [tol, setTol] = useState("0.1");
  const [showCorrect, setShowCorrect] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>(null);

  const isHidden = (c: Col) => studentMode && hidden.includes(c);

  const newBatch = () => { 
    setRows(generateExtendedSamples(20, fullGroupCode)); 
    setAnswers({}); 
    setChecks(null); 
    toast.success(`Згенеровано 20 нових зразків для групи ${fullGroupCode}`); 
  };

  const resetTask = () => { setAnswers({}); setChecks(null); };

  const handleTeacherToggle = () => {
    if (isTeacherUnlocked) {
      // Заблокувати режим викладача назад
      setIsTeacherUnlocked(false);
      setStudentMode(true);
      setShowCorrect(false);
      toast.info("Режим викладача вимкнено. Активовано режим студента.");
    } else {
      setShowPasswordModal(true);
    }
  };

  const handleUnlockTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === TEACHER_PIN) {
      setIsTeacherUnlocked(true);
      setStudentMode(false);
      setShowCorrect(true);
      setShowPasswordModal(false);
      setInputPin("");
      toast.success("Режим викладача успішно розблоковано!");
    } else {
      toast.error("Невірний пароль викладача!");
    }
  };

  const check = () => {
    const t = Math.max(0, Number(tol.replace(",", ".")) || 0);
    const res: Record<string, Partial<Record<Col, Check>>> = {};
    rows.forEach((r) => { 
      const o: Partial<Record<Col, Check>> = {}; 
      res[r.id] = o; 
      hidden.forEach((c) => { 
        o[c] = checkAnswer(answers[r.id]?.[c] ?? "", r[c], t); 
      }); 
    });
    setChecks(res);
  };

  const score = checks ? Object.values(checks).flatMap((x) => Object.values(x)).filter((c) => c?.status === "correct").length : 0;
  const total = studentMode ? rows.length * hidden.length : 0;

  const exportCSV = () => {
    const headers = [
      "ID зразка", "Група", "pH(H2O)", "pH(KCl)", "Нобм",
      ...COLS.flatMap((c) => (isHidden(c.key) ? [`${c.label} (відповідь)`, `${c.label} (еталон)`] : [`${c.label}, ${c.unit}`]))
    ];

    const data = rows.map((r) => [
      r.id, r.group, r.phH2O.toFixed(2), r.phKCl.toFixed(2), r.hobm.toFixed(2),
      ...COLS.flatMap((c) => (isHidden(c.key) ? [answers[r.id]?.[c.key] ?? "", r[c.key].toFixed(2)] : [r[c.key].toFixed(2)]))
    ]);

    const blob = new Blob([toCSV(headers, data)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); 
    a.download = `zrazky_${fullGroupCode}.csv`; 
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("CSV файл успішно скачано!");
  };

  const report = () => {
    const tr = rows.map((r) => `<tr>
      <td><b>${r.id}</b></td>
      <td>${r.group}</td>
      <td>${r.phH2O.toFixed(2)}</td>
      <td>${r.phKCl.toFixed(2)}</td>
      <td>${r.hobm.toFixed(2)}</td>
      ${COLS.map((c) => {
        const ck = checks?.[r.id]?.[c.key];
        return isHidden(c.key) 
          ? `<td class="${ck?.status === "correct" ? "ok" : ck ? "bad" : ""}">${answers[r.id]?.[c.key] || "—"} / ${fmt(r[c.key])}</td>` 
          : `<td>${fmt(r[c.key])}</td>`;
      }).join("")}
      <td class="f">СНО = 100×${r.svo}/(${r.svo}+${r.hg}) = ${fmt(r.sno)}%</td>
    </tr>`).join("");

    printReport(
      `Офіційний лабораторний звіт: ${selectedSpec.name}`, 
      studentName,
      selectedSpec.name,
      `<p><b>Фокус дослідження:</b> ${selectedSpec.focus}</p>
       <p class="f">Формули розрахунку: ЄП = СВО + Hг | СНО (V%) = (100 × СВО) / ЄП | CaCO₃ = 0.05 × Hг × d × h</p>
       <table>
         <tr>
           <th>ID</th><th>Група</th><th>pH(H₂O)</th><th>pH(KCl)</th><th>Нобм</th>
           ${COLS.map((c) => `<th>${c.label}${isHidden(c.key) ? " (студент / еталон)" : ""}</th>`).join("")}
           <th>Розрахунок СНО (V%)</th>
         </tr>
         ${tr}
       </table>
       ${checks ? `<p><b>Результат перевірки:</b> ${score} з ${total} правильних відповідей (допуск ±${tol}).</p>` : ""}`
    );
  };

  const saveExercise = () => {
    const payload: Saved = { rows, hidden: [...hidden], answers, group: fullGroupCode };
    add({ 
      type: "Завдання", 
      title: `Набір ${fullGroupCode} (20 зразків)`, 
      status: checks ? `${score}/${total} правильно` : studentMode ? "Не перевірено" : "Режим викладача",
      data: { 
        Спеціальність: selectedSpec.name,
        Група: fullGroupCode, 
        "Приховані стовпці": studentMode ? hidden.map((h) => COLS.find((c) => c.key === h)!.label).join(", ") : "—" 
      }, 
      payload 
    });
    toast.success("Вправу успішно збережено в журнал!");
  };

  const openExercise = (e: JournalEntry) => {
    const p = e.payload as Saved;
    setRows(p.rows); 
    setHidden(p.hidden); 
    setAnswers(p.answers); 
    setStudentMode(true); 
    setChecks(null);
    toast.success("Вправу завантажено з журналу"); 
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sel = rows.find((r) => r.id === openRow);

  return (
    <div className="space-y-6">
      {/* МАКЕТ МОДАЛЬНОГО ВІКНА ВВОДУ ПАРОЛЯ ВИКЛАДАЧА */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <Lock className="h-5 w-5 text-purple-600" />
                Вхід у режим викладача
              </div>
              <button onClick={() => setShowPasswordModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleUnlockTeacher} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Введіть пароль викладача (PIN)</label>
                <input
                  type="password"
                  autoFocus
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  placeholder="Пароль..."
                  className="w-full rounded-xl border bg-background px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Btn type="button" variant="outline" onClick={() => setShowPasswordModal(false)} className="text-xs">
                  Скасувати
                </Btn>
                <Btn type="submit" variant="primary" className="text-xs bg-purple-600 hover:bg-purple-700">
                  <Unlock className="h-3.5 w-3.5 mr-1" /> Розблокувати
                </Btn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. ПАНЕЛЬ ГЕНЕРАТОРА ТА ВИБОРУ СПЕЦІАЛЬНОСТІ */}
      <Panel title="4. Генератор завдань та агрохімічний журнал" kind="synthetic">
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {/* Спеціальність (206, 205, 203, 200) */}
          <div className="lg:col-span-4">
            <label className="text-sm"><span className="mb-1 block font-medium">Спеціальність та Базовий код</span>
              <select
                value={selectedSpec.id}
                onChange={(e) => {
                  const spec = SPECIALTIES.find(s => s.id === e.target.value)!;
                  setSelectedSpec(spec);
                  setRows(generateExtendedSamples(20, `${spec.prefix}-${subGroup}`));
                }}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium"
              >
                {SPECIALTIES.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Підгрупа */}
          <div className="lg:col-span-2">
            <label className="text-sm"><span className="mb-1 block font-medium">Підгрупа / №</span>
              <div className="flex items-center">
                <span className="bg-muted px-2 py-2 rounded-l-md border border-r-0 text-xs font-mono text-muted-foreground">
                  {selectedSpec.prefix}-
                </span>
                <input 
                  value={subGroup} 
                  onChange={(e) => {
                    setSubGroup(e.target.value);
                    setRows(generateExtendedSamples(20, `${selectedSpec.prefix}-${e.target.value}`));
                  }} 
                  className="w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm font-mono" 
                  placeholder="1"
                />
              </div>
            </label>
          </div>

          {/* Ім'я студента */}
          <div className="lg:col-span-4">
            <label className="text-sm"><span className="mb-1 block font-medium">Ім'я студента (необов'язково)</span>
              <input 
                value={studentName} 
                onChange={(e) => setStudentName(e.target.value)} 
                placeholder="Шевченко Т. Г."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
              />
            </label>
          </div>

          {/* Допуск */}
          <div className="lg:col-span-2">
            <label className="text-sm"><span className="mb-1 block font-medium">Допуск (±)</span>
              <input 
                type="number" 
                step="0.01" 
                min="0" 
                value={tol} 
                onChange={(e) => setTol(e.target.value)} 
                className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm" 
              />
            </label>
          </div>
        </div>

        {/* МЕТОДИЧНИЙ ФОКУС СПЕЦІАЛЬНОСТІ */}
        <div className="mb-4 rounded-xl border bg-purple-500/10 border-purple-500/20 p-3 text-xs space-y-1">
          <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" /> Напрям дослідження: {selectedSpec.focus}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {selectedSpec.taskDescription}
          </p>
        </div>

        {/* ПАНЕЛЬ РЕЖИМУ ТА АВТОРИЗАЦІЇ ВИКЛАДАЧА */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/40 p-3 text-sm">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              studentMode ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30" : "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30"
            }`}>
              {studentMode ? <GraduationCap className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              {studentMode ? "Режим студента (Активний)" : "Режим викладача (Розблоковано)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isTeacherUnlocked && (
              <div className="flex flex-wrap items-center gap-3 text-xs mr-2">
                <span className="font-medium text-muted-foreground">Приховати стовпці:</span>
                {COLS.map((c) => (
                  <label key={c.key} className="flex items-center gap-1 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="accent-primary" 
                      checked={hidden.includes(c.key)} 
                      onChange={(e) => { 
                        setHidden(e.target.checked ? [...hidden, c.key] : hidden.filter((h) => h !== c.key)); 
                        setChecks(null); 
                      }} 
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            )}

            <button
              onClick={handleTeacherToggle}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isTeacherUnlocked 
                  ? "bg-card hover:bg-muted text-foreground" 
                  : "bg-purple-600 text-white hover:bg-purple-700 shadow-sm"
              }`}
            >
              {isTeacherUnlocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
              {isTeacherUnlocked ? "Вийти з режиму викладача" : "Увійти як викладач"}
            </button>
          </div>
        </div>

        {/* КНОПКИ УПРАВЛІННЯ */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Btn onClick={newBatch}><Shuffle className="h-4 w-4" />Новий набір</Btn>
          {studentMode && hidden.length > 0 && <Btn onClick={check}><CheckCheck className="h-4 w-4" />Перевірити відповіді</Btn>}
          <Btn variant="outline" onClick={resetTask}><RotateCcw className="h-4 w-4" />Скинути завдання</Btn>
          <Btn variant="outline" onClick={saveExercise}><Save className="h-4 w-4" />Зберегти вправу</Btn>
          <Btn variant="outline" onClick={exportCSV}><Download className="h-4 w-4" />Експорт CSV</Btn>
          <Btn variant="outline" onClick={report}><Printer className="h-4 w-4" />Лабораторний звіт</Btn>
        </div>

        {checks && (
          <div className="mb-3 rounded-md bg-emerald-500/15 border border-emerald-500/30 p-2.5 text-sm text-emerald-800 dark:text-emerald-300 font-medium">
            Результат розрахунків: <b>{score}</b> з {total} правильних відповідей. (Допуск похибки: ±{tol})
          </div>
        )}

        {/* ГОЛОВНА ТАБЛИЦЯ ВАРІАНТІВ */}
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full min-w-[760px] text-xs text-left">
            <thead className="bg-muted text-muted-foreground font-semibold">
              <tr>
                <th className="p-2.5">ID</th>
                <th className="p-2.5">Група</th>
                <th className="p-2.5">pH(H₂O)</th>
                <th className="p-2.5">pH(KCl)</th>
                <th className="p-2.5">Нобм <span className="font-normal opacity-70">мг-екв</span></th>
                {COLS.map((c) => (
                  <th key={c.key} className="p-2.5">
                    {c.label} <span className="text-[10px] font-normal opacity-70">{c.unit}</span>
                  </th>
                ))}
                <th className="p-2.5 text-center">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y font-mono">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-muted/40 transition-colors">
                  <td className="p-2.5 font-bold text-foreground">{r.id}</td>
                  <td className="p-2.5 text-muted-foreground text-[11px]">{r.group}</td>
                  <td className="p-2.5 font-semibold text-emerald-600">{r.phH2O.toFixed(2)}</td>
                  <td className="p-2.5 font-semibold text-amber-600">{r.phKCl.toFixed(2)}</td>
                  <td className="p-2.5">{r.hobm.toFixed(2)}</td>

                  {COLS.map((c) => {
                    if (!isHidden(c.key)) {
                      return (
                        <td key={c.key} className={`p-2.5 ${c.key === "sno" ? "font-bold text-indigo-600" : c.key === "svo" ? "font-bold text-emerald-700" : ""}`}>
                          {fmt(r[c.key])}{c.key === "sno" ? "%" : ""}
                        </td>
                      );
                    }
                    const ck = checks?.[r.id]?.[c.key];
                    const cls = ck?.status === "correct" 
                      ? "border-emerald-500 bg-emerald-500/15" 
                      : ck?.status === "rounding" 
                      ? "border-amber-500 bg-amber-500/20" 
                      : ck 
                      ? "border-rose-500 bg-rose-500/15" 
                      : "border-input";
                    
                    return (
                      <td key={c.key} className="p-2.5">
                        <input 
                          aria-label={`${c.label} для ${r.id}`} 
                          inputMode="decimal" 
                          value={answers[r.id]?.[c.key] ?? ""} 
                          onChange={(e) => setAnswers({ ...answers, [r.id]: { ...answers[r.id], [c.key]: e.target.value } })}
                          className={`w-20 rounded border px-2 py-1 font-mono text-xs ${cls}`} 
                        />
                        {ck && ck.status !== "correct" && (
                          <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground" title={ck.message}>
                            {ck.message}{showCorrect && <> Еталон: <b>{fmt(r[c.key])}</b></>}
                          </div>
                        )}
                      </td>
                    );
                  })}

                  <td className="p-2.5 text-center font-sans">
                    <div className="flex items-center justify-center gap-1">
                      <Btn variant="ghost" className="px-2 py-1 text-[11px]" onClick={() => setOpenRow(r.id)}>
                        <BookOpen className="h-3 w-3 mr-1" />Формули
                      </Btn>
                      {onSendToLab && (
                        <Btn 
                          variant="outline" 
                          className="px-2 py-1 text-[11px] text-purple-600 border-purple-500/30 hover:bg-purple-500/10" 
                          onClick={() => {
                            onSendToLab(r);
                            toast.success(`Зразок ${r.id} передано у Віртуальну Лабораторію!`);
                          }}
                        >
                          <FlaskConical className="h-3 w-3 mr-1" />Лаб
                        </Btn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* РОЗГОТНУТИЙ КРОК РОЗРАХУНКУ ДЛЯ ОБРАНОГО ЗРАЗКА */}
        {sel && (
          <div className="mt-4 rounded-xl border bg-card p-4 space-y-2 shadow-sm">
            <div className="flex items-center justify-between border-b pb-2">
              <b className="text-sm font-bold text-foreground">Розклад агрохімічного розрахунку для зразка {sel.id} ({sel.group})</b>
              <Btn variant="ghost" className="px-2" aria-label="Закрити" onClick={() => setOpenRow(null)}>
                <X className="h-4 w-4" />
              </Btn>
            </div>
            
            {studentMode && !isTeacherUnlocked && checks === null ? (
              <p className="text-xs text-muted-foreground">Покрокові рішення приховані у режимі студента. Вони стануть доступними після перевірки відповідей або у режимі викладача.</p>
            ) : (
              <div className="font-mono text-xs space-y-1.5 bg-muted/50 p-3 rounded-lg border">
                <div>1. Ємність поглинання (ЄП): ЄП = СВО + Hг = {sel.svo} + {sel.hg} = <b>{sel.capacityT.toFixed(2)} мг-екв/100 г</b></div>
                <div>2. Ступінь насиченості основами (СНО, V%): V = (100 × СВО) / ЄП = (100 × {sel.svo}) / {sel.capacityT} = <b>{sel.sno.toFixed(2)} %</b></div>
                <div>3. Експрес-норма вапнування (CaCO₃): 0.05 × Hг × d (щільностi {sel.density}) × 20 см = 0.05 × {sel.hg} × {sel.density} × 20 = <b>{sel.caco3.toFixed(2)} т/га</b></div>
              </div>
            )}
          </div>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          СВО, Hг та pH згенеровано синтетично з розпреділенням за ДСТУ; СНО (V%), ЄП та норма вапнування обчислюються автоматично з високою точністю.
        </p>
      </Panel>

      {/* 2. ЛАБОРАТОРНИЙ ЖУРНАЛ ЗБЕРЕЖЕНИХ РОБІТ */}
      <Panel title="Лабораторний журнал збережених сесій" kind="user">
        {entries.length === 0 ? (
          <p className="text-xs text-muted-foreground">Журнал порожній. Збережіть вимірювання з симулятора, калькулятора або вправу з генератора.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-xs text-left">
              <thead className="text-muted-foreground border-b bg-muted/40">
                <tr>
                  <th className="p-2.5">Тип</th>
                  <th className="p-2.5">Назва</th>
                  <th className="p-2.5">Дані</th>
                  <th className="p-2.5">Статус</th>
                  <th className="p-2.5">Студент</th>
                  <th className="p-2.5">Дата</th>
                  <th className="p-2.5 text-center">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {entries.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-2.5">
                      <Tag kind={e.type === "Завдання" ? "synthetic" : e.type === "Вапнування" ? "calc" : "sim"} />
                      <div className="mt-1 font-semibold text-[11px]">{e.type}</div>
                    </td>
                    <td className="p-2.5 font-medium">{e.title}</td>
                    <td className="p-2.5 font-mono text-[11px]">
                      {Object.entries(e.data).map(([k, v]) => <div key={k}>{k}: {v}</div>)}
                    </td>
                    <td className="p-2.5 font-bold text-emerald-600">{e.status}</td>
                    <td className="p-2.5">{e.studentName || "—"}</td>
                    <td className="p-2.5 text-muted-foreground">{e.date}</td>
                    <td className="p-2.5 text-center">
                      <div className="flex justify-center gap-1">
                        {e.payload ? (
                          <Btn variant="ghost" className="px-2 py-1" title="Відкрити вправу" onClick={() => openExercise(e)}>
                            <FolderOpen className="h-3.5 w-3.5" />
                          </Btn>
                        ) : null}
                        <Btn variant="ghost" className="px-2 py-1 text-rose-600 hover:bg-rose-500/10" title="Видалити" onClick={() => remove(e.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-2 text-[11px] text-muted-foreground">Записи зберігаються в межах вашої браузерної сесії.</p>
      </Panel>
    </div>
  );
}