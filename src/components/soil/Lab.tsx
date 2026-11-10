import React, { useState, useEffect, useRef } from "react";
import { 
  FlaskConical, 
  Droplets, 
  TestTube, 
  RotateCcw, 
  CheckCircle2, 
  Info, 
  Save, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import { toast } from "sonner";
import { useJournal } from "@/lib/journal";
import { Btn } from "./shared";

// ----------------------------------------------------------------------
// 1. ЗРАЗКИ ҐРУНТУ ТА НОРМАТИВНА ГРАДАЦІЯ (ДСТУ 4362:2004)
// ----------------------------------------------------------------------

interface SoilSample {
  id: string;
  code: string;
  name: string;
  type: string;
  density: number;
  phH2O: number;
  phKCl: number;
  hExch: number;  
  hHydro: number; 
}

const SAMPLES: SoilSample[] = [
  { id: "A", code: "ЗР-2026-01", name: "Дерново-підзолистий поверхнево-оглеений", type: "Середньокислий (pH 4.6–5.0)", density: 1.35, phH2O: 5.42, phKCl: 4.68, hExch: 1.25, hHydro: 3.20 },
  { id: "B", code: "ЗР-2026-02", name: "Сірий лісовий легкоглинистий", type: "Слабокислий (pH 5.1–5.5)", density: 1.25, phH2O: 5.95, phKCl: 5.12, hExch: 0.75, hHydro: 2.85 },
  { id: "C", code: "ЗР-2026-03", name: "Чорнозем опідзолений важкосуглинковий", type: "Близький до нейтрального (pH 5.6–6.0)", density: 1.18, phH2O: 6.45, phKCl: 5.70, hExch: 0.15, hHydro: 1.95 },
  { id: "D", code: "ЗР-2026-04", name: "Чорнозем типовий малогумусний", type: "Нейтральний (pH 6.1–7.0)", density: 1.10, phH2O: 7.15, phKCl: 6.45, hExch: 0.00, hHydro: 0.70 }
];

const STEPS_LAB1 = [
  "Суха наважка ґрунту (10 г)",
  "Додавання 50 мл дистильованої H₂O (1:5): утворення суспензії",
  "Перемішування суспензії 5 хв та відстоювання",
  "Калібрування pH-метра (буфери pH 4.01 / 6.86)",
  "Занурення електрода в суспензію та зчитування pH(H₂O)"
];

const STEPS_LAB2 = [
  "Зважування 40 г ґрунту на лабораторних вагах",
  "Додавання 100 мл розчину 1,0 М KCl (1:2,5)",
  "Струшування суспензії 5 хв та фільтрування",
  "Відбір 50 мл фільтрату та внесення фенолфталеїну",
  "Титрування 0,01 М NaOH до слабко-рожевого забарвлення",
  "Фіксація кінцевої точки: слабко-рожеве забарвлення"
];

const STEPS_LAB3 = [
  "Зважування ґрунтової наважки 40 г (ДСТУ 7537:2014)",
  "Додавання 100 мл 1,0 М CH₃COONa (ацетат натрію, pH 8,2)",
  "Витримування 18–20 год та фільтрування",
  "Відбір 50 мл фільтрату та внесення фенолфталеїну",
  "Титрування 0,1 М NaOH до слабко-рожевого забарвлення",
  "Фіксація стійкого слабко-рожевого забарвлення (1 хв)"
];

// ----------------------------------------------------------------------
// ПОЯСНЕННЯ ДО КРОКІВ (що відбувається + який параметр контролюється)
// ----------------------------------------------------------------------

const NOTES: Record<1 | 2 | 3, { t: string; c: string }[]> = {
  1: [
    { t: "Суху повітряно-суху наважку ґрунту (просіяну крізь сито 1 мм) вміщують у хімічний стакан.", c: "Маса наважки: 10,0 ± 0,1 г." },
    { t: "Дистильовану воду без CO₂ вносять мірним циліндром. Ґрунт змочується й утворює суспензію.", c: "Співвідношення ґрунт : розчин = 1 : 5, об'єм 50 мл." },
    { t: "Суспензію перемішують 5 хв, потім дають відстоятися. Тверді частинки осідають, рідина над осадом каламутна.", c: "Тривалість перемішування: 5 хв." },
    { t: "pH-метр калібрують за двома буферними розчинами. Між буферами електрод промивають дистильованою водою.", c: "Нахил електродної характеристики: 95–105 %." },
    { t: "Електрод опускають по центру суспензії, не торкаючись стінок і дна стакана.", c: "Показ стабільний (±0,01 pH) протягом 30 с." },
  ],
  2: [
    { t: "Наважку повітряно-сухого ґрунту зважують на лабораторних вагах.", c: "Маса: 40,0 ± 0,1 г." },
    { t: "До ґрунту в конічній колбі додають розчин KCl.", c: "100 мл 1,0 М KCl, співвідношення 1 : 2,5." },
    { t: "Суспензію струшують, потім фільтрують через щільний фільтр.", c: "Струшування: 5 хв. Фільтрат має бути прозорим." },
    { t: "Піпеткою відбирають прозорий фільтрат у чисту колбу, вносять індикатор.", c: "Аліквота 50,0 мл + 2 краплі 1 % фенолфталеїну." },
    { t: "NaOH подають із бюретки по краплях або безперервно, колбу перемішують. Кінчик бюретки не торкається розчину.", c: "Кінцева точка: слабко-рожеве забарвлення." },
    { t: "Фіксують забарвлення та об'єм титранту за шкалою бюретки.", c: "Забарвлення не зникає протягом 30 с." },
  ],
  3: [
    { t: "Ґрунтову наважку зважують на лабораторних вагах.", c: "Маса: 40,0 ± 0,1 г." },
    { t: "До ґрунту в колбі додають розчин ацетату натрію.", c: "100 мл 1,0 М CH₃COONa, pH 8,2." },
    { t: "Колбу закривають пробкою й залишають стояти, ґрунт осідає. Потім суспензію фільтрують.", c: "Витримування: 18–20 год." },
    { t: "Піпеткою відбирають аліквоту фільтрату в титрувальну колбу, вносять фенолфталеїн.", c: "Аліквота 50,0 мл + 2 краплі фенолфталеїну." },
    { t: "0,1 М NaOH подають із бюретки по краплях або безперервно до появи забарвлення.", c: "Кінцева точка: слабко-рожеве забарвлення." },
    { t: "Фіксують забарвлення та об'єм титранту за шкалою бюретки.", c: "Забарвлення не зникає протягом 1 хв." },
  ],
};

const BURETTE_MAX = 10;   // мл, місткість бюретки на шкалі
const FLOW_STEP = 0.08;   // мл за один такт безперервної подачі
const FLOW_TICK = 200;    // мс

// ----------------------------------------------------------------------
// ДОПОМІЖНІ ФУНКЦІЇ АНІМАЦІЇ
// ----------------------------------------------------------------------

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Прогрес 0..1 для поточного кроку; скидається при зміні key. */
function useProgress(key: string, ms: number) {
  const [s, setS] = useState({ key, p: 0 });
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const v = clamp01((t - t0) / ms);
      setS({ key, p: v });
      if (v < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key, ms]);
  return s.key === key ? s.p : 0;
}

const STEP_MS: Record<number, number[]> = {
  1: [3500, 4000, 9000, 7000, 5000],
  2: [4000, 4500, 9000, 7500, 1200, 1200],
  3: [4000, 4500, 9000, 7500, 1200, 1200],
};

// ----------------------------------------------------------------------
// ПРИМІТИВИ SVG
// ----------------------------------------------------------------------

const Defs = () => (
  <defs>
    <linearGradient id="glassG" x1="0" x2="1">
      <stop offset="0" stopColor="#94a3b8" stopOpacity=".18" />
      <stop offset=".45" stopColor="#fff" stopOpacity=".6" />
      <stop offset="1" stopColor="#64748b" stopOpacity=".22" />
    </linearGradient>
    <linearGradient id="naohG" x1="0" x2="1">
      <stop offset="0" stopColor="#38bdf8" stopOpacity=".8" />
      <stop offset="1" stopColor="#0369a1" stopOpacity=".9" />
    </linearGradient>
  </defs>
);

const Bench = ({ y = 338 }: { y?: number }) => (
  <g>
    <line x1="10" x2="550" y1={y} y2={y} stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
    <rect x="10" y={y + 2} width="540" height="6" fill="#94a3b8" opacity=".12" />
  </g>
);

const Chip = ({ x, y, text }: { x: number; y: number; text: string }) => (
  <g>
    <rect x={x - text.length * 4.6 - 12} y={y - 17} width={text.length * 9.2 + 24} height="28" rx="14" fill="#0f172a" opacity=".82" />
    <text x={x} y={y + 2} textAnchor="middle" fontSize="15" fontFamily="monospace" fill="#e2e8f0">{text}</text>
  </g>
);

const Mound = ({ cx, base, w, h, o = 1 }: { cx: number; base: number; w: number; h: number; o?: number }) => (
  <g opacity={o}>
    <path d={`M${cx - w / 2} ${base} Q${cx - w / 4} ${base - h * 1.1} ${cx} ${base - h} Q${cx + w / 4} ${base - h * 1.1} ${cx + w / 2} ${base} Z`} fill="#8d6e63" />
    <g fill="#5d4037" opacity=".55">
      {[{ a: -0.25, b: 0.35 }, { a: 0.1, b: 0.55 }, { a: 0.3, b: 0.25 }, { a: -0.05, b: 0.2 }, { a: 0.18, b: 0.8 }].map((d, i) => (
        <circle key={i} cx={cx + d.a * w} cy={base - h * d.b} r={Math.max(1.2, w / 40)} />
      ))}
    </g>
  </g>
);

/** Частинки, що рухаються еліптичними орбітами (перемішування / струшування). */
const Swirl = ({ cx, y0, spread, rx }: { cx: number; y0: number; spread: number; rx: number }) => (
  <g fill="#6b4f3f">
    {Array.from({ length: 16 }).map((_, i) => {
      const y = y0 + ((i * 37) % spread);
      const r = 6 + ((i * 7) % rx);
      const ry = 3 + (i % 3) * 2;
      return (
        <circle key={i} r={1.6 + (i % 3) * 0.7} opacity=".75">
          <animateMotion
            dur={`${1 + (i % 5) * 0.22}s`}
            begin={`${-i * 0.37}s`}
            repeatCount="indefinite"
            path={`M${cx - r} ${y} a${r} ${ry} 0 1 0 ${2 * r} 0 a${r} ${ry} 0 1 0 ${-2 * r} 0`}
          />
        </circle>
      );
    })}
  </g>
);

const StaticDots = ({ cx, y0, spread, o }: { cx: number; y0: number; spread: number; o: number }) => (
  <g fill="#6b4f3f" opacity={o}>
    {Array.from({ length: 16 }).map((_, i) => (
      <circle key={i} cx={cx - 40 + ((i * 29) % 80)} cy={y0 + ((i * 37) % spread)} r={1.5 + (i % 3) * 0.7} />
    ))}
  </g>
);

/** Конічна колба. Центр у x=0, дно y=336, горловина зверху y=250. */
const FLASK_D = "M-22 250 L-20 290 L-80 330 Q-84 336 -76 336 L76 336 Q84 336 80 330 L20 290 L22 250";
function Flask({ id, surf, fill, fillOpacity = 1, children }: { id: string; surf: number; fill: string; fillOpacity?: number; children?: React.ReactNode }) {
  return (
    <g>
      <clipPath id={id}><path d={FLASK_D + "Z"} /></clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x="-90" y={surf} width="180" height={345 - surf} fill={fill} fillOpacity={fillOpacity} />
        <path d={`M-90 ${surf} H90`} stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
        {children}
      </g>
      <path d={FLASK_D} fill="url(#glassG)" fillOpacity=".5" stroke="#64748b" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M-27 250 H27" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      <path d="M-12 302 L-52 328" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

/** Мірний циліндр, нахилений над ємністю. (lx, ly) — крайка носика. */
function PouringCylinder({ lx, ly, left, label }: { lx: number; ly: number; left: number; label: string }) {
  const L = 110 * left;
  return (
    <g transform={`translate(${lx} ${ly}) rotate(135)`}>
      <rect x="-13" y="0" width="26" height="110" rx="3" fill="url(#glassG)" stroke="#64748b" strokeWidth="2" />
      <rect x="-2" y="0" width="15" height={L} fill="#bae6fd" fillOpacity=".8" />
      {[20, 40, 60, 80, 100].map((y) => <path key={y} d={`M-13 ${y} h7`} stroke="#475569" strokeWidth="1" />)}
      <text x="0" y="-8" fontSize="12" fill="#475569" textAnchor="middle" transform="rotate(180)">{label}</text>
    </g>
  );
}

const FlowLine = ({ x, y1, y2 }: { x: number; y1: number; y2: number }) => (
  <line x1={x} x2={x} y1={y1} y2={y2} stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 3">
    <animate attributeName="stroke-dashoffset" from="11" to="0" dur=".35s" repeatCount="indefinite" />
  </line>
);

// ----------------------------------------------------------------------
// ЛАБ №1: pH-МЕТРІЯ
// ----------------------------------------------------------------------

function Lab1Scene({ step, p, ph }: { step: number; p: number; ph: number }) {
  const cx = 440, top = 150, bot = 320;
  const fill = step === 0 ? 0 : step === 1 ? ease(seg(p, 0.15, 0.9)) : 1;
  const surf = lerp(316, 214, fill);
  const stir = step === 2 && p < 0.7;
  const settle = step === 2 ? ease(seg(p, 0.7, 1)) : step >= 3 ? 1 : 0;
  const wall = `M${cx - 70} ${top} L${cx - 60} 316 Q${cx - 59} ${bot} ${cx - 54} ${bot} L${cx + 54} ${bot} Q${cx + 59} ${bot} ${cx + 60} 316 L${cx + 70} ${top}`;

  // Електрод: з'являється лише на калібруванні, у суспензію занурюється лише на останньому кроці.
  let ex = 300, ey = 135, eOp = 0;
  if (step === 3) { eOp = seg(p, 0, 0.1); ey = lerp(135, 300, ease(seg(p, 0, 0.2))); }
  else if (step >= 4) {
    eOp = 1;
    if (p < 0.3) ey = lerp(300, 135, ease(seg(p, 0, 0.3)));
    else if (p < 0.6) { ex = lerp(300, 440, ease(seg(p, 0.3, 0.6))); ey = 135; }
    else { ex = 440; ey = lerp(135, 285, ease(seg(p, 0.6, 1))); }
  }

  // Дисплей приладу
  let main = "— —", sub = "";
  if (step === 3) {
    if (p < 0.2) { main = "—.——"; sub = "електрод у буфері"; }
    else if (p < 0.5) { main = lerp(7.2, 4.01, ease(seg(p, 0.2, 0.4))).toFixed(2); sub = p < 0.4 ? "CAL 1: дрейф" : "CAL 1: pH 4.01 ок"; }
    else if (p < 0.6) { main = "—.——"; sub = "промивання електрода"; }
    else if (p < 0.9) { main = lerp(4.5, 6.86, ease(seg(p, 0.6, 0.8))).toFixed(2); sub = p < 0.8 ? "CAL 2: дрейф" : "CAL 2: pH 6.86 ок"; }
    else { main = "6.86"; sub = "нахил 98,7 %"; }
  } else if (step >= 4) {
    if (p < 0.65) { main = "—.——"; sub = "промивання електрода"; }
    else if (p < 0.97) { main = (ph + 0.35 * (1 - ease(seg(p, 0.8, 1)))).toFixed(2); sub = "стабілізація…"; }
    else { main = ph.toFixed(2); sub = "сигнал стабільний"; }
  }

  const bufferLow = step === 3 && p < 0.55;
  const bufferColor = bufferLow ? "#fca5a5" : "#fde68a";
  const mm = Math.floor((seg(p, 0, 0.7) * 300) / 60), ss = Math.floor((seg(p, 0, 0.7) * 300) % 60);

  return (
    <g>
      <Bench />
      {/* Стакан із мішалкою: по центру до кроку калібрування, потім зсувається вправо */}
      <g style={{ transform: `translate(${step < 3 ? -140 : 0}px, 0)`, transition: "transform .8s ease" }}>
      {/* Магнітна мішалка під стаканом */}
      <rect x={cx - 80} y="320" width="160" height="18" rx="5" fill="#475569" />
      <circle cx={cx + 60} cy="329" r="4" fill="#94a3b8" />
      <rect x={cx - 60} y="326" width="40" height="5" rx="2" fill="#1e293b" />

      {/* Стакан */}
      <clipPath id="lab1beaker"><path d={wall + "Z"} /></clipPath>
      <g clipPath="url(#lab1beaker)">
        <Mound cx={cx} base={318} w={100} h={30} o={step === 0 ? 1 : Math.max(0, 1 - fill * 1.1)} />
        {fill > 0 && <rect x={cx - 75} y={surf} width="150" height={330 - surf} fill="#b59a72" fillOpacity={lerp(0.65, 0.4, settle)} />}
        {fill > 0 && <path d={stir ? `M${cx - 70} ${surf} Q${cx - 20} ${surf} ${cx} ${surf + 10} Q${cx + 20} ${surf} ${cx + 70} ${surf}` : `M${cx - 70} ${surf} H${cx + 70}`} stroke="#fff" strokeOpacity=".6" strokeWidth="1.5" fill="none" />}
        {fill > 0.9 && stir && <Swirl cx={cx} y0={surf + 14} spread={80} rx={36} />}
        {fill > 0.5 && !stir && <StaticDots cx={cx} y0={surf + 10} spread={80} o={(1 - settle) * 0.8 * fill} />}
        {settle > 0 && <rect x={cx - 70} y={320 - 4 - 16 * settle} width="140" height="22" fill="#6b4f3f" opacity={0.9} />}
        {stir && (
          <g transform={`translate(${cx} 313)`}>
            <g>
              <animateTransform attributeName="transform" type="scale" values="1 1;0.15 1;1 1" dur=".5s" repeatCount="indefinite" />
              <rect x="-16" y="-3" width="32" height="6" rx="3" fill="#f1f5f9" stroke="#64748b" />
            </g>
          </g>
        )}
      </g>
      <path d={wall} fill="url(#glassG)" fillOpacity=".5" stroke="#64748b" strokeWidth="3" strokeLinejoin="round" />
      <path d={`M${cx - 76} ${top} H${cx + 76}`} stroke="#64748b" strokeWidth="3" strokeLinecap="round" />

      {/* Підписи */}
      {step === 0 && <Chip x={cx} y={128} text="m = 10,0 г (суха наважка)" />}
      {step === 1 && <Chip x={490} y={70} text={`V = ${Math.round(50 * fill)} мл H₂O`} />}
      {step === 2 && <Chip x={cx} y={128} text={stir ? `перемішування ${mm}:${String(ss).padStart(2, "0")} / 5:00` : "відстоювання"} />}
      <text x={cx} y="356" textAnchor="middle" fontSize="14" fill="#64748b">
        {step === 0 ? "Хімічний стакан із сухим ґрунтом" : "Суспензія ґрунту (1 : 5)"}
      </text>

      </g>
      <g style={{ transform: `translate(${step < 3 ? -140 : 0}px, 0)`, transition: "transform .8s ease" }}>
      {/* Мірний циліндр з водою над стаканом (крок 1) */}
      {step === 1 && p < 0.92 && (
        <g>
          <PouringCylinder lx={cx - 40} ly={112} left={1 - ease(seg(p, 0.12, 0.9))} label="50 мл" />
          {p > 0.1 && p < 0.9 && <FlowLine x={cx - 40} y1={118} y2={surf} />}
        </g>
      )}

      </g>

      {/* Прилад і буфер: тільки з кроку калібрування */}
      {step >= 3 && (
        <g opacity={step === 3 ? seg(p, 0, 0.1) : 1}>
          <rect x="30" y="196" width="170" height="142" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
          <rect x="44" y="210" width="142" height="62" rx="5" fill="#071827" />
          <text x="115" y="228" textAnchor="middle" fontSize="12" fill="#94a3b8" fontFamily="monospace">{sub}</text>
          <text x="115" y="258" textAnchor="middle" fontSize="32" fill="#6ee7b7" fontFamily="monospace" fontWeight="bold">{main}</text>
          {[70, 115, 160].map((x) => <circle key={x} cx={x} cy="296" r="8" fill="#334155" stroke="#64748b" />)}
          <text x="115" y="326" textAnchor="middle" fontSize="12" fill="#cbd5e1">pH-МЕТР</text>

          {/* Буферний розчин */}
          <clipPath id="bufClip"><path d="M268 240 L274 316 Q275 320 279 320 L321 320 Q325 320 326 316 L332 240Z" /></clipPath>
          <g clipPath="url(#bufClip)"><rect x="260" y="260" width="80" height="70" fill={bufferColor} fillOpacity=".75" /></g>
          <path d="M268 240 L274 316 Q275 320 279 320 L321 320 Q325 320 326 316 L332 240" fill="url(#glassG)" fillOpacity=".5" stroke="#64748b" strokeWidth="2.5" />
          <text x="300" y="356" textAnchor="middle" fontSize="14" fill="#64748b">{step === 3 ? (bufferLow ? "Буфер pH 4.01" : "Буфер pH 6.86") : "Буфер pH 6.86"}</text>
        </g>
      )}

      {/* Штатив, тримач і прямий електрод */}
      {eOp > 0 && (
        <g opacity={eOp}>
          <line x1="545" x2="545" y1="8" y2="338" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          <line x1="520" x2="560" y1="336" y2="336" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
          <line x1="545" x2={ex} y1="22" y2="22" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
          <rect x={ex - 9} y="16" width="18" height="12" rx="3" fill="#94a3b8" stroke="#475569" />
          <line x1={ex} x2={ex} y1="28" y2={ey - 106} stroke="#94a3b8" strokeWidth="3" />
          <path d={`M${ex - 4} ${ey - 100} C${ex - 4} 70, 170 70, 170 196`} fill="none" stroke="#334155" strokeWidth="2.5" />
          <rect x={ex - 7} y={ey - 106} width="14" height="12" rx="2" fill="#334155" />
          <rect x={ex - 4} y={ey - 94} width="8" height="88" fill="#cbd5e1" stroke="#64748b" />
          <ellipse cx={ex} cy={ey - 7} rx="6" ry="8" fill="#67e8f9" stroke="#0e7490" />
        </g>
      )}
    </g>
  );
}

// ----------------------------------------------------------------------
// ЛАБ №2/3: ЗВАЖУВАННЯ, ДОДАВАННЯ РОЗЧИНУ, СТРУШУВАННЯ/ВИТРИМУВАННЯ + ФІЛЬТРУВАННЯ, АЛІКВОТА, ТИТРУВАННЯ
// ----------------------------------------------------------------------

function WeighScene({ p }: { p: number }) {
  const m = 40 * ease(seg(p, 0.05, 0.95));
  return (
    <g>
      <Bench />
      {/* Банка з ґрунтом */}
      <rect x="70" y="262" width="80" height="76" rx="8" fill="url(#glassG)" stroke="#64748b" strokeWidth="2.5" />
      <rect x="74" y="285" width="72" height="50" rx="5" fill="#8d6e63" />
      <rect x="70" y="252" width="80" height="12" rx="3" fill="#475569" />
      <text x="110" y="356" textAnchor="middle" fontSize="14" fill="#64748b">Повітряно-сухий ґрунт</text>

      {/* Лабораторні ваги */}
      <rect x="190" y="296" width="210" height="42" rx="8" fill="#475569" />
      <rect x="220" y="304" width="150" height="26" rx="4" fill="#071827" />
      <text x="295" y="323" textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="bold" fill="#6ee7b7">{m.toFixed(2)} г</text>
      <rect x="290" y="274" width="10" height="24" fill="#94a3b8" />
      <ellipse cx="295" cy="272" rx="78" ry="7" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      {/* Чашка для зважування з ґрунтом */}
      <path d="M250 262 L340 262 L330 270 L260 270 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
      <Mound cx={295} base={262} w={66} h={4 + 30 * ease(seg(p, 0.05, 0.95))} />
      {/* Шпатель і ґрунт, що сиплеться */}
      {p < 0.97 && (
        <g>
          <g transform="rotate(25 400 190)">
            <rect x="330" y="186" width="90" height="6" rx="3" fill="#94a3b8" />
            <path d="M330 186 L312 189 L330 192 Z" fill="#cbd5e1" />
          </g>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={313 + i * 3} r="2" fill="#6b4f3f">
              <animate attributeName="cy" from="192" to="256" dur=".5s" begin={`${-i * 0.17}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}
      <Chip x={295} y={140} text="m = 40,0 г" />
      <text x="295" y="356" textAnchor="middle" fontSize="14" fill="#64748b">Лабораторні ваги</text>
    </g>
  );
}

function PourScene({ p, lab }: { p: number; lab: 2 | 3 }) {
  const cx = 330;
  const fill = ease(seg(p, 0.15, 0.9));
  const surf = lerp(332, 302, fill);
  const reagent = lab === 2 ? "1,0 М KCl" : "1,0 М CH₃COONa";
  return (
    <g>
      <Bench />
      <g transform={`translate(${cx} 0)`}>
        <Flask id="flPour" surf={surf} fill="#b59a72" fillOpacity={0.6 * fill}>
          <Mound cx={0} base={336} w={110} h={26} o={Math.max(0, 1 - fill * 1.1)} />
          {fill > 0.5 && <StaticDots cx={0} y0={surf + 6} spread={26} o={fill * 0.8} />}
        </Flask>
      </g>
      {p < 0.92 && (
        <g>
          <PouringCylinder lx={cx + 4} ly={218} left={1 - ease(seg(p, 0.12, 0.9))} label="100 мл" />
          {p > 0.1 && p < 0.9 && <FlowLine x={cx} y1={224} y2={surf} />}
        </g>
      )}
      <Chip x={135} y={110} text={`${reagent}, ${Math.round(100 * fill)} мл`} />
      <text x={cx} y="356" textAnchor="middle" fontSize="14" fill="#64748b">Конічна колба: ґрунт + розчин</text>
    </g>
  );
}

function FilterScene({ p, lab }: { p: number; lab: 2 | 3 }) {
  const L = 150, R = 420;
  const phase1 = p < 0.5;
  const q = seg(p, 0, 0.5);
  const f = ease(seg(p, 0.5, 1));
  const leftSurf = lerp(302, 332, f);
  const recvSurf = lerp(336, 306, f);
  const load = seg(f, 0, 0.08) * (1 - seg(f, 0.9, 1));
  const settle = lab === 3 ? ease(q) : 0;
  const clockH = lab === 3 ? 19 * q : 0;
  const mm = Math.floor(q * 300 / 60), ss = Math.floor((q * 300) % 60);
  const dropping = !phase1 && f > 0.08 && f < 0.96;

  return (
    <g>
      <Bench y={350} />
      {/* Підставка: шейкер (лаб. 2) або полиця (лаб. 3) */}
      <rect x={L - 95} y="336" width="190" height="14" rx="4" fill={lab === 2 ? "#475569" : "#a8a29e"} />

      <g transform={`translate(${L} 0)`}>
        <g>
          {lab === 2 && phase1 && <animateTransform attributeName="transform" type="translate" values="-8 0;8 0;-8 0" dur=".45s" repeatCount="indefinite" />}
          <Flask id="flSusp" surf={leftSurf} fill="#b59a72" fillOpacity={0.6 - 0.25 * settle}>
            {lab === 2 && phase1 && <Swirl cx={0} y0={leftSurf + 6} spread={26} rx={40} />}
            {lab === 3 && <StaticDots cx={0} y0={leftSurf + 4} spread={28} o={(1 - settle) * 0.8} />}
            {lab === 3 && <rect x="-90" y={336 - 4 - 14 * settle} width="180" height="20" fill="#6b4f3f" opacity={0.9 * settle} />}
          </Flask>
          {phase1 && <path d="M-23 238 L23 238 L19 254 L-19 254 Z" fill="#b45309" stroke="#78350f" />}
        </g>
      </g>

      {/* Годинник витримування (лаб. 3) */}
      {lab === 3 && phase1 && (
        <g>
          <circle cx={L} cy="140" r="26" fill="#fff" stroke="#64748b" strokeWidth="3" />
          <line x1={L} y1="140" x2={L} y2="122" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" transform={`rotate(${(clockH / 12) * 360} ${L} 140)`} />
          <line x1={L} y1="140" x2={L} y2="118" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${clockH * 360} ${L} 140)`} />
          <circle cx={L} cy="140" r="2.5" fill="#0f172a" />
        </g>
      )}

      {/* Лійка з фільтром і приймальна колба */}
      <g transform={`translate(${R} 0)`}>
        <Flask id="flRecv" surf={recvSurf} fill="#bae6fd" fillOpacity={0.55} />
        <path d="M-40 170 L-4 232 L-4 276 L4 276 L4 232 L40 170" fill="url(#glassG)" fillOpacity=".5" stroke="#64748b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-36 173 L0 237 L36 173 Z" fill="#fefce8" stroke="#d6d3d1" />
        {load > 0 && <path d="M-27 190 L27 190 L0 235 Z" fill="#8d6e63" opacity={0.85 * load} />}
        {dropping && [0, 1].map((i) => (
          <circle key={i} cx="0" r="2.5" fill="#7dd3fc">
            <animate attributeName="cy" from="280" to={recvSurf} dur=".5s" begin={`${-i * 0.25}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {phase1 ? (
        <Chip x={L} y={lab === 3 ? 100 : 160} text={lab === 2 ? `струшування ${mm}:${String(ss).padStart(2, "0")} / 5:00` : `витримування ${clockH.toFixed(0)} год / 18–20 год`} />
      ) : (
        <Chip x={R} y={140} text={`фільтрат ${Math.round(100 * f)} мл`} />
      )}
      <text x={L} y="366" textAnchor="middle" fontSize="14" fill="#64748b">{lab === 2 ? "Шейкер" : "Суспензія осідає"}</text>
      <text x={R} y="366" textAnchor="middle" fontSize="14" fill="#64748b">Фільтр і колба-приймач</text>
    </g>
  );
}

function AliquotScene({ p }: { p: number }) {
  const A = 130, B = 400;
  let px = A, tipY = 150, frac = 0;
  tipY = lerp(150, 322, ease(seg(p, 0, 0.15)));
  frac = seg(p, 0.15, 0.28);
  if (p >= 0.28 && p < 0.4) { tipY = lerp(322, 150, ease(seg(p, 0.28, 0.4))); frac = 1; }
  else if (p >= 0.4 && p < 0.55) { tipY = 150; px = lerp(A, B, ease(seg(p, 0.4, 0.55))); frac = 1; }
  else if (p >= 0.55) {
    px = B; frac = 1 - seg(p, 0.62, 0.76);
    tipY = p < 0.62 ? lerp(150, 230, ease(seg(p, 0.55, 0.62))) : p < 0.76 ? 230 : lerp(230, 150, ease(seg(p, 0.76, 0.82)));
  }
  const recvSurf = 318 + 8 * ease(seg(p, 0.15, 0.28));
  const fillB = ease(seg(p, 0.62, 0.76));
  const surfB = lerp(334, 314, fillB);
  const showPip = p < 0.82;
  const pour = p >= 0.62 && p < 0.76;
  const drops = [0.86, 0.94];

  return (
    <g>
      <Bench />
      <g transform={`translate(${A} 0)`}><Flask id="flA" surf={recvSurf} fill="#bae6fd" fillOpacity={0.55} /></g>
      <g transform={`translate(${B} 0)`}><Flask id="flB" surf={surfB} fill="#bae6fd" fillOpacity={0.55} /></g>
      <text x={A} y="356" textAnchor="middle" fontSize="14" fill="#64748b">Фільтрат</text>
      <text x={B} y="356" textAnchor="middle" fontSize="14" fill="#64748b">Колба для титрування</text>

      {showPip && (
        <g>
          <clipPath id="pipClip"><rect x={px - 14} y={tipY - frac * 92} width="28" height={frac * 92 + 2} /></clipPath>
          <g clipPath="url(#pipClip)" fill="#7dd3fc" opacity=".85">
            <rect x={px - 2.5} y={tipY - 52} width="5" height="52" />
            <ellipse cx={px} cy={tipY - 70} rx="10" ry="18" />
          </g>
          <rect x={px - 2.5} y={tipY - 52} width="5" height="52" fill="none" stroke="#64748b" />
          <path d={`M${px - 2.5} ${tipY - 8} L${px} ${tipY} L${px + 2.5} ${tipY - 8}`} fill="none" stroke="#64748b" />
          <ellipse cx={px} cy={tipY - 70} rx="10" ry="18" fill="url(#glassG)" fillOpacity=".4" stroke="#64748b" strokeWidth="1.5" />
          <rect x={px - 2.5} y={tipY - 122} width="5" height="34" fill="none" stroke="#64748b" />
          <path d={`M${px - 5} ${tipY - 108} h10`} stroke="#ef4444" strokeWidth="1.5" />
          {pour && <FlowLine x={px} y1={tipY + 2} y2={surfB} />}
        </g>
      )}

      {p >= 0.82 && (
        <g>
          <ellipse cx={B} cy="38" rx="11" ry="8" fill="#1f2937" />
          <rect x={B - 20} y="44" width="40" height="52" rx="6" fill="#f59e0b" fillOpacity=".9" />
          <text x={B} y="74" textAnchor="middle" fontSize="9" fill="#451a03">фенолфт.</text>
          <path d={`M${B - 7} 96 L${B - 7} 114 L${B} 128 L${B + 7} 114 L${B + 7} 96 Z`} fill="#e2e8f0" stroke="#64748b" />
          {drops.map((k) => {
            const t = seg(p, k, k + 0.06);
            const b = seg(p, k + 0.06, k + 0.14);
            return (
              <g key={k}>
                {t > 0 && t < 1 && <circle cx={B} cy={lerp(130, surfB, t * t)} r="3" fill="#e2e8f0" stroke="#94a3b8" />}
                {b > 0 && b < 1 && <circle cx={B} cy={surfB + 6} r={lerp(3, 14, b)} fill="#f472b6" opacity={0.5 * (1 - b)} />}
              </g>
            );
          })}
        </g>
      )}
      <Chip x={200} y={90} text={p < 0.62 ? "піпетка: аліквота 50 мл" : p < 0.82 ? "50,0 мл у колбі" : "+ 2 краплі фенолфталеїну"} />
    </g>
  );
}

interface TitProps { lab: 2 | 3; step: number; vol: number; target: number; tol: number; flowing: boolean; drop: boolean; dropKey: number; outcome: "under" | "correct" | "over" | null; }

function TitrationScene({ lab, step, vol, target, tol, flowing, drop, dropKey, outcome }: TitProps) {
  const cx = 330;
  const levelTop = Math.min(186, 34 + vol * 14.2);
  const surf = 314 - Math.min(vol, BURETTE_MAX) * 0.9;
  const over = vol > target + tol;
  const near = vol > 0 && vol >= target - tol && !over;
  const col = over ? "rgba(219,39,119,.88)" : near ? "rgba(244,114,182,.6)" : "rgba(186,230,253,.55)";
  const open = flowing;
  return (
    <g>
      <Bench />
      <rect x="230" y="338" width="200" height="5" rx="2" fill="#f1f5f9" stroke="#cbd5e1" />

      {/* Штатив */}
      <line x1="110" x2="110" y1="14" y2="338" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
      <line x1="60" x2="190" y1="336" y2="336" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
      <line x1="110" x2={cx - 14} y1="44" y2="44" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
      <rect x={cx - 20} y="36" width="40" height="16" rx="4" fill="#94a3b8" stroke="#475569" />

      {/* Бюретка: рівень падає зверху вниз, рідина лишається над краном */}
      <rect x={cx - 12} y="14" width="24" height="172" rx="4" fill="url(#glassG)" stroke="#64748b" strokeWidth="2" />
      <rect x={cx - 8} y={levelTop} width="16" height={186 - levelTop} fill="url(#naohG)" />
      <path d={`M${cx - 8} ${levelTop} H${cx + 8}`} stroke="#e0f2fe" strokeWidth="1.5" />
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={i}>
          <path d={`M${cx + 12} ${34 + i * 14.2} h${i % 2 === 0 ? 8 : 5}`} stroke="#475569" strokeWidth="1.2" />
          <text x={cx + 24} y={37 + i * 14.2} fontSize="11" fill="#475569">{i}</text>
        </g>
      ))}
      <text x={cx + 50} y="100" fontSize="13" fill="#0369a1">{lab === 2 ? "0,01 М NaOH" : "0,1 М NaOH"}</text>

      {/* Кран і носик (носик над колбою, не занурений) */}
      <rect x={cx - 16} y="186" width="32" height="8" rx="2" fill="#475569" />
      <rect x={cx} y="187" width="36" height="6" rx="3" fill="#0f172a" style={{ transformOrigin: `${cx}px 190px`, transform: `rotate(${open ? -80 : 0}deg)`, transition: "transform .3s" }} />
      <path d={`M${cx - 3} 194 L${cx - 3} 214 L${cx} 226 L${cx + 3} 214 L${cx + 3} 194 Z`} fill="#bae6fd" stroke="#64748b" strokeWidth="1.5" />
      <path d={`M${cx} 194 L${cx} 220`} stroke="#0284c7" strokeWidth="2" />

      {/* Безперервна струмина або окрема крапля: рух лише вниз */}
      {open && <FlowLine x={cx} y1={228} y2={surf} />}
      {!open && drop && (
        <circle key={dropKey} cx={cx} cy="228" r="3.5" fill="#0284c7" stroke="#38bdf8" style={{ animation: "dropFall .45s cubic-bezier(.5,0,1,1) forwards", "--fall": `${surf - 230}px` } as React.CSSProperties} />
      )}

      {/* Колба */}
      <g transform={`translate(${cx} 0)`}>
        <Flask id="flTit" surf={surf} fill={col} fillOpacity={1}>
          {(open || drop) && vol > 0 && (
            <circle key={drop ? dropKey : "s"} cx="0" cy={surf + 6} r="16" fill="#ec4899" style={{ transformBox: "fill-box", transformOrigin: "center", animation: open ? "none" : "pinkBloom 1.1s ease-out forwards", opacity: open ? 0.45 : undefined }} />
          )}
        </Flask>
      </g>
      <text x={cx} y="356" textAnchor="middle" fontSize="14" fill="#64748b">50 мл фільтрату + фенолфталеїн</text>
      {step === 5 && outcome && (
        <Chip x={470} y={300} text={outcome === "correct" ? "стійке слабко-рожеве" : outcome === "over" ? "малинове (надлишок)" : "безбарвне (недотитровано)"} />
      )}
    </g>
  );
}

// ----------------------------------------------------------------------
// КОРЕНЕВА СЦЕНА
// ----------------------------------------------------------------------

interface SceneProps extends Omit<TitProps, "lab"> {
  lab: 1 | 2 | 3;
  ph: number;
  onSettled: (done: boolean) => void;
}

function LabScene(props: SceneProps) {
  const { lab, step, ph, onSettled } = props;
  const p = useProgress(`${lab}-${step}`, STEP_MS[lab]?.[step] ?? 1000);
  const done = p >= 1;
  useEffect(() => { onSettled(done); }, [done, onSettled]);
  return (
    <svg viewBox="0 0 560 380" className="w-full max-w-[620px]" role="img" aria-label="Візуалізація етапу лабораторної роботи">
      <Defs />
      {lab === 1 ? <Lab1Scene step={step} p={p} ph={ph} />
        : step === 0 ? <WeighScene p={p} />
        : step === 1 ? <PourScene p={p} lab={lab} />
        : step === 2 ? <FilterScene p={p} lab={lab} />
        : step === 3 ? <AliquotScene p={p} />
        : <TitrationScene {...props} lab={lab} />}
    </svg>
  );
}

// ----------------------------------------------------------------------
// ГОЛОВНИЙ КОМПОНЕНТ ВІРТУАЛЬНОЇ ЛАБОРАТОРІЇ
// ----------------------------------------------------------------------

export function LabTab() {
  const { add } = useJournal();
  
  const [selectedSample, setSelectedSample] = useState<SoilSample>(SAMPLES[0]!);
  const [labMode, setLabMode] = useState<"learn" | "control">("learn");
  const [activeLab, setActiveLab] = useState<1 | 2 | 3>(1);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const [phMeterReading, setPhMeterReading] = useState<number | null>(null);
  const [titrantVolume, setTitrantVolume] = useState<number>(0);

  const [isAutoTitrating, setIsAutoTitrating] = useState<boolean>(false);
  const [pour, setPour] = useState<"drop" | "stream" | null>(null);
  const [dropKey, setDropKey] = useState<number>(0);
  const [sceneDone, setSceneDone] = useState<boolean>(false);
  const pourTimer = useRef<number | null>(null);
  const [titrationOutcome, setTitrationOutcome] = useState<"under" | "correct" | "over" | null>(null);

  const [resultsLab1, setResultsLab1] = useState<{ phH2O: number; date: string } | null>(null);
  const [resultsLab2, setResultsLab2] = useState<{ phKCl: number; hExch: number; vNaOH: number; outcome: "under" | "correct" | "over" } | null>(null);
  const [resultsLab3, setResultsLab3] = useState<{ hHydro: number; vNaOH: number; outcome: "under" | "correct" | "over" } | null>(null);

  const targetEndpointVolume = activeLab === 2
    ? (selectedSample.hExch * 40 * 50) / (100 * 50 * 0.01 * 10)
    : selectedSample.hHydro / 0.875;

  const endpointTolerance = Math.max(0.05, targetEndpointVolume * 0.02);

  // Безперервна подача титранту: кран відкритий, рівень у бюретці падає, об'єм росте
  useEffect(() => {
    if (!isAutoTitrating || currentStep !== 4 || titrationOutcome !== null) return;
    const id = window.setInterval(() => {
      setTitrantVolume((prev) => Math.min(BURETTE_MAX, Number((prev + FLOW_STEP).toFixed(2))));
    }, FLOW_TICK);
    return () => window.clearInterval(id);
  }, [isAutoTitrating, currentStep, titrationOutcome]);

  // Бюретка порожня: кран закривається
  useEffect(() => {
    if (isAutoTitrating && titrantVolume >= BURETTE_MAX) setIsAutoTitrating(false);
  }, [isAutoTitrating, titrantVolume]);

  useEffect(() => () => { if (pourTimer.current) window.clearTimeout(pourTimer.current); }, []);

  const handleSelectLab = (labId: 1 | 2 | 3) => {
    setActiveLab(labId);
    setCurrentStep(0);
    setPhMeterReading(null);
    setTitrantVolume(0);
    setIsAutoTitrating(false);
    setPour(null);
    setTitrationOutcome(null);
  };

  const handleResetLab = () => {
    setCurrentStep(0);
    setPhMeterReading(null);
    setTitrantVolume(0);
    setIsAutoTitrating(false);
    setPour(null);
    setTitrationOutcome(null);
  };

  const handleAddDrop = (amount: number) => {
    if (currentStep !== 4 || titrationOutcome !== null) return;
    setTitrantVolume((prev) => Math.min(BURETTE_MAX, Number((prev + amount).toFixed(2))));
    const single = amount <= 0.02;
    if (single) setDropKey((k) => k + 1);
    setPour(single ? "drop" : "stream");
    if (pourTimer.current) window.clearTimeout(pourTimer.current);
    pourTimer.current = window.setTimeout(() => setPour(null), single ? 450 : 700);
  };

  const handleFinishTitration = () => {
    if (currentStep !== 4) return;
    setIsAutoTitrating(false);
    setPour(null);
    let outcome: "under" | "correct" | "over";
    if (titrantVolume < targetEndpointVolume - endpointTolerance) outcome = "under";
    else if (titrantVolume > targetEndpointVolume + endpointTolerance) outcome = "over";
    else outcome = "correct";
    setTitrationOutcome(outcome);
    setCurrentStep(5);
  };

  const getTitrationMessage = () => {
    if (titrationOutcome === "under") return {
      title: "Недотитрування",
      body: `Додано ${titrantVolume.toFixed(2)} мл NaOH замість необхідних ${targetEndpointVolume.toFixed(2)} мл. Стійке забарвлення не досягнуте, частина H⁺ залишилася ненейтралізованою.`,
      tone: "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300"
    };
    if (titrationOutcome === "over") return {
      title: "Перетитрування",
      body: `Додано ${titrantVolume.toFixed(2)} мл NaOH, що перевищує кінцеву точку (${targetEndpointVolume.toFixed(2)} мл). Надлишок лугу надав малинового забарвлення.`,
      tone: "border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-300"
    };
    if (titrationOutcome === "correct") return {
      title: "Кінцеву точку зафіксовано коректно",
      body: `Витрата титранту ${titrantVolume.toFixed(2)} мл відповідає нормі. Отримано стійке слабко-рожеве забарвлення фенолфталеїну.`,
      tone: "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
    };
    return null;
  };

  const handleNextStep = () => {
    const totalSteps = activeLab === 1 ? STEPS_LAB1.length : activeLab === 2 ? STEPS_LAB2.length : STEPS_LAB3.length;
    
    if (activeLab === 1 && currentStep === 3) {
      setPhMeterReading(selectedSample.phH2O);
    }

    if ((activeLab === 2 || activeLab === 3) && currentStep === 3) {
      setTitrantVolume(0);
    }

    if ((activeLab === 2 || activeLab === 3) && currentStep === 4) {
      toast.error("Спочатку завершіть титрування та зафіксуйте кінцеву точку.");
      return;
    }
    if (currentStep < totalSteps - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleCompleteLab = () => {
    const now = new Date().toLocaleDateString("uk-UA");
    if (activeLab === 1) {
      setResultsLab1({ phH2O: selectedSample.phH2O, date: now });
      toast.success("Лабораторну роботу № 1 завершено!");
    } else if (activeLab === 2) {
      if (currentStep !== 5 || titrationOutcome === null) {
        toast.error("Завершіть титрування та зафіксуйте кінцеву точку.");
        return;
      }
      const measured = targetEndpointVolume > 0 ? selectedSample.hExch * titrantVolume / targetEndpointVolume : 0;
      setResultsLab2({ phKCl: selectedSample.phKCl, hExch: measured, vNaOH: titrantVolume, outcome: titrationOutcome });
      toast.success("Результат титрування № 2 внесено до протоколу.");
    } else if (activeLab === 3) {
      if (currentStep !== 5 || titrationOutcome === null) {
        toast.error("Завершіть титрування та зафіксуйте кінцеву точку.");
        return;
      }
      const measured = targetEndpointVolume > 0 ? selectedSample.hHydro * titrantVolume / targetEndpointVolume : 0;
      setResultsLab3({ hHydro: measured, vNaOH: titrantVolume, outcome: titrationOutcome });
      toast.success("Результат титрування № 3 внесено до протоколу.");
    }
  };

  const calcCaCO3 = (hHydro: number, density: number) => {
    return (0.05 * hHydro * density * 20).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes dropFall {
          0% { transform: translateY(0); opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(var(--fall, 80px)); opacity: 0.2; }
        }
        @keyframes pinkBloom {
          0% { transform: scale(0.3); opacity: 0.85; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) { svg animate, svg animateMotion, svg animateTransform { display: none; } }
      `}</style>
      
      {/* ПАНЕЛЬ КЕРУВАННЯ ЗРАЗКОМ ТА РЕЖИМОМ */}
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8 p-4 rounded-2xl border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FlaskConical className="h-4 w-4 text-purple-600" /> Досліджуваний ґрунтовий зразок
            </span>
            <span className="text-xs font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-500/20">
              {selectedSample.code}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => {
                  setSelectedSample(sample);
                  handleResetLab();
                  setResultsLab1(null);
                  setResultsLab2(null);
                  setResultsLab3(null);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSample.id === sample.id
                    ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/30 font-semibold"
                    : "bg-card hover:bg-muted"
                }`}
              >
                <div className="text-xs font-bold text-foreground truncate">{sample.name}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{sample.type}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 p-4 rounded-2xl border bg-card flex flex-col justify-between space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> Режим виконання
          </span>
          <div className="flex p-1 bg-muted rounded-xl border">
            <button
              onClick={() => setLabMode("learn")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                labMode === "learn" ? "bg-background text-emerald-700 dark:text-emerald-400 shadow-sm" : "text-muted-foreground"
              }`}
            >
              🎓 Навчальний
            </button>
            <button
              onClick={() => setLabMode("control")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                labMode === "control" ? "bg-background text-rose-700 dark:text-rose-400 shadow-sm" : "text-muted-foreground"
              }`}
            >
              ⏱️ Контрольний
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            {labMode === "learn" 
              ? "Покрокові методичні підказки та візуальний контроль індикатора."
              : "Самостійне фіксування об'ємів титранту без підказок."}
          </p>
        </div>
      </div>

      {/* ПЕРЕМИКАЧ ТРЬОХ ЛАБОРАТОРНИХ РОБІТ */}
      <div className="flex flex-wrap gap-2 p-1 bg-muted/60 rounded-xl border">
        <button
          onClick={() => handleSelectLab(1)}
          className={`flex-1 min-w-[200px] px-4 py-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-between ${
            activeLab === 1 ? "bg-background text-emerald-700 dark:text-emerald-400 shadow border" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-emerald-600" /> Лаб №1: Актуальна pH(H₂O)
          </span>
          {resultsLab1 && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
        </button>

        <button
          onClick={() => handleSelectLab(2)}
          className={`flex-1 min-w-[200px] px-4 py-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-between ${
            activeLab === 2 ? "bg-background text-amber-700 dark:text-amber-400 shadow border" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-2">
            <TestTube className="h-4 w-4 text-amber-600" /> Лаб №2: Обмінна (1 М KCl)
          </span>
          {resultsLab2 && <CheckCircle2 className="h-4 w-4 text-amber-600" />}
        </button>

        <button
          onClick={() => handleSelectLab(3)}
          className={`flex-1 min-w-[200px] px-4 py-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-between ${
            activeLab === 3 ? "bg-background text-indigo-700 dark:text-indigo-400 shadow border" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-indigo-600" /> Лаб №3: Гідролітична (CH₃COONa)
          </span>
          {resultsLab3 && <CheckCircle2 className="h-4 w-4 text-indigo-600" />}
        </button>
      </div>

      {/* ГОЛОВНИЙ ЛАБОРАТОРНИЙ СТЕНД */}
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7 p-6 rounded-2xl border bg-card flex flex-col justify-between min-h-[460px] relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-center border-b pb-3 text-xs">
            <div className="font-semibold text-foreground">
              {activeLab === 1 && "Лабораторна робота № 1 (ДСТУ ISO 10390:2007 / ДСТУ 7862:2015)"}
              {activeLab === 2 && "Лабораторна робота № 2 (ДСТУ 7910:2015 — 1.0 М KCl)"}
              {activeLab === 3 && "Лабораторна робота № 3 (ДСТУ 7537:2014 — Каппен / CH₃COONa)"}
            </div>
            <span className="font-mono text-[11px] bg-muted px-2 py-0.5 rounded">
              Крок {currentStep + 1} з {activeLab === 1 ? STEPS_LAB1.length : activeLab === 2 ? STEPS_LAB2.length : STEPS_LAB3.length}
            </span>
          </div>

          <div className="my-5 rounded-2xl border bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950/70 dark:to-slate-900/50 p-4 md:p-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400" />
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-[1fr_190px] gap-4 items-center">
                <div className="flex justify-center items-center min-h-[300px]">
                  <LabScene
                    lab={activeLab}
                    step={currentStep}
                    ph={selectedSample.phH2O}
                    vol={titrantVolume}
                    target={targetEndpointVolume}
                    tol={endpointTolerance}
                    flowing={isAutoTitrating || pour === "stream"}
                    drop={pour === "drop"}
                    dropKey={dropKey}
                    outcome={titrationOutcome}
                    onSettled={setSceneDone}
                  />
                </div>

                {activeLab === 1 ? (
                  <div className="rounded-xl border bg-white/80 dark:bg-slate-900/80 p-4 space-y-2 shadow-sm">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Цифровий індикатор</div>
                    <div className="font-mono text-4xl font-bold tracking-tight text-emerald-600">
                      {currentStep >= 4 && phMeterReading !== null && sceneDone ? phMeterReading.toFixed(2) : "— —"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentStep < 3 ? "Прилад ще не підготовлено" : currentStep === 3 ? "Калібрування за буферами" : sceneDone ? "Сигнал стабілізовано" : "Електрод переміщується"}
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 transition-all duration-500" style={{ width: currentStep >= 4 && phMeterReading !== null && sceneDone ? `${Math.max(5, Math.min(100, phMeterReading * 10))}%` : "0%" }} />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border bg-white/85 dark:bg-slate-900/85 p-4 shadow-sm space-y-3">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Витрата титранту</div>
                    <div className="font-mono text-3xl font-bold tabular-nums">
                      {titrantVolume.toFixed(2)}<span className="text-sm ml-1 text-muted-foreground">мл</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">{activeLab === 2 ? "0.01 М NaOH" : "0.1 М NaOH"}</div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full bg-sky-500 transition-all" style={{ width: `${Math.min(100, labMode === "learn" ? (titrantVolume / Math.max(targetEndpointVolume * 1.5, 0.1)) * 100 : (titrantVolume / BURETTE_MAX) * 100)}%` }} />
                    </div>
                    {labMode === "learn" && (
                      <div className="text-[10px] text-muted-foreground">Орієнтир еквівалентності: {targetEndpointVolume.toFixed(2)} мл</div>
                    )}
                  </div>
                )}
              </div>

              {/* Панель керування краном та порціями */}
              {activeLab !== 1 && currentStep === 4 && (
                <div className="space-y-3 border-t pt-3">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => setIsAutoTitrating(!isAutoTitrating)}
                      disabled={titrationOutcome !== null || titrantVolume >= BURETTE_MAX}
                      className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40 ${
                        isAutoTitrating ? "bg-rose-600 text-white shadow-sm hover:bg-rose-700" : "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                      }`}
                    >
                      {isAutoTitrating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {isAutoTitrating ? "Перекрити кран" : "Відкрити кран (безперервне титрування)"}
                    </button>

                    <div className="h-4 w-[1px] bg-border hidden sm:block" />

                    <button onClick={() => handleAddDrop(0.02)} disabled={titrationOutcome !== null || isAutoTitrating} className="px-3 py-2 rounded-lg border bg-card text-xs font-semibold hover:bg-muted disabled:opacity-40">+ 1 крапля (0.02 мл)</button>
                    <button onClick={() => handleAddDrop(0.05)} disabled={titrationOutcome !== null || isAutoTitrating} className="px-3 py-2 rounded-lg border bg-card text-xs font-semibold hover:bg-muted disabled:opacity-40">+ 0.05 мл</button>
                    <button onClick={() => handleAddDrop(0.20)} disabled={titrationOutcome !== null || isAutoTitrating} className="px-3 py-2 rounded-lg border bg-card text-xs font-semibold hover:bg-muted disabled:opacity-40">+ 0.20 мл</button>

                    <button onClick={handleFinishTitration} disabled={titrantVolume <= 0 || titrationOutcome !== null} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 disabled:opacity-40">Завершити титрування</button>
                  </div>
                </div>
              )}

              {titrationOutcome && getTitrationMessage() && (
                <div className={`rounded-xl border p-3 text-xs space-y-1 ${getTitrationMessage()!.tone}`}>
                  <div className="font-bold">{getTitrationMessage()!.title}</div>
                  <p className="leading-relaxed">{getTitrationMessage()!.body}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl border bg-muted/40 text-xs space-y-1">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <Info className="h-4 w-4 text-primary" />
              Крок {currentStep + 1}: {
                activeLab === 1 ? STEPS_LAB1[currentStep] :
                activeLab === 2 ? STEPS_LAB2[currentStep] : STEPS_LAB3[currentStep]
              }
            </div>
            {labMode === "learn" && NOTES[activeLab][currentStep] && (
              <>
                <p className="text-muted-foreground leading-relaxed">{NOTES[activeLab][currentStep]!.t}</p>
                <p className="font-medium text-foreground">Контрольований параметр: {NOTES[activeLab][currentStep]!.c}</p>
              </>
            )}
          </div>

          <div className="pt-4 border-t flex items-center justify-between">
            <Btn variant="outline" onClick={handleResetLab} className="text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Скинути
            </Btn>

            <div className="flex gap-2">
              <Btn 
                onClick={handleNextStep} 
                disabled={currentStep >= (activeLab === 1 ? STEPS_LAB1.length - 1 : activeLab === 2 ? STEPS_LAB2.length - 1 : STEPS_LAB3.length - 1) || ((activeLab === 2 || activeLab === 3) && currentStep === 4)}
                className="text-xs"
              >
                Наступний крок <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Btn>

              <Btn 
                variant="primary"
                onClick={handleCompleteLab}
                disabled={(activeLab === 1 && currentStep < STEPS_LAB1.length - 1) || ((activeLab === 2 || activeLab === 3) && (currentStep !== 5 || titrationOutcome === null))}
                className="text-xs"
              >
                <Save className="h-3.5 w-3.5 mr-1" /> Фіксувати в протокол
              </Btn>
            </div>
          </div>
        </div>

        {/* ПРАВА ЧАСТИНА: ПІДСУМКОВИЙ ЛАБОРАТОРНИЙ ПРОТОКОЛ */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl border bg-card space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Зведений лабораторний протокол
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground">{selectedSample.code}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50 text-muted-foreground">
                    <th className="p-2 font-medium">Показник</th>
                    <th className="p-2 font-medium">Результат</th>
                    <th className="p-2 font-medium">Одиниці вимірювання</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-2 font-medium">Актуальна кислотність</td>
                    <td className="p-2 font-mono font-bold text-emerald-600">
                      {resultsLab1 ? resultsLab1.phH2O.toFixed(2) : "—"}
                    </td>
                    <td className="p-2 text-muted-foreground font-mono">pH H₂O</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">pH сольової витяжки</td>
                    <td className="p-2 font-mono font-bold text-amber-600">
                      {resultsLab2 ? resultsLab2.phKCl.toFixed(2) : "—"}
                    </td>
                    <td className="p-2 text-muted-foreground font-mono">pH KCl</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Обмінна кислотність</td>
                    <td className="p-2 font-mono font-bold text-amber-600">
                      {resultsLab2 ? resultsLab2.hExch.toFixed(2) : "—"}
                      {resultsLab2 && <div className="text-[9px] font-normal text-muted-foreground">NaOH: {resultsLab2.vNaOH.toFixed(2)} мл</div>}
                    </td>
                    <td className="p-2 text-muted-foreground font-mono">мг-екв/100 г ґрунту</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Гідролітична кислотність (Hг)</td>
                    <td className="p-2 font-mono font-bold text-indigo-600">
                      {resultsLab3 ? resultsLab3.hHydro.toFixed(2) : "—"}
                      {resultsLab3 && <div className="text-[9px] font-normal text-muted-foreground">NaOH: {resultsLab3.vNaOH.toFixed(2)} мл</div>}
                    </td>
                    <td className="p-2 text-muted-foreground font-mono">мг-екв/100 г ґрунту</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {resultsLab3 && (
              <div className="p-3.5 rounded-xl border bg-purple-500/10 border-purple-500/30 text-xs space-y-1.5">
                <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center justify-between">
                  <span>Розрахована норма CaCO₃:</span>
                  <span className="font-mono text-sm font-extrabold text-foreground">
                    {calcCaCO3(resultsLab3.hHydro, selectedSample.density)} т/га
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Повна норма вапнування для орного шару 20 см (щільність {selectedSample.density} г/см³) за Каппеном.
                </p>
              </div>
            )}

            <button
              onClick={() => {
                if (!resultsLab1 || !resultsLab2 || !resultsLab3) {
                  toast.error("Будь ласка, виконайте всі 3 лабораторні роботи перед збереженням підсумкового протоколу.");
                  return;
                }
                add({
                  type: "Титрування",
                  title: `Офіційний Протокол: ${selectedSample.code}`,
                  status: "Завершено",
                  data: {
                    "Зразок": selectedSample.name,
                    "pH(H₂O)": resultsLab1.phH2O.toFixed(2),
                    "pH(KCl)": resultsLab2.phKCl.toFixed(2),
                    "Обмінна Hобм": `${resultsLab2.hExch.toFixed(2)} мг-екв/100г`,
                    "Гідролітична Hг": `${resultsLab3.hHydro.toFixed(2)} мг-екв/100г`,
                    "Норма CaCO₃": `${calcCaCO3(resultsLab3.hHydro, selectedSample.density)} т/га`
                  }
                });
                toast.success("Підсумковий протокол успішно збережено в Журнал!");
              }}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-sm transition-all"
            >
              <Save className="h-4 w-4" /> Зберегти протокол у Журнал
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}