// Pure scientific calculation functions. No UI code here.

export type Result = { ok: true; value: number } | { ok: false; error: string };

export function parseNum(raw: string | number, name: string, opts: { allowZero?: boolean } = {}): Result {
  if (raw === "" || raw === null || raw === undefined) return { ok: false, error: `Поле «${name}» не заповнене.` };
  const v = typeof raw === "number" ? raw : Number(String(raw).replace(",", "."));
  if (!Number.isFinite(v)) return { ok: false, error: `«${name}» має бути числом.` };
  if (v < 0) return { ok: false, error: `«${name}» не може бути від'ємним.` };
  if (v === 0 && !opts.allowZero) return { ok: false, error: `«${name}» має бути більшим за нуль.` };
  return { ok: true, value: v };
}

// ---------- pH classification (KCl) ----------
export type PhCategory = { name: string; color: string; gradient?: string; text: string };

export function roundTo(v: number, d = 1) {
  const f = 10 ** d;
  return Math.round(v * f) / f;
}

export function classifyPhKCl(phRaw: number): PhCategory {
  const ph = roundTo(phRaw, 1);
  if (ph <= 4.5) return { name: "Сильнокислий", color: "#DC2626", text: "Висока рухомість алюмінію та марганцю, пригнічення більшості культур. Вапнування першочергово необхідне." };
  if (ph <= 5.0) return { name: "Середньокислий", color: "#EF4444", text: "Значна потреба у вапнуванні; чутливі культури суттєво знижують продуктивність." };
  if (ph <= 5.5) return { name: "Слабокислий", color: "#F97316", text: "Потреба у вапнуванні середня; залежить від культури сівозміни та гідролітичної кислотності." };
  if (ph <= 6.0) return { name: "Близький до нейтрального", color: "#84CC16", text: "Потреба у вапнуванні слабка; вирішується з урахуванням чутливості культур." };
  if (ph <= 7.0) return { name: "Нейтральний", color: "#22C55E", text: "Сприятливі умови для більшості сільськогосподарських культур." };
  if (ph <= 7.5) return { name: "Слаболужний", color: "#06B6D4", text: "Можливе зниження доступності фосфору та мікроелементів (Fe, Mn, Zn)." };
  return { name: "Сильнолужний", color: "#3B82F6", gradient: "linear-gradient(90deg,#3B82F6,#8B5CF6)", text: "Несприятливі умови: дефіцит мікроелементів, можлива солонцюватість. Вапнування протипоказане." };
}

// ---------- Kappen hydrolytic acidity ----------
export function hydrolyticAcidity(a: number, N: number, K: number, m: number): number {
  if (m <= 0) throw new Error("m має бути > 0");
  return (a * N * K * 100 * 1.75) / m;
}

// ---------- Base saturation ----------
export function baseSaturation(svo: number, hg: number): number {
  if (svo + hg <= 0) throw new Error("SVO + Hг має бути > 0");
  return (100 * svo) / (svo + hg);
}

// ---------- Liming ----------
export const cmToM = (cm: number) => cm / 100;
export const mToCm = (m: number) => m * 100;
export const haToM2 = (ha: number) => ha * 10000;
export const m2ToHa = (m2: number) => m2 / 10000;

/** Academic: tonnes for area S (m²), h in metres */
export function limingAcademic(hg: number, S_m2: number, d: number, h_m: number): number {
  return (hg * 0.5 * S_m2 * d * h_m) / 1000;
}
/** Express: t/ha, h in cm */
export function limingExpress(hg: number, d: number, h_cm: number): number {
  return 0.05 * hg * d * h_cm;
}
/** Material rate from CaCO3-equivalent and neutralizing value in % */
export function materialRate(caco3: number, nvPercent: number): number {
  if (nvPercent <= 0) throw new Error("Нейтралізуюча здатність має бути > 0");
  return caco3 / (nvPercent / 100);
}

export const fmt = (v: number, d = 2) =>
  Number.isFinite(v) ? v.toLocaleString("uk-UA", { minimumFractionDigits: d, maximumFractionDigits: d }) : "—";

// ---------- Synthetic dataset ----------
export type SampleRow = { id: string; group: string; svo: number; hg: number; sno: number };

export function generateSamples(n = 20, group = "АГ-21"): SampleRow[] {
  const rows: SampleRow[] = [];
  for (let i = 0; i < n; i++) {
    const svo = roundTo(5 + Math.random() * 25, 2);
    const hg = roundTo(0.5 + Math.random() * 5.5, 2);
    rows.push({ id: `S-${String(i + 1).padStart(2, "0")}`, group, svo, hg, sno: baseSaturation(svo, hg) });
  }
  return rows;
}

export type Check = { status: "correct" | "rounding" | "wrong" | "empty"; message: string };

export function checkAnswer(input: string, reference: number, tolerance: number): Check {
  if (input.trim() === "") return { status: "empty", message: "Відповідь не введена." };
  const v = Number(input.replace(",", "."));
  if (!Number.isFinite(v)) return { status: "wrong", message: "Введено не число." };
  const diff = Math.abs(v - reference);
  if (diff <= tolerance) return { status: "correct", message: "Правильно." };
  if (diff <= Math.max(tolerance * 10, Math.abs(reference) * 0.02))
    return { status: "rounding", message: "Близько: ймовірно, помилка округлення проміжних значень." };
  return { status: "wrong", message: "Значення суттєво відрізняється — перевірте формулу та підстановку." };
}

export function toCSV(headers: string[], rows: (string | number)[][]): string {
  const esc = (x: string | number) => {
    const s = String(x);
    return /[";\n,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return "\uFEFF" + [headers, ...rows].map((r) => r.map(esc).join(";")).join("\r\n");
}

/** Kappen with aliquot: Hг = (a × K × 0.1 × 100 × 1.75 × V1) / (m × V2) */
export function hydrolyticAcidityExtract(a: number, K: number, m: number, V1: number, V2: number): number {
  if (m <= 0 || V2 <= 0) throw new Error("m і V2 мають бути > 0");
  return (a * K * 0.1 * 100 * 1.75 * V1) / (m * V2);
}
