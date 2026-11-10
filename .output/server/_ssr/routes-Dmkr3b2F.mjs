import { n as __toESM } from "../_runtime.mjs";
import { i as performance_default } from "../_libs/h3-v2+rou3+srvx+unenv.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as ExternalLink, B as Calculator, C as History, D as FolderOpen, E as Funnel, F as ClipboardList, H as Activity, I as CircleQuestionMark, L as CircleCheck, M as Droplets, N as Droplet, O as FlaskConical, P as Download, R as ChevronRight, S as Info, T as GraduationCap, V as BookOpen, _ as MessageSquare, a as TestTubeDiagonal, b as Leaf, c as Shuffle, d as Scale, f as Save, g as Pause, h as Play, i as TestTube, j as Eraser, k as FileText, l as ShieldCheck, m as Printer, n as TriangleAlert, o as Sparkles, p as RotateCcw, r as Trash2, s as Sigma, t as X, u as ShieldAlert, v as Lock, w as Heart, x as Layers, y as LockOpen, z as CheckCheck } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dmkr3b2F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var JournalCtx = (0, import_react.createContext)(null);
function JournalProvider({ children }) {
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [studentName, setStudentName] = (0, import_react.useState)("");
	const add = (e) => setEntries((p) => [{
		...e,
		id: crypto.randomUUID(),
		date: (/* @__PURE__ */ new Date()).toLocaleString("uk-UA"),
		studentName
	}, ...p]);
	const remove = (id) => setEntries((p) => p.filter((x) => x.id !== id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalCtx.Provider, {
		value: {
			entries,
			add,
			remove,
			studentName,
			setStudentName
		},
		children
	});
}
function useJournal() {
	const c = (0, import_react.useContext)(JournalCtx);
	if (!c) throw new Error("JournalProvider missing");
	return c;
}
function parseNum(raw, name, opts = {}) {
	if (raw === "" || raw === null || raw === void 0) return {
		ok: false,
		error: `Поле «${name}» не заповнене.`
	};
	const v = typeof raw === "number" ? raw : Number(String(raw).replace(",", "."));
	if (!Number.isFinite(v)) return {
		ok: false,
		error: `«${name}» має бути числом.`
	};
	if (v < 0) return {
		ok: false,
		error: `«${name}» не може бути від'ємним.`
	};
	if (v === 0 && !opts.allowZero) return {
		ok: false,
		error: `«${name}» має бути більшим за нуль.`
	};
	return {
		ok: true,
		value: v
	};
}
function baseSaturation(svo, hg) {
	if (svo + hg <= 0) throw new Error("SVO + Hг має бути > 0");
	return 100 * svo / (svo + hg);
}
var cmToM = (cm) => cm / 100;
var mToCm = (m) => m * 100;
var haToM2 = (ha) => ha * 1e4;
var m2ToHa = (m2) => m2 / 1e4;
/** Academic: tonnes for area S (m²), h in metres */
function limingAcademic(hg, S_m2, d, h_m) {
	return hg * .5 * S_m2 * d * h_m / 1e3;
}
/** Express: t/ha, h in cm */
function limingExpress(hg, d, h_cm) {
	return .05 * hg * d * h_cm;
}
/** Material rate from CaCO3-equivalent and neutralizing value in % */
function materialRate(caco3, nvPercent) {
	if (nvPercent <= 0) throw new Error("Нейтралізуюча здатність має бути > 0");
	return caco3 / (nvPercent / 100);
}
var fmt = (v, d = 2) => Number.isFinite(v) ? v.toLocaleString("uk-UA", {
	minimumFractionDigits: d,
	maximumFractionDigits: d
}) : "—";
function checkAnswer(input, reference, tolerance) {
	if (input.trim() === "") return {
		status: "empty",
		message: "Відповідь не введена."
	};
	const v = Number(input.replace(",", "."));
	if (!Number.isFinite(v)) return {
		status: "wrong",
		message: "Введено не число."
	};
	const diff = Math.abs(v - reference);
	if (diff <= tolerance) return {
		status: "correct",
		message: "Правильно."
	};
	if (diff <= Math.max(tolerance * 10, Math.abs(reference) * .02)) return {
		status: "rounding",
		message: "Близько: ймовірно, помилка округлення проміжних значень."
	};
	return {
		status: "wrong",
		message: "Значення суттєво відрізняється — перевірте формулу та підстановку."
	};
}
function toCSV(headers, rows) {
	const esc = (x) => {
		const s = String(x);
		return /[";\n,]/.test(s) ? `"${s.replace(/"/g, "\"\"")}"` : s;
	};
	return "﻿" + [headers, ...rows].map((r) => r.map(esc).join(";")).join("\r\n");
}
/** Kappen with aliquot: Hг = (a × K × 0.1 × 100 × 1.75 × V1) / (m × V2) */
function hydrolyticAcidityExtract(a, K, m, V1, V2) {
	if (m <= 0 || V2 <= 0) throw new Error("m і V2 мають бути > 0");
	return a * K * .1 * 100 * 1.75 * V1 / (m * V2);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var kinds = {
	theory: {
		label: "Теорія",
		cls: "bg-secondary text-secondary-foreground"
	},
	sim: {
		label: "Симуляція",
		cls: "bg-warning/25 text-warning-foreground"
	},
	calc: {
		label: "Розрахунок",
		cls: "bg-primary/15 text-primary"
	},
	synthetic: {
		label: "Синтетичні дані",
		cls: "bg-earth/15 text-earth"
	},
	user: {
		label: "Дані користувача",
		cls: "bg-olive/20 text-accent-foreground"
	}
};
function Tag({ kind }) {
	const k = kinds[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide", k.cls),
		children: k.label
	});
}
function Panel({ title, kind, children, className, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-xl border bg-card p-5 shadow-soft fade-in", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4 flex flex-wrap items-center gap-2",
			children: [
				icon,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-lg font-semibold",
					children: title
				}),
				kind && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { kind })
			]
		}), children]
	});
}
function Field({ label, unit, value, onChange, tip, step = "any", id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: "block text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mb-1 block font-medium",
			title: tip,
			children: [label, unit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted-foreground",
				children: [
					" (",
					unit,
					")"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type: "number",
			inputMode: "decimal",
			step,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-md border border-input bg-background px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-ring"
		})]
	});
}
function Btn({ children, variant = "primary", className, ...p }) {
	const v = {
		primary: "bg-primary text-primary-foreground hover:bg-primary/90",
		outline: "border border-input bg-background hover:bg-muted",
		ghost: "hover:bg-muted",
		danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
	}[variant];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...p,
		className: cn("inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none", v, className),
		children
	});
}
function ErrorBox({ errors }) {
	if (!errors.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "alert",
		className: "rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
		children: errors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["• ", e] }, e))
	});
}
var DSTU_KCL_STEPS = [
	{
		name: "Дуже сильнокислі",
		min: 1,
		max: 4.09,
		labelRange: "< 4.1",
		color: "#991B1B"
	},
	{
		name: "Сильнокислі",
		min: 4.1,
		max: 4.5,
		labelRange: "4.1–4.5",
		color: "#DC2626"
	},
	{
		name: "Середньокислі",
		min: 4.6,
		max: 5,
		labelRange: "4.6–5.0",
		color: "#EF4444"
	},
	{
		name: "Слабокислі",
		min: 5.1,
		max: 5.5,
		labelRange: "5.1–5.5",
		color: "#F97316"
	},
	{
		name: "Близькі до нейтральних",
		min: 5.6,
		max: 6,
		labelRange: "5.6–6.0",
		color: "#EAB308"
	},
	{
		name: "Нейтральні",
		min: 6.1,
		max: 7,
		labelRange: "6.1–7.0",
		color: "#22C55E"
	},
	{
		name: "Близькі до нейтральних (лужні)",
		min: 7.1,
		max: 7.5,
		labelRange: "7.1–7.5",
		color: "#14B8A6"
	},
	{
		name: "Слаболужні",
		min: 7.6,
		max: 8,
		labelRange: "7.6–8.0",
		color: "#06B6D4"
	},
	{
		name: "Середньолужні",
		min: 8.1,
		max: 8.5,
		labelRange: "8.1–8.5",
		color: "#3B82F6"
	},
	{
		name: "Сильнолужні",
		min: 8.6,
		max: 9,
		labelRange: "8.6–9.0",
		color: "#1D4ED8"
	},
	{
		name: "Дуже сильнолужні",
		min: 9.01,
		max: 14,
		labelRange: "> 9.0",
		color: "#1E1B4B"
	}
];
var UA_WATER_STEPS = [
	{
		name: "Дуже сильнокислі",
		min: 1,
		max: 4.49,
		labelRange: "< 4.5",
		color: "#991B1B"
	},
	{
		name: "Сильнокислі",
		min: 4.5,
		max: 5,
		labelRange: "4.6–5.0",
		color: "#DC2626"
	},
	{
		name: "Середньокислі",
		min: 5.1,
		max: 5.5,
		labelRange: "5.1–5.5",
		color: "#EF4444"
	},
	{
		name: "Слабокислі",
		min: 5.6,
		max: 6,
		labelRange: "5.6–6.0",
		color: "#F97316"
	},
	{
		name: "Близькі до нейтральних",
		min: 6.1,
		max: 7,
		labelRange: "6.1–7.0",
		color: "#EAB308"
	},
	{
		name: "Нейтральні",
		min: 7.1,
		max: 7.5,
		labelRange: "7.1–7.5",
		color: "#22C55E"
	},
	{
		name: "Слаболужні",
		min: 7.6,
		max: 8,
		labelRange: "7.6–8.0",
		color: "#06B6D4"
	},
	{
		name: "Середньолужні",
		min: 8.1,
		max: 8.5,
		labelRange: "8.1–8.5",
		color: "#3B82F6"
	},
	{
		name: "Сильнолужні",
		min: 8.6,
		max: 9,
		labelRange: "8.6–9.0",
		color: "#1D4ED8"
	},
	{
		name: "Дуже сильнолужні",
		min: 9.01,
		max: 14,
		labelRange: "> 9.0",
		color: "#1E1B4B"
	}
];
var USDA_STEPS = [
	{
		name: "Ультракислі",
		enName: "Ultra acid",
		min: 1,
		max: 3.49,
		labelRange: "< 3.5",
		color: "#7F1D1D"
	},
	{
		name: "Надзвичайно кислі",
		enName: "Extremely acid",
		min: 3.5,
		max: 4.4,
		labelRange: "3.5–4.4",
		color: "#991B1B"
	},
	{
		name: "Дуже сильнокислі",
		enName: "Very strongly acid",
		min: 4.5,
		max: 5,
		labelRange: "4.5–5.0",
		color: "#DC2626"
	},
	{
		name: "Сильнокислі",
		enName: "Strongly acid",
		min: 5.1,
		max: 5.5,
		labelRange: "5.1–5.5",
		color: "#EF4444"
	},
	{
		name: "Середньокислі",
		enName: "Moderately acid",
		min: 5.6,
		max: 6,
		labelRange: "5.6–6.0",
		color: "#F97316"
	},
	{
		name: "Слабокислі",
		enName: "Slightly acid",
		min: 6.1,
		max: 6.5,
		labelRange: "6.1–6.5",
		color: "#EAB308"
	},
	{
		name: "Нейтральні",
		enName: "Neutral",
		min: 6.6,
		max: 7.3,
		labelRange: "6.6–7.3",
		color: "#22C55E"
	},
	{
		name: "Слаболужні",
		enName: "Slightly alkaline",
		min: 7.4,
		max: 7.8,
		labelRange: "7.4–7.8",
		color: "#06B6D4"
	},
	{
		name: "Середньолужні",
		enName: "Moderately alkaline",
		min: 7.9,
		max: 8.4,
		labelRange: "7.9–8.4",
		color: "#3B82F6"
	},
	{
		name: "Сильнолужні",
		enName: "Strongly alkaline",
		min: 8.5,
		max: 9,
		labelRange: "8.5–9.0",
		color: "#1D4ED8"
	},
	{
		name: "Дуже сильнолужні",
		enName: "Very strongly alkaline",
		min: 9.01,
		max: 14,
		labelRange: "> 9.0",
		color: "#1E1B4B"
	}
];
function getStepForPh(ph, steps) {
	return steps.find((s) => ph >= s.min && ph <= s.max) ?? steps[steps.length - 1];
}
var ECOLOGICAL_CROPS = [
	{
		name: "Лохина високоросла",
		lat: "Vaccinium corymbosum",
		optMin: 4.2,
		optMax: 5.2,
		tolMin: 3.8,
		tolMax: 5.5,
		group: "acidophile",
		mechanism: "Ерикоїдна мікориза, фізіологічна потреба в кислому субстраті. Високий ризик залізного хлорозу при pH > 5.8."
	},
	{
		name: "Журавлина великоплідна",
		lat: "Vaccinium macrocarpon",
		optMin: 4,
		optMax: 5,
		tolMin: 3.5,
		tolMax: 5.3,
		group: "acidophile",
		mechanism: "Адаптація до органогенних кислих ґрунтів та специфічного водного режиму."
	},
	{
		name: "Чайний кущ",
		lat: "Camellia sinensis",
		optMin: 4.5,
		optMax: 5.5,
		tolMin: 4,
		tolMax: 6,
		group: "acidophile",
		mechanism: "На лужних субстратах різко блокується засвоєння Fe, Mn та Cu."
	},
	{
		name: "Ананас",
		lat: "Ananas comosus",
		optMin: 4.5,
		optMax: 5.5,
		tolMin: 4,
		tolMax: 6.2,
		group: "acidophile",
		mechanism: "Висока продуктивність на кислих субстратах за належного мінерального живлення."
	},
	{
		name: "Картопля",
		lat: "Solanum tuberosum",
		optMin: 5,
		optMax: 5.8,
		tolMin: 4.5,
		tolMax: 6.8,
		group: "acidotolerant",
		mechanism: "Кисла реакція стримує звичайну паршу (Streptomyces scabies), але дуже низький pH викликає дефіцит Ca/Mg та токсичність Al/Mn."
	},
	{
		name: "Жито озиме",
		lat: "Secale cereale",
		optMin: 5,
		optMax: 6,
		tolMin: 4.5,
		tolMax: 7.2,
		group: "acidotolerant",
		mechanism: "Найвища стійкість серед зернових до алюмінієвого стресу та екструзії органічних кислот корінням."
	},
	{
		name: "Овес посівний",
		lat: "Avena sativa",
		optMin: 5,
		optMax: 6,
		tolMin: 4.6,
		tolMax: 7.2,
		group: "acidotolerant",
		mechanism: "Переносить кислотність значно краще за ячмінь та зернобобові."
	},
	{
		name: "Гречка",
		lat: "Fagopyrum esculentum",
		optMin: 5,
		optMax: 6.5,
		tolMin: 4.7,
		tolMax: 7.5,
		group: "acidotolerant",
		mechanism: "Завдяки ексудації органічних кислот розчиняє труднодоступні фосфати алюмінію."
	},
	{
		name: "Люпин білий/жовтий",
		lat: "Lupinus spp.",
		optMin: 4.8,
		optMax: 6.2,
		tolMin: 4.3,
		tolMax: 6.8,
		group: "acidotolerant",
		mechanism: "Формує кластерні корені (протеоїдні), але толерантність ризобій залежить від штаму."
	},
	{
		name: "Пшениця озима",
		lat: "Triticum aestivum",
		optMin: 6,
		optMax: 7,
		tolMin: 5.5,
		tolMax: 7.5,
		group: "neutrophile",
		mechanism: "Чутлива до активного алюмінію Al³⁺ при pH < 5.0; знижується кущення та подовження коренів."
	},
	{
		name: "Кукурудза",
		lat: "Zea mays",
		optMin: 5.8,
		optMax: 7,
		tolMin: 5.2,
		tolMax: 7.8,
		group: "neutrophile",
		mechanism: "Чутлива до дефіциту цинку при високому pH та до алюмінієвого стресу при pH < 5.0."
	},
	{
		name: "Соя",
		lat: "Glycine max",
		optMin: 6,
		optMax: 7,
		tolMin: 5.5,
		tolMax: 7.5,
		group: "neutrophile",
		mechanism: "При pH < 5.5 пригнічується симбіоз із Bradyrhizobium japonicum та доступність молібдену (Mo)."
	},
	{
		name: "Люцерна посівна",
		lat: "Medicago sativa",
		optMin: 6.2,
		optMax: 7.5,
		tolMin: 5.8,
		tolMax: 8,
		group: "neutrophile",
		mechanism: "Дуже чутлива до кислотності: при pH < 6.0 блокується бульбочкоутворення і коренева система."
	},
	{
		name: "Цукровий буряк",
		lat: "Beta vulgaris",
		optMin: 6.5,
		optMax: 7.5,
		tolMin: 5.8,
		tolMax: 8.2,
		group: "neutrophile",
		mechanism: "Потребує високої насиченості основами (Ca, Mg) та доброго забезпечення бором."
	},
	{
		name: "Ячмінь ярий",
		lat: "Hordeum vulgare",
		optMin: 6.2,
		optMax: 7.5,
		tolMin: 5.5,
		tolMax: 8.2,
		group: "alkalotolerant",
		mechanism: "Висока стійкість до слабкої лужності, але чутливий до кислих ґрунтів."
	},
	{
		name: "Еспарцет",
		lat: "Onobrychis viciifolia",
		optMin: 6.5,
		optMax: 8,
		tolMin: 5.8,
		tolMax: 8.5,
		group: "alkalotolerant",
		mechanism: "Чудово пристосований до карбонатних ґрунтів з високим вмістом Ca."
	},
	{
		name: "Сорго",
		lat: "Sorghum bicolor",
		optMin: 6,
		optMax: 7.8,
		tolMin: 5,
		tolMax: 8.5,
		group: "alkalotolerant",
		mechanism: "Широка екологічна амплітуда, витримує помірну лужність."
	},
	{
		name: "Кіноа",
		lat: "Chenopodium quinoa",
		optMin: 6,
		optMax: 8.5,
		tolMin: 5,
		tolMax: 9,
		group: "alkalophile",
		mechanism: "Генотипи демонструють стійкість до лужних та засолених субстратів."
	},
	{
		name: "Лобода кущова",
		lat: "Atriplex spp.",
		optMin: 7,
		optMax: 9,
		tolMin: 6,
		tolMax: 9.5,
		group: "alkalophile",
		mechanism: "Галофітна та алкалофільна рослина, адаптована до содових та карбонатних ґрунтів."
	},
	{
		name: "Кохія вінична",
		lat: "Bassia scoparia",
		optMin: 6.8,
		optMax: 8.8,
		tolMin: 5.5,
		tolMax: 9.2,
		group: "alkalophile",
		mechanism: "Висока пристосованість до лужних, посушливих і засолених ґрунтів."
	}
];
function getGroupForPh(phVal) {
	if (phVal < 4.5) return "acidophile";
	if (phVal < 5.8) return "acidotolerant";
	if (phVal <= 7.2) return "neutrophile";
	if (phVal <= 8.2) return "alkalotolerant";
	return "alkalophile";
}
var NUTRIENT_CURVES = [
	{
		id: "Al",
		name: "Алюміній (Токсичність)",
		symbol: "Al³⁺",
		category: "toxic",
		color: "#DC2626",
		calcValue: (ph) => ph <= 4 ? 100 : ph <= 5 ? 100 - (ph - 4) * 80 : ph <= 5.5 ? 20 - (ph - 5) * 40 : 0
	},
	{
		id: "P",
		name: "Фосфор",
		symbol: "P",
		category: "macro",
		color: "#F59E0B",
		calcValue: (ph) => ph < 4.5 ? 15 : ph <= 6 ? 15 + (ph - 4.5) * 56.6 : ph <= 7 ? 100 : ph <= 8.5 ? 100 - (ph - 7) * 46.6 : 30
	},
	{
		id: "Mo",
		name: "Молібден",
		symbol: "Mo",
		category: "micro",
		color: "#8B5CF6",
		calcValue: (ph) => ph <= 4.5 ? 10 : ph <= 7.5 ? 10 + (ph - 4.5) * 26.6 : 90
	},
	{
		id: "Fe",
		name: "Залізо",
		symbol: "Fe",
		category: "micro",
		color: "#EF4444",
		calcValue: (ph) => ph <= 5.5 ? 95 : ph <= 6.5 ? 95 - (ph - 5.5) * 35 : ph <= 8 ? 60 - (ph - 6.5) * 33.3 : 10
	},
	{
		id: "Mn",
		name: "Марганець",
		symbol: "Mn",
		category: "micro",
		color: "#D97706",
		calcValue: (ph) => ph <= 5 ? 95 : ph <= 6.5 ? 95 - (ph - 5) * 30 : ph <= 8 ? 50 - (ph - 6.5) * 26.6 : 10
	},
	{
		id: "Zn",
		name: "Цинк",
		symbol: "Zn",
		category: "micro",
		color: "#06B6D4",
		calcValue: (ph) => ph <= 5.5 ? 90 : ph <= 7 ? 90 - (ph - 5.5) * 33.3 : 40
	},
	{
		id: "Cu",
		name: "Мідь",
		symbol: "Cu",
		category: "micro",
		color: "#059669",
		calcValue: (ph) => ph <= 5.5 ? 85 : ph <= 7.5 ? 85 - (ph - 5.5) * 25 : 35
	},
	{
		id: "B",
		name: "Бор",
		symbol: "B",
		category: "micro",
		color: "#EC4899",
		calcValue: (ph) => ph <= 5 ? 50 : ph <= 6.5 ? 85 : ph <= 8 ? 85 - (ph - 6.5) * 40 : 25
	},
	{
		id: "Ca",
		name: "Кальцій",
		symbol: "Ca",
		category: "secondary",
		color: "#10B981",
		calcValue: (ph) => ph <= 4.5 ? 20 : ph <= 6.5 ? 20 + (ph - 4.5) * 37.5 : 95
	},
	{
		id: "Mg",
		name: "Магній",
		symbol: "Mg",
		category: "secondary",
		color: "#14B8A6",
		calcValue: (ph) => ph <= 4.5 ? 25 : ph <= 6.5 ? 25 + (ph - 4.5) * 32.5 : 90
	},
	{
		id: "N",
		name: "Азот",
		symbol: "N",
		category: "macro",
		color: "#3B82F6",
		calcValue: (ph) => ph <= 5 ? 30 : ph <= 6 ? 30 + (ph - 5) * 50 : ph <= 7.5 ? 80 : 60
	},
	{
		id: "K",
		name: "Калій",
		symbol: "K",
		category: "macro",
		color: "#6366F1",
		calcValue: (ph) => ph <= 5 ? 45 : ph <= 6 ? 45 + (ph - 5) * 40 : 85
	}
];
function InteractiveNutrientGraph({ currentPh, onPhChange }) {
	const [visibleElements, setVisibleElements] = (0, import_react.useState)({
		Al: true,
		P: true,
		N: true,
		K: true,
		Ca: true,
		Fe: true,
		Mo: true,
		Mn: false,
		Zn: false,
		Cu: false,
		B: false,
		Mg: false
	});
	const toggleElement = (id) => {
		setVisibleElements((prev) => ({
			...prev,
			[id]: !prev[id]
		}));
	};
	const toggleCategory = (cat) => {
		if (cat === "all") {
			const allTrue = Object.values(visibleElements).every(Boolean);
			const nextState = {};
			NUTRIENT_CURVES.forEach((el) => {
				nextState[el.id] = !allTrue;
			});
			setVisibleElements(nextState);
		} else {
			const nextState = { ...visibleElements };
			NUTRIENT_CURVES.filter((el) => el.category === cat).forEach((el) => {
				nextState[el.id] = true;
			});
			setVisibleElements(nextState);
		}
	};
	const getX = (valPh) => 50 + (valPh - 3) / 7 * 700;
	const getY = (avail) => 250 - avail / 100 * 220;
	const generatePath = (curveFn) => {
		const points = [];
		for (let cPh = 3; cPh <= 10; cPh += .1) {
			const x = getX(cPh);
			const y = getY(curveFn(cPh));
			points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
		}
		return `M ${points.join(" L ")}`;
	};
	const alTox = NUTRIENT_CURVES.find((e) => e.id === "Al")?.calcValue(currentPh) || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 bg-muted/40 p-3 rounded-xl border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs font-semibold text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5" }), " Вибір кривих для відображення:"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 text-[11px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleCategory("all"),
								className: "hover:underline text-emerald-600 dark:text-emerald-400 font-medium",
								children: "Усі/Скинути"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleCategory("macro"),
								className: "hover:underline text-blue-600 dark:text-blue-400 font-medium",
								children: "Макро"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleCategory("micro"),
								className: "hover:underline text-purple-600 dark:text-purple-400 font-medium",
								children: "Мікро"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: NUTRIENT_CURVES.map((el) => {
						const active = visibleElements[el.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toggleElement(el.id),
							style: {
								backgroundColor: active ? el.color : "transparent",
								borderColor: el.color,
								color: active ? "#ffffff" : el.color
							},
							className: `px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${active ? "shadow-sm font-bold" : "opacity-60 hover:opacity-100"}`,
							children: [
								el.symbol,
								" ",
								el.id === "Al" && "☠️"
							]
						}, el.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative border rounded-xl bg-background p-2 overflow-hidden shadow-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 800 280",
					className: "w-full h-auto select-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
							id: "toxic-stripe-theory",
							width: "8",
							height: "8",
							patternTransform: "rotate(45 0 0)",
							patternUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "8",
								stroke: "#EF4444",
								strokeWidth: "3"
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: getX(3),
							y: 30,
							width: getX(5.2) - getX(3),
							height: 220,
							fill: "url(#toxic-stripe-theory)",
							opacity: .25
						}),
						[
							0,
							50,
							100
						].map((val) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "50",
							y1: getY(val),
							x2: "750",
							y2: getY(val),
							stroke: "currentColor",
							strokeDasharray: "3 3",
							className: "text-border"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: "42",
							y: getY(val) + 4,
							textAnchor: "end",
							className: "text-[10px] fill-muted-foreground font-mono",
							children: [val, "%"]
						})] }, val)),
						[
							3,
							4,
							5,
							5.5,
							6,
							7,
							8,
							9,
							10
						].map((valPh) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: getX(valPh),
							y1: "30",
							x2: getX(valPh),
							y2: "250",
							stroke: "currentColor",
							strokeDasharray: "2 2",
							className: "text-border/60"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: getX(valPh),
							y: "268",
							textAnchor: "middle",
							className: "text-[11px] fill-muted-foreground font-mono font-bold",
							children: valPh
						})] }, valPh)),
						NUTRIENT_CURVES.map((el) => {
							if (!visibleElements[el.id]) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: generatePath(el.calcValue),
								fill: "none",
								stroke: el.color,
								strokeWidth: el.id === "Al" ? "3" : "2.2",
								strokeDasharray: el.id === "Al" ? "4 2" : "none",
								className: "transition-all duration-200 hover:stroke-[4]"
							}, el.id);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: getX(currentPh),
							y1: "20",
							x2: getX(currentPh),
							y2: "250",
							stroke: "#10B981",
							strokeWidth: "2.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: getX(currentPh),
							cy: 250,
							r: "5",
							fill: "#10B981"
						})
					]
				}), currentPh <= 5.2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-4 left-16 bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow",
					children: "ЗОНА КРИТИЧНОЇ ТОКСИЧНОСТІ Al³⁺ / Mn²⁺"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 bg-card p-3 rounded-xl border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-muted-foreground",
						children: "Зміна pH ґрунту на графіку:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono font-bold text-emerald-600 dark:text-emerald-400",
						children: ["pH ", currentPh.toFixed(1)]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 3,
					max: 10,
					step: .1,
					value: currentPh,
					onChange: (e) => onPhChange(parseFloat(e.target.value)),
					className: "w-full accent-emerald-600 cursor-pointer h-2 bg-muted rounded-lg"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${alTox > 40 ? "bg-rose-500/10 border-rose-500/40 text-rose-900 dark:text-rose-200" : "bg-emerald-500/5 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold flex items-center gap-1.5",
						children: [
							alTox > 40 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4 text-rose-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-600" }),
							"Стан Алюмінію (Al³⁺): ",
							alTox > 40 ? "ТОКСИЧНИЙ РІВЕНЬ" : "Безпечний рівень"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] leading-relaxed opacity-90",
						children: currentPh <= 5 ? "Висока концентрація вільних катіонів Al³⁺. Руйнуються мікрофібрили кореневих чехликів, вимиваються Ca та Mg, блокується поглинання фосфатів." : currentPh <= 5.5 ? "Початковий рівень гідролізу Al³⁺ → Al(OH)²⁺. Фітотоксичність проявляється на чутливих культурах (пшениця, ячмінь, соя)." : "Алюміній зв'язаний у малорозчинний гідроксид Al(OH)₃ та не завдає фізіологічної шкоди корінню."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-xl border bg-muted/40 text-xs space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold text-foreground flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-amber-500" }), "Доступність Фосфору (P) та Молібдену (Mo):"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground leading-relaxed",
						children: [
							currentPh < 5.5 && "Фосфор зв'язується у малорозчинні фосфати алюмінію та заліза (AlPO₄, FePO₄). Молібден сорбується гідроксидами та недоступний бобовим.",
							currentPh >= 5.5 && currentPh <= 7 && "Оптимальне вікно! Фосфор перебуває у легкозасвоюваній формі H₂PO₄⁻. Молібден та макроелементи знаходяться у збалансованому стані.",
							currentPh > 7 && "Фосфор зв'язується у малорозчинні фосфати кальцію Ca₃(PO₄)₂. Різко падає розчинність Fe, Mn, Zn, Cu та B."
						]
					})]
				})]
			})
		]
	});
}
function TheoryTab() {
	const [ph, setPh] = (0, import_react.useState)(6.5);
	const [system, setSystem] = (0, import_react.useState)("dstu_kcl");
	const [selectedCropGroup, setSelectedCropGroup] = (0, import_react.useState)("neutrophile");
	const handlePhChange = (newPh) => {
		setPh(newPh);
		setSelectedCropGroup(getGroupForPh(newPh));
	};
	const currentSteps = system === "dstu_kcl" ? DSTU_KCL_STEPS : system === "ua_h2o" ? UA_WATER_STEPS : USDA_STEPS;
	const dstuStep = getStepForPh(ph, DSTU_KCL_STEPS);
	const uaWaterStep = getStepForPh(ph, UA_WATER_STEPS);
	const usdaStep = getStepForPh(ph, USDA_STEPS);
	const currentStep = system === "dstu_kcl" ? dstuStep : system === "ua_h2o" ? uaWaterStep : usdaStep;
	const filteredCrops = ECOLOGICAL_CROPS.filter((c) => selectedCropGroup === "all" || c.group === selectedCropGroup);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "1.1. Класифікація кислотно-основної реакції ґрунтів",
				kind: "theory",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-emerald-600" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
							children: [
								"У симуляторі розмежовано ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "три незалежні класифікаційні системи" }),
								". Жодна з них не виводиться з іншої за допомогою фіксованого формульного коефіцієнта, оскільки pH",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "H₂O" }),
								" ≠ pH",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "KCl" }),
								" + const."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 p-1 bg-muted/50 rounded-lg border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSystem("dstu_kcl"),
									className: `flex-1 min-w-[200px] px-3 py-2 text-xs font-semibold rounded-md transition-all ${system === "dstu_kcl" ? "bg-background text-emerald-700 dark:text-emerald-400 shadow-sm border" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"🌱 ДСТУ 4362:2004 (pH",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "KCl" }),
										" - 11 градацій)"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSystem("ua_h2o"),
									className: `flex-1 min-w-[200px] px-3 py-2 text-xs font-semibold rounded-md transition-all ${system === "ua_h2o" ? "bg-background text-blue-700 dark:text-blue-400 shadow-sm border" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"💧 Агрономічна UA (pH",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "H₂O" }),
										" - 10 градацій)"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSystem("usda"),
									className: `flex-1 min-w-[200px] px-3 py-2 text-xs font-semibold rounded-md transition-all ${system === "usda" ? "bg-background text-purple-700 dark:text-purple-400 shadow-sm border" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"🌎 USDA NRCS 2017 (pH",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "H₂O" }),
										" - 11 градацій)"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5 pt-1",
							children: currentSteps.map((st) => {
								const isSelected = ph >= st.min && ph <= st.max;
								const targetVal = Number(((st.min + st.max) / 2).toFixed(1));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handlePhChange(targetVal),
									style: {
										backgroundColor: isSelected ? st.color : `${st.color}15`,
										borderColor: st.color,
										color: isSelected ? "#ffffff" : st.color
									},
									className: `px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${isSelected ? "shadow-md ring-2 ring-offset-1 font-bold" : "hover:opacity-90"}`,
									children: [
										st.name,
										" (",
										st.labelRange,
										")"
									]
								}, st.name);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl border bg-card space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col sm:flex-row items-center justify-between gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white shadow-lg font-mono text-3xl font-extrabold transition-all duration-300",
										style: { backgroundColor: currentStep.color },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-sans font-normal opacity-90",
											children: system === "dstu_kcl" ? "pH KCl" : "pH H₂O"
										}), ph.toFixed(1)]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs uppercase tracking-wider font-semibold text-muted-foreground",
											children: [
												system === "dstu_kcl" && "ДСТУ 4362:2004 (Сольова витяжка)",
												system === "ua_h2o" && "Українська агрономічна шкала (Водна витяжка)",
												system === "usda" && "USDA Soil Survey Manual 2017 (Водна витяжка 1:1)"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xl font-serif font-bold mt-0.5",
											style: { color: currentStep.color },
											children: [
												currentStep.name,
												" ",
												currentStep.enName ? `(${currentStep.enName})` : ""
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground mt-1",
											children: ["Офіційний інтервал: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
												className: "font-mono text-foreground",
												children: [currentStep.labelRange, " pH"]
											})]
										})
									] })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "pH value",
									type: "range",
									min: 3,
									max: 9.5,
									step: .1,
									value: ph,
									onChange: (e) => handlePhChange(Number(e.target.value)),
									style: { accentColor: currentStep.color },
									className: "w-full cursor-pointer h-2 rounded-lg bg-muted"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-mono text-[11px] text-muted-foreground px-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3.0 (Ультракислий)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5.5 (Критична межа)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "7.0 (Нейтральний)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "9.5 (Дуже сильнолужний)" })
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-3 rounded-lg border transition-all ${system === "dstu_kcl" ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20" : "bg-card"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold text-emerald-800 dark:text-emerald-300",
											children: [
												"1. ДСТУ 4362:2004 (pH",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "KCl" }),
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 font-medium",
											children: [
												dstuStep.name,
												" (",
												dstuStep.labelRange,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground mt-0.5",
											children: "База для розрахунку вапнування в Україні."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-3 rounded-lg border transition-all ${system === "ua_h2o" ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" : "bg-card"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold text-blue-800 dark:text-blue-300",
											children: [
												"2. Агрономічна UA (pH",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "H₂O" }),
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 font-medium",
											children: [
												uaWaterStep.name,
												" (",
												uaWaterStep.labelRange,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground mt-0.5",
											children: "Характеризує активну кислотність розчину."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-3 rounded-lg border transition-all ${system === "usda" ? "border-purple-500 bg-purple-50/50 dark:bg-purple-950/20" : "bg-card"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold text-purple-800 dark:text-purple-300",
											children: [
												"3. USDA NRCS (pH",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "H₂O" }),
												" 1:1)"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 font-medium",
											children: [
												usdaStep.name,
												" (",
												usdaStep.labelRange,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground mt-0.5",
											children: "Міжнародний стандарт Soil Survey Manual."
										})
									]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "1.2. Екологічні групи культур та фізіологічна чутливість",
				kind: "theory",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-5 w-5 text-emerald-600" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							{
								id: "all",
								label: "Усі 5 екологічних груп"
							},
							{
								id: "acidophile",
								label: "🫐 Ацидофіли"
							},
							{
								id: "acidotolerant",
								label: "🥔 Ацидотолерантні"
							},
							{
								id: "neutrophile",
								label: "🌾 Нейтрофіли"
							},
							{
								id: "alkalotolerant",
								label: "🌻 Алкалотолерантні"
							},
							{
								id: "alkalophile",
								label: "🌿 Алкалофіли"
							}
						].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedCropGroup(b.id),
							className: `px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${selectedCropGroup === b.id ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`,
							children: b.label
						}, b.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: filteredCrops.map((crop) => {
							const isOpt = ph >= crop.optMin && ph <= crop.optMax;
							const isTol = ph >= crop.tolMin && ph <= crop.tolMax && !isOpt;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-3.5 rounded-xl border transition-all ${isOpt ? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/30" : isTol ? "border-amber-500/40 bg-amber-500/5" : "border-border bg-card opacity-75"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-sm text-foreground",
											children: crop.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] italic text-muted-foreground",
											children: crop.lat
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${isOpt ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : isTol ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"}`,
											children: isOpt ? "🟢 Оптимум" : isTol ? "🟡 Толерує" : "🔴 Пригнічення"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2.5 text-xs space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Оптимум pH:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono font-semibold text-emerald-600 dark:text-emerald-400",
												children: [
													crop.optMin,
													" – ",
													crop.optMax
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Межі толерантності:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-muted-foreground",
												children: [
													crop.tolMin,
													" – ",
													crop.tolMax
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-[11px] text-muted-foreground border-t pt-2 leading-relaxed",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Фізіологія:" }),
											" ",
											crop.mechanism
										]
									})
								]
							}, crop.name);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "1.3. Види кислотності ґрунту та їх взаємозв'язок",
				kind: "theory",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-5 w-5 text-emerald-600" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 rounded-xl border bg-card space-y-3 flex flex-col justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-4 w-4" }), "1. Актуальна (активна) кислотність"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 p-1.5 rounded text-center font-bold",
										children: "pH(H₂O) — Водна витяжка"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: "Зумовлена концентрацією вільних іонів H⁺ у ґрунтовому розчині. Характеризує фактичну кислотно-основну реакцію ґрунтового середовища та визначається показником pH водної витяжки (pH H₂O)."
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl border bg-card space-y-3 border-purple-500/30 bg-purple-500/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-semibold text-purple-700 dark:text-purple-400 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-4 w-4" }), "2. Потенційна (прихована) кислотність"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 p-1.5 rounded text-center font-bold",
										children: "Зосереджена у Ґрунтовому Вбирному Комплексі (ҐВК)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: ["Зумовлена наявністю кислотних компонентів у ґрунтовому вбирному комплексі. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Поділяється на два види:" })]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-lg border bg-background space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold text-xs text-amber-700 dark:text-amber-400 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2.1. Обмінна кислотність" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border",
											children: "pH(KCl)"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground leading-relaxed",
										children: "Зумовлена обмінно-поглинутими іонами H⁺ та Al³⁺, які витісняються з ґрунтового вбирного комплексу розчинами нейтральних солей (зазвичай KCl). Визначається за pH сольової витяжки та вмістом витіснених кислотних компонентів."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-lg border bg-background space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold text-xs text-indigo-700 dark:text-indigo-400 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2.2. Гідролітична кислотність (Hг)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border",
											children: "CH₃COONa"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground leading-relaxed",
										children: "Характеризує ширший резерв кислотних компонентів ґрунту, які витісняються під дією гідролітично лужних солей (зазвичай CH₃COONa). Використовується як основний показник для розрахунку потреби ґрунту у вапнуванні."
									})]
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-xl border bg-muted/40 text-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigma, { className: "h-4 w-4 text-primary" }), "Взаємозв'язок та буферна здатність ґрунту:"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Взаємозв'язок:" }), " Актуальна кислотність характеризує реакцію ґрунтового розчину, а потенційна — запас кислотності, зосереджений у твердій фазі ґрунту. Обмінна кислотність є частиною гідролітичної, тому зазвичай виконується співвідношення:"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2 rounded bg-card border text-center font-mono font-bold text-sm text-primary max-w-xs mx-auto",
								children: [
									"H",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "г" }),
									" > H",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "обм" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground leading-relaxed",
								children: "Саме потенційна кислотність визначає здатність ґрунту відновлювати кислу реакцію після нейтралізації ґрунтового розчину."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "1.4. Вплив pH на доступність елементів живлення та токсичність алюмінію",
				kind: "theory",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-emerald-600" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Методична умова:" }), " Графік відображає концептуальну зміну потенційної доступності елементів живлення, а не фактичний вміст їх рухомих форм. Для визначення останнього необхідні лабораторні вимірювання."]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveNutrientGraph, {
						currentPh: ph,
						onPhChange: handlePhChange
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "pt-2 font-serif text-2xl font-semibold",
				children: "1.5. Агрохімічні формули та розрахунок вапнування"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KappenCard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnoCard, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LimingFormulaCards, {})
		]
	});
}
function KappenCard() {
	const [a, setA] = (0, import_react.useState)("2.5"), [K, setK] = (0, import_react.useState)("1"), [m, setM] = (0, import_react.useState)("40"), [V1, setV1] = (0, import_react.useState)("100"), [V2, setV2] = (0, import_react.useState)("50");
	const r = [
		parseNum(a, "a"),
		parseNum(K, "K"),
		parseNum(m, "m"),
		parseNum(V1, "V1"),
		parseNum(V2, "V2")
	];
	const errs = r.flatMap((x) => x.ok ? [] : [x.error]);
	const v = errs.length ? null : r.map((x) => x.value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Формула А: гідролітична кислотність за Каппеном",
		kind: "calc",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigma, { className: "h-5 w-5 text-primary" }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "formula",
				children: "Hг = (a × K × 0.1 × 100 × 1.75 × V1) / (m × V2)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "my-3 space-y-0.5 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Hг" }), " — гідролітична кислотність, мг-екв/100 г ґрунту"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "a" }), " — об'єм 0,1 н NaOH, витрачений на титрування, мл"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "1.75" }), " — поправковий коефіціент Каппена на неповне витіснення H⁺"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-5 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "ka",
						label: "a",
						unit: "мл",
						value: a,
						onChange: setA
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "kk",
						label: "K",
						value: K,
						onChange: setK
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "km",
						label: "m",
						unit: "г",
						value: m,
						onChange: setM
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "kv1",
						label: "V1",
						unit: "мл",
						value: V1,
						onChange: setV1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "kv2",
						label: "V2",
						unit: "мл",
						value: V2,
						onChange: setV2
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBox, { errors: errs })
			}),
			v && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-mono text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-base font-bold text-primary",
					children: [
						"Hг = ",
						fmt(hydrolyticAcidityExtract(v[0], v[1], v[2], v[3], v[4])),
						" мг-екв/100 г"
					]
				})
			})
		]
	});
}
function SnoCard() {
	const [svo, setSvo] = (0, import_react.useState)("15"), [hg, setHg] = (0, import_react.useState)("2.5");
	const r = [parseNum(svo, "SVO"), parseNum(hg, "Hг", { allowZero: true })];
	const errs = r.flatMap((x) => x.ok ? [] : [x.error]);
	const v = errs.length ? null : r.map((x) => x.value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Формула Б: ступінь насиченості основами (V %)",
		kind: "calc",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigma, { className: "h-5 w-5 text-primary" }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "formula",
				children: "V = (100 × S) / (S + Hг)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "my-3 space-y-0.5 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "V" }), " — ступінь насиченості основами, %"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "S" }), " — сума ввібраних основ, мг-екв/100 г"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Hг" }), " — гідролітична кислотність, мг-екв/100 г"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "ssvo",
					label: "S (основи)",
					unit: "мг-екв",
					value: svo,
					onChange: setSvo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "shg",
					label: "Hг",
					unit: "мг-екв",
					value: hg,
					onChange: setHg
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBox, { errors: errs })
			}),
			v && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-mono text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-base font-bold text-primary",
					children: [
						"V = ",
						fmt(baseSaturation(v[0], v[1])),
						" %"
					]
				})
			})
		]
	});
}
function LimingFormulaCards() {
	const acad = limingAcademic(3, 1e4, 1.3, .2), expr = limingExpress(3, 1.3, 20);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Формула В: розрахунок норм меліорантів (CaCO₃)",
		kind: "calc",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigma, { className: "h-5 w-5 text-primary" }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2 text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-background p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-sm",
						children: "Академічний розрахунок (за Hг):"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "formula mt-2",
						children: "CaCO₃ = (Hг × 0.5 × S × d × h) / 1000"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Розрахунок повної норми карбонату кальцію у тоннах на площу S."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-background p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-sm",
						children: "Експрес-польовий розрахунок:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "formula mt-2",
						children: "CaCO₃ = 0.05 × Hг × d × h_cm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Розрахунок у т/га для орного шару глибиною h_cm."
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-lg bg-accent/40 p-3 font-mono text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 font-sans font-semibold",
					children: "Приклад при Hг = 3.0 мг-екв/100г, d = 1.3 г/см³, h = 20 см:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Повна норма (академічна): ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [fmt(acad), " т/га CaCO₃"] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Експрес-норма: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [fmt(expr), " т/га CaCO₃"] })] })
			]
		})]
	});
}
var SAMPLES = [
	{
		id: "A",
		code: "ЗР-2026-01",
		name: "Дерново-підзолистий поверхнево-оглеений",
		type: "Середньокислий (pH 4.6–5.0)",
		density: 1.35,
		phH2O: 5.42,
		phKCl: 4.68,
		hExch: 1.25,
		hHydro: 3.2
	},
	{
		id: "B",
		code: "ЗР-2026-02",
		name: "Сірий лісовий легкоглинистий",
		type: "Слабокислий (pH 5.1–5.5)",
		density: 1.25,
		phH2O: 5.95,
		phKCl: 5.12,
		hExch: .75,
		hHydro: 2.85
	},
	{
		id: "C",
		code: "ЗР-2026-03",
		name: "Чорнозем опідзолений важкосуглинковий",
		type: "Близький до нейтрального (pH 5.6–6.0)",
		density: 1.18,
		phH2O: 6.45,
		phKCl: 5.7,
		hExch: .15,
		hHydro: 1.95
	},
	{
		id: "D",
		code: "ЗР-2026-04",
		name: "Чорнозем типовий малогумусний",
		type: "Нейтральний (pH 6.1–7.0)",
		density: 1.1,
		phH2O: 7.15,
		phKCl: 6.45,
		hExch: 0,
		hHydro: .7
	}
];
var STEPS_LAB1 = [
	"Суха наважка ґрунту (10 г)",
	"Додавання 50 мл дистильованої H₂O (1:5): утворення суспензії",
	"Перемішування суспензії 5 хв та відстоювання",
	"Калібрування pH-метра (буфери pH 4.01 / 6.86)",
	"Занурення електрода в суспензію та зчитування pH(H₂O)"
];
var STEPS_LAB2 = [
	"Зважування 40 г ґрунту на лабораторних вагах",
	"Додавання 100 мл розчину 1,0 М KCl (1:2,5)",
	"Струшування суспензії 5 хв та фільтрування",
	"Відбір 50 мл фільтрату та внесення фенолфталеїну",
	"Титрування 0,01 М NaOH до слабко-рожевого забарвлення",
	"Фіксація кінцевої точки: слабко-рожеве забарвлення"
];
var STEPS_LAB3 = [
	"Зважування ґрунтової наважки 40 г (ДСТУ 7537:2014)",
	"Додавання 100 мл 1,0 М CH₃COONa (ацетат натрію, pH 8,2)",
	"Витримування 18–20 год та фільтрування",
	"Відбір 50 мл фільтрату та внесення фенолфталеїну",
	"Титрування 0,1 М NaOH до слабко-рожевого забарвлення",
	"Фіксація стійкого слабко-рожевого забарвлення (1 хв)"
];
var NOTES = {
	1: [
		{
			t: "Суху повітряно-суху наважку ґрунту (просіяну крізь сито 1 мм) вміщують у хімічний стакан.",
			c: "Маса наважки: 10,0 ± 0,1 г."
		},
		{
			t: "Дистильовану воду без CO₂ вносять мірним циліндром. Ґрунт змочується й утворює суспензію.",
			c: "Співвідношення ґрунт : розчин = 1 : 5, об'єм 50 мл."
		},
		{
			t: "Суспензію перемішують 5 хв, потім дають відстоятися. Тверді частинки осідають, рідина над осадом каламутна.",
			c: "Тривалість перемішування: 5 хв."
		},
		{
			t: "pH-метр калібрують за двома буферними розчинами. Між буферами електрод промивають дистильованою водою.",
			c: "Нахил електродної характеристики: 95–105 %."
		},
		{
			t: "Електрод опускають по центру суспензії, не торкаючись стінок і дна стакана.",
			c: "Показ стабільний (±0,01 pH) протягом 30 с."
		}
	],
	2: [
		{
			t: "Наважку повітряно-сухого ґрунту зважують на лабораторних вагах.",
			c: "Маса: 40,0 ± 0,1 г."
		},
		{
			t: "До ґрунту в конічній колбі додають розчин KCl.",
			c: "100 мл 1,0 М KCl, співвідношення 1 : 2,5."
		},
		{
			t: "Суспензію струшують, потім фільтрують через щільний фільтр.",
			c: "Струшування: 5 хв. Фільтрат має бути прозорим."
		},
		{
			t: "Піпеткою відбирають прозорий фільтрат у чисту колбу, вносять індикатор.",
			c: "Аліквота 50,0 мл + 2 краплі 1 % фенолфталеїну."
		},
		{
			t: "NaOH подають із бюретки по краплях або безперервно, колбу перемішують. Кінчик бюретки не торкається розчину.",
			c: "Кінцева точка: слабко-рожеве забарвлення."
		},
		{
			t: "Фіксують забарвлення та об'єм титранту за шкалою бюретки.",
			c: "Забарвлення не зникає протягом 30 с."
		}
	],
	3: [
		{
			t: "Ґрунтову наважку зважують на лабораторних вагах.",
			c: "Маса: 40,0 ± 0,1 г."
		},
		{
			t: "До ґрунту в колбі додають розчин ацетату натрію.",
			c: "100 мл 1,0 М CH₃COONa, pH 8,2."
		},
		{
			t: "Колбу закривають пробкою й залишають стояти, ґрунт осідає. Потім суспензію фільтрують.",
			c: "Витримування: 18–20 год."
		},
		{
			t: "Піпеткою відбирають аліквоту фільтрату в титрувальну колбу, вносять фенолфталеїн.",
			c: "Аліквота 50,0 мл + 2 краплі фенолфталеїну."
		},
		{
			t: "0,1 М NaOH подають із бюретки по краплях або безперервно до появи забарвлення.",
			c: "Кінцева точка: слабко-рожеве забарвлення."
		},
		{
			t: "Фіксують забарвлення та об'єм титранту за шкалою бюретки.",
			c: "Забарвлення не зникає протягом 1 хв."
		}
	]
};
var BURETTE_MAX = 10;
var FLOW_STEP = .08;
var FLOW_TICK = 200;
var clamp01 = (x) => Math.max(0, Math.min(1, x));
var seg = (p, a, b) => clamp01((p - a) / (b - a));
var lerp = (a, b, t) => a + (b - a) * t;
var ease = (t) => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
/** Прогрес 0..1 для поточного кроку; скидається при зміні key. */
function useProgress(key, ms) {
	const [s, setS] = (0, import_react.useState)({
		key,
		p: 0
	});
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const t0 = performance_default.now();
		const tick = (t) => {
			const v = clamp01((t - t0) / ms);
			setS({
				key,
				p: v
			});
			if (v < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [key, ms]);
	return s.key === key ? s.p : 0;
}
var STEP_MS = {
	1: [
		3500,
		4e3,
		9e3,
		7e3,
		5e3
	],
	2: [
		4e3,
		4500,
		9e3,
		7500,
		1200,
		1200
	],
	3: [
		4e3,
		4500,
		9e3,
		7500,
		1200,
		1200
	]
};
var Defs = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
	id: "glassG",
	x1: "0",
	x2: "1",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
			offset: "0",
			stopColor: "#94a3b8",
			stopOpacity: ".18"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
			offset: ".45",
			stopColor: "#fff",
			stopOpacity: ".6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
			offset: "1",
			stopColor: "#64748b",
			stopOpacity: ".22"
		})
	]
}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
	id: "naohG",
	x1: "0",
	x2: "1",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
		offset: "0",
		stopColor: "#38bdf8",
		stopOpacity: ".8"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
		offset: "1",
		stopColor: "#0369a1",
		stopOpacity: ".9"
	})]
})] });
var Bench = ({ y = 338 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
	x1: "10",
	x2: "550",
	y1: y,
	y2: y,
	stroke: "#94a3b8",
	strokeWidth: "3",
	strokeLinecap: "round"
}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
	x: "10",
	y: y + 2,
	width: "540",
	height: "6",
	fill: "#94a3b8",
	opacity: ".12"
})] });
var Chip = ({ x, y, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
	x: x - text.length * 4.6 - 12,
	y: y - 17,
	width: text.length * 9.2 + 24,
	height: "28",
	rx: "14",
	fill: "#0f172a",
	opacity: ".82"
}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
	x,
	y: y + 2,
	textAnchor: "middle",
	fontSize: "15",
	fontFamily: "monospace",
	fill: "#e2e8f0",
	children: text
})] });
var Mound = ({ cx, base, w, h, o = 1 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
	opacity: o,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: `M${cx - w / 2} ${base} Q${cx - w / 4} ${base - h * 1.1} ${cx} ${base - h} Q${cx + w / 4} ${base - h * 1.1} ${cx + w / 2} ${base} Z`,
		fill: "#8d6e63"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		fill: "#5d4037",
		opacity: ".55",
		children: [
			{
				a: -.25,
				b: .35
			},
			{
				a: .1,
				b: .55
			},
			{
				a: .3,
				b: .25
			},
			{
				a: -.05,
				b: .2
			},
			{
				a: .18,
				b: .8
			}
		].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: cx + d.a * w,
			cy: base - h * d.b,
			r: Math.max(1.2, w / 40)
		}, i))
	})]
});
/** Частинки, що рухаються еліптичними орбітами (перемішування / струшування). */
var Swirl = ({ cx, y0, spread, rx }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
	fill: "#6b4f3f",
	children: Array.from({ length: 16 }).map((_, i) => {
		const y = y0 + i * 37 % spread;
		const r = 6 + i * 7 % rx;
		const ry = 3 + i % 3 * 2;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			r: 1.6 + i % 3 * .7,
			opacity: ".75",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", {
				dur: `${1 + i % 5 * .22}s`,
				begin: `${-i * .37}s`,
				repeatCount: "indefinite",
				path: `M${cx - r} ${y} a${r} ${ry} 0 1 0 ${2 * r} 0 a${r} ${ry} 0 1 0 ${-2 * r} 0`
			})
		}, i);
	})
});
var StaticDots = ({ cx, y0, spread, o }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
	fill: "#6b4f3f",
	opacity: o,
	children: Array.from({ length: 16 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: cx - 40 + i * 29 % 80,
		cy: y0 + i * 37 % spread,
		r: 1.5 + i % 3 * .7
	}, i))
});
/** Конічна колба. Центр у x=0, дно y=336, горловина зверху y=250. */
var FLASK_D = "M-22 250 L-20 290 L-80 330 Q-84 336 -76 336 L76 336 Q84 336 80 330 L20 290 L22 250";
function Flask({ id, surf, fill, fillOpacity = 1, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
			id,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-22 250 L-20 290 L-80 330 Q-84 336 -76 336 L76 336 Q84 336 80 330 L20 290 L22 250Z" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			clipPath: `url(#${id})`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "-90",
					y: surf,
					width: "180",
					height: 345 - surf,
					fill,
					fillOpacity
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M-90 ${surf} H90`,
					stroke: "#fff",
					strokeOpacity: ".55",
					strokeWidth: "1.5"
				}),
				children
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: FLASK_D,
			fill: "url(#glassG)",
			fillOpacity: ".5",
			stroke: "#64748b",
			strokeWidth: "2.5",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M-27 250 H27",
			stroke: "#64748b",
			strokeWidth: "3",
			strokeLinecap: "round"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M-12 302 L-52 328",
			stroke: "#fff",
			strokeOpacity: ".5",
			strokeWidth: "3",
			strokeLinecap: "round"
		})
	] });
}
/** Мірний циліндр, нахилений над ємністю. (lx, ly) — крайка носика. */
function PouringCylinder({ lx, ly, left, label }) {
	const L = 110 * left;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${lx} ${ly}) rotate(135)`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "-13",
				y: "0",
				width: "26",
				height: "110",
				rx: "3",
				fill: "url(#glassG)",
				stroke: "#64748b",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "-2",
				y: "0",
				width: "15",
				height: L,
				fill: "#bae6fd",
				fillOpacity: ".8"
			}),
			[
				20,
				40,
				60,
				80,
				100
			].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M-13 ${y} h7`,
				stroke: "#475569",
				strokeWidth: "1"
			}, y)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "0",
				y: "-8",
				fontSize: "12",
				fill: "#475569",
				textAnchor: "middle",
				transform: "rotate(180)",
				children: label
			})
		]
	});
}
var FlowLine = ({ x, y1, y2 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
	x1: x,
	x2: x,
	y1,
	y2,
	stroke: "#38bdf8",
	strokeWidth: "3",
	strokeLinecap: "round",
	strokeDasharray: "8 3",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
		attributeName: "stroke-dashoffset",
		from: "11",
		to: "0",
		dur: ".35s",
		repeatCount: "indefinite"
	})
});
function Lab1Scene({ step, p, ph }) {
	const cx = 440, top = 150, bot = 320;
	const fill = step === 0 ? 0 : step === 1 ? ease(seg(p, .15, .9)) : 1;
	const surf = lerp(316, 214, fill);
	const stir = step === 2 && p < .7;
	const settle = step === 2 ? ease(seg(p, .7, 1)) : step >= 3 ? 1 : 0;
	const wall = `M370 ${top} L380 316 Q381 ${bot} 386 ${bot} L494 ${bot} Q499 ${bot} 500 316 L510 ${top}`;
	let ex = 300, ey = 135, eOp = 0;
	if (step === 3) {
		eOp = seg(p, 0, .1);
		ey = lerp(135, 300, ease(seg(p, 0, .2)));
	} else if (step >= 4) {
		eOp = 1;
		if (p < .3) ey = lerp(300, 135, ease(seg(p, 0, .3)));
		else if (p < .6) {
			ex = lerp(300, 440, ease(seg(p, .3, .6)));
			ey = 135;
		} else {
			ex = 440;
			ey = lerp(135, 285, ease(seg(p, .6, 1)));
		}
	}
	let main = "— —", sub = "";
	if (step === 3) if (p < .2) {
		main = "—.——";
		sub = "електрод у буфері";
	} else if (p < .5) {
		main = lerp(7.2, 4.01, ease(seg(p, .2, .4))).toFixed(2);
		sub = p < .4 ? "CAL 1: дрейф" : "CAL 1: pH 4.01 ок";
	} else if (p < .6) {
		main = "—.——";
		sub = "промивання електрода";
	} else if (p < .9) {
		main = lerp(4.5, 6.86, ease(seg(p, .6, .8))).toFixed(2);
		sub = p < .8 ? "CAL 2: дрейф" : "CAL 2: pH 6.86 ок";
	} else {
		main = "6.86";
		sub = "нахил 98,7 %";
	}
	else if (step >= 4) if (p < .65) {
		main = "—.——";
		sub = "промивання електрода";
	} else if (p < .97) {
		main = (ph + .35 * (1 - ease(seg(p, .8, 1)))).toFixed(2);
		sub = "стабілізація…";
	} else {
		main = ph.toFixed(2);
		sub = "сигнал стабільний";
	}
	const bufferLow = step === 3 && p < .55;
	const bufferColor = bufferLow ? "#fca5a5" : "#fde68a";
	const mm = Math.floor(seg(p, 0, .7) * 300 / 60), ss = Math.floor(seg(p, 0, .7) * 300 % 60);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			style: {
				transform: `translate(${step < 3 ? -140 : 0}px, 0)`,
				transition: "transform .8s ease"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 360,
					y: "320",
					width: "160",
					height: "18",
					rx: "5",
					fill: "#475569"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 500,
					cy: "329",
					r: "4",
					fill: "#94a3b8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 380,
					y: "326",
					width: "40",
					height: "5",
					rx: "2",
					fill: "#1e293b"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
					id: "lab1beaker",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: wall + "Z" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					clipPath: "url(#lab1beaker)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mound, {
							cx,
							base: 318,
							w: 100,
							h: 30,
							o: step === 0 ? 1 : Math.max(0, 1 - fill * 1.1)
						}),
						fill > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: 365,
							y: surf,
							width: "150",
							height: 330 - surf,
							fill: "#b59a72",
							fillOpacity: lerp(.65, .4, settle)
						}),
						fill > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: stir ? `M370 ${surf} Q420 ${surf} ${cx} ${surf + 10} Q460 ${surf} 510 ${surf}` : `M370 ${surf} H510`,
							stroke: "#fff",
							strokeOpacity: ".6",
							strokeWidth: "1.5",
							fill: "none"
						}),
						fill > .9 && stir && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swirl, {
							cx,
							y0: surf + 14,
							spread: 80,
							rx: 36
						}),
						fill > .5 && !stir && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaticDots, {
							cx,
							y0: surf + 10,
							spread: 80,
							o: (1 - settle) * .8 * fill
						}),
						settle > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: 370,
							y: 316 - 16 * settle,
							width: "140",
							height: "22",
							fill: "#6b4f3f",
							opacity: .9
						}),
						stir && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							transform: `translate(${cx} 313)`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", {
								attributeName: "transform",
								type: "scale",
								values: "1 1;0.15 1;1 1",
								dur: ".5s",
								repeatCount: "indefinite"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "-16",
								y: "-3",
								width: "32",
								height: "6",
								rx: "3",
								fill: "#f1f5f9",
								stroke: "#64748b"
							})] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: wall,
					fill: "url(#glassG)",
					fillOpacity: ".5",
					stroke: "#64748b",
					strokeWidth: "3",
					strokeLinejoin: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M364 ${top} H516`,
					stroke: "#64748b",
					strokeWidth: "3",
					strokeLinecap: "round"
				}),
				step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					x: cx,
					y: 128,
					text: "m = 10,0 г (суха наважка)"
				}),
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					x: 490,
					y: 70,
					text: `V = ${Math.round(50 * fill)} мл H₂O`
				}),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					x: cx,
					y: 128,
					text: stir ? `перемішування ${mm}:${String(ss).padStart(2, "0")} / 5:00` : "відстоювання"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: cx,
					y: "356",
					textAnchor: "middle",
					fontSize: "14",
					fill: "#64748b",
					children: step === 0 ? "Хімічний стакан із сухим ґрунтом" : "Суспензія ґрунту (1 : 5)"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			style: {
				transform: `translate(${step < 3 ? -140 : 0}px, 0)`,
				transition: "transform .8s ease"
			},
			children: step === 1 && p < .92 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PouringCylinder, {
				lx: 400,
				ly: 112,
				left: 1 - ease(seg(p, .12, .9)),
				label: "50 мл"
			}), p > .1 && p < .9 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowLine, {
				x: 400,
				y1: 118,
				y2: surf
			})] })
		}),
		step >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			opacity: step === 3 ? seg(p, 0, .1) : 1,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "30",
					y: "196",
					width: "170",
					height: "142",
					rx: "12",
					fill: "#1e293b",
					stroke: "#64748b",
					strokeWidth: "3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "44",
					y: "210",
					width: "142",
					height: "62",
					rx: "5",
					fill: "#071827"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "115",
					y: "228",
					textAnchor: "middle",
					fontSize: "12",
					fill: "#94a3b8",
					fontFamily: "monospace",
					children: sub
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "115",
					y: "258",
					textAnchor: "middle",
					fontSize: "32",
					fill: "#6ee7b7",
					fontFamily: "monospace",
					fontWeight: "bold",
					children: main
				}),
				[
					70,
					115,
					160
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: "296",
					r: "8",
					fill: "#334155",
					stroke: "#64748b"
				}, x)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "115",
					y: "326",
					textAnchor: "middle",
					fontSize: "12",
					fill: "#cbd5e1",
					children: "pH-МЕТР"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
					id: "bufClip",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M268 240 L274 316 Q275 320 279 320 L321 320 Q325 320 326 316 L332 240Z" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					clipPath: "url(#bufClip)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "260",
						y: "260",
						width: "80",
						height: "70",
						fill: bufferColor,
						fillOpacity: ".75"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M268 240 L274 316 Q275 320 279 320 L321 320 Q325 320 326 316 L332 240",
					fill: "url(#glassG)",
					fillOpacity: ".5",
					stroke: "#64748b",
					strokeWidth: "2.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "300",
					y: "356",
					textAnchor: "middle",
					fontSize: "14",
					fill: "#64748b",
					children: step === 3 ? bufferLow ? "Буфер pH 4.01" : "Буфер pH 6.86" : "Буфер pH 6.86"
				})
			]
		}),
		eOp > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			opacity: eOp,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "545",
					x2: "545",
					y1: "8",
					y2: "338",
					stroke: "#64748b",
					strokeWidth: "6",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "520",
					x2: "560",
					y1: "336",
					y2: "336",
					stroke: "#64748b",
					strokeWidth: "8",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "545",
					x2: ex,
					y1: "22",
					y2: "22",
					stroke: "#64748b",
					strokeWidth: "5",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: ex - 9,
					y: "16",
					width: "18",
					height: "12",
					rx: "3",
					fill: "#94a3b8",
					stroke: "#475569"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: ex,
					x2: ex,
					y1: "28",
					y2: ey - 106,
					stroke: "#94a3b8",
					strokeWidth: "3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M${ex - 4} ${ey - 100} C${ex - 4} 70, 170 70, 170 196`,
					fill: "none",
					stroke: "#334155",
					strokeWidth: "2.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: ex - 7,
					y: ey - 106,
					width: "14",
					height: "12",
					rx: "2",
					fill: "#334155"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: ex - 4,
					y: ey - 94,
					width: "8",
					height: "88",
					fill: "#cbd5e1",
					stroke: "#64748b"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: ex,
					cy: ey - 7,
					rx: "6",
					ry: "8",
					fill: "#67e8f9",
					stroke: "#0e7490"
				})
			]
		})
	] });
}
function WeighScene({ p }) {
	const m = 40 * ease(seg(p, .05, .95));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "70",
			y: "262",
			width: "80",
			height: "76",
			rx: "8",
			fill: "url(#glassG)",
			stroke: "#64748b",
			strokeWidth: "2.5"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "74",
			y: "285",
			width: "72",
			height: "50",
			rx: "5",
			fill: "#8d6e63"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "70",
			y: "252",
			width: "80",
			height: "12",
			rx: "3",
			fill: "#475569"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "110",
			y: "356",
			textAnchor: "middle",
			fontSize: "14",
			fill: "#64748b",
			children: "Повітряно-сухий ґрунт"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "190",
			y: "296",
			width: "210",
			height: "42",
			rx: "8",
			fill: "#475569"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "220",
			y: "304",
			width: "150",
			height: "26",
			rx: "4",
			fill: "#071827"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
			x: "295",
			y: "323",
			textAnchor: "middle",
			fontSize: "22",
			fontFamily: "monospace",
			fontWeight: "bold",
			fill: "#6ee7b7",
			children: [m.toFixed(2), " г"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "290",
			y: "274",
			width: "10",
			height: "24",
			fill: "#94a3b8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: "295",
			cy: "272",
			rx: "78",
			ry: "7",
			fill: "#cbd5e1",
			stroke: "#64748b",
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M250 262 L340 262 L330 270 L260 270 Z",
			fill: "#e2e8f0",
			stroke: "#64748b",
			strokeWidth: "1.5"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mound, {
			cx: 295,
			base: 262,
			w: 66,
			h: 4 + 30 * ease(seg(p, .05, .95))
		}),
		p < .97 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: "rotate(25 400 190)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "330",
				y: "186",
				width: "90",
				height: "6",
				rx: "3",
				fill: "#94a3b8"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M330 186 L312 189 L330 192 Z",
				fill: "#cbd5e1"
			})]
		}), [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 313 + i * 3,
			r: "2",
			fill: "#6b4f3f",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
				attributeName: "cy",
				from: "192",
				to: "256",
				dur: ".5s",
				begin: `${-i * .17}s`,
				repeatCount: "indefinite"
			})
		}, i))] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			x: 295,
			y: 140,
			text: "m = 40,0 г"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "295",
			y: "356",
			textAnchor: "middle",
			fontSize: "14",
			fill: "#64748b",
			children: "Лабораторні ваги"
		})
	] });
}
function PourScene({ p, lab }) {
	const cx = 330;
	const fill = ease(seg(p, .15, .9));
	const surf = lerp(332, 302, fill);
	const reagent = lab === 2 ? "1,0 М KCl" : "1,0 М CH₃COONa";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: `translate(${cx} 0)`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flask, {
				id: "flPour",
				surf,
				fill: "#b59a72",
				fillOpacity: .6 * fill,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mound, {
					cx: 0,
					base: 336,
					w: 110,
					h: 26,
					o: Math.max(0, 1 - fill * 1.1)
				}), fill > .5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaticDots, {
					cx: 0,
					y0: surf + 6,
					spread: 26,
					o: fill * .8
				})]
			})
		}),
		p < .92 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PouringCylinder, {
			lx: 334,
			ly: 218,
			left: 1 - ease(seg(p, .12, .9)),
			label: "100 мл"
		}), p > .1 && p < .9 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowLine, {
			x: cx,
			y1: 224,
			y2: surf
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			x: 135,
			y: 110,
			text: `${reagent}, ${Math.round(100 * fill)} мл`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: cx,
			y: "356",
			textAnchor: "middle",
			fontSize: "14",
			fill: "#64748b",
			children: "Конічна колба: ґрунт + розчин"
		})
	] });
}
function FilterScene({ p, lab }) {
	const L = 150, R = 420;
	const phase1 = p < .5;
	const q = seg(p, 0, .5);
	const f = ease(seg(p, .5, 1));
	const leftSurf = lerp(302, 332, f);
	const recvSurf = lerp(336, 306, f);
	const load = seg(f, 0, .08) * (1 - seg(f, .9, 1));
	const settle = lab === 3 ? ease(q) : 0;
	const clockH = lab === 3 ? 19 * q : 0;
	const mm = Math.floor(q * 300 / 60), ss = Math.floor(q * 300 % 60);
	const dropping = !phase1 && f > .08 && f < .96;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, { y: 350 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 55,
			y: "336",
			width: "190",
			height: "14",
			rx: "4",
			fill: lab === 2 ? "#475569" : "#a8a29e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: `translate(${L} 0)`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				lab === 2 && phase1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", {
					attributeName: "transform",
					type: "translate",
					values: "-8 0;8 0;-8 0",
					dur: ".45s",
					repeatCount: "indefinite"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flask, {
					id: "flSusp",
					surf: leftSurf,
					fill: "#b59a72",
					fillOpacity: .6 - .25 * settle,
					children: [
						lab === 2 && phase1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swirl, {
							cx: 0,
							y0: leftSurf + 6,
							spread: 26,
							rx: 40
						}),
						lab === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaticDots, {
							cx: 0,
							y0: leftSurf + 4,
							spread: 28,
							o: (1 - settle) * .8
						}),
						lab === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "-90",
							y: 332 - 14 * settle,
							width: "180",
							height: "20",
							fill: "#6b4f3f",
							opacity: .9 * settle
						})
					]
				}),
				phase1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-23 238 L23 238 L19 254 L-19 254 Z",
					fill: "#b45309",
					stroke: "#78350f"
				})
			] })
		}),
		lab === 3 && phase1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: L,
				cy: "140",
				r: "26",
				fill: "#fff",
				stroke: "#64748b",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: L,
				y1: "140",
				x2: L,
				y2: "122",
				stroke: "#0f172a",
				strokeWidth: "3",
				strokeLinecap: "round",
				transform: `rotate(${clockH / 12 * 360} ${L} 140)`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: L,
				y1: "140",
				x2: L,
				y2: "118",
				stroke: "#ef4444",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				transform: `rotate(${clockH * 360} ${L} 140)`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: L,
				cy: "140",
				r: "2.5",
				fill: "#0f172a"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(${R} 0)`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flask, {
					id: "flRecv",
					surf: recvSurf,
					fill: "#bae6fd",
					fillOpacity: .55
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-40 170 L-4 232 L-4 276 L4 276 L4 232 L40 170",
					fill: "url(#glassG)",
					fillOpacity: ".5",
					stroke: "#64748b",
					strokeWidth: "2.5",
					strokeLinejoin: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-36 173 L0 237 L36 173 Z",
					fill: "#fefce8",
					stroke: "#d6d3d1"
				}),
				load > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-27 190 L27 190 L0 235 Z",
					fill: "#8d6e63",
					opacity: .85 * load
				}),
				dropping && [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "0",
					r: "2.5",
					fill: "#7dd3fc",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
						attributeName: "cy",
						from: "280",
						to: recvSurf,
						dur: ".5s",
						begin: `${-i * .25}s`,
						repeatCount: "indefinite"
					})
				}, i))
			]
		}),
		phase1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			x: L,
			y: lab === 3 ? 100 : 160,
			text: lab === 2 ? `струшування ${mm}:${String(ss).padStart(2, "0")} / 5:00` : `витримування ${clockH.toFixed(0)} год / 18–20 год`
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			x: R,
			y: 140,
			text: `фільтрат ${Math.round(100 * f)} мл`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: L,
			y: "366",
			textAnchor: "middle",
			fontSize: "14",
			fill: "#64748b",
			children: lab === 2 ? "Шейкер" : "Суспензія осідає"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: R,
			y: "366",
			textAnchor: "middle",
			fontSize: "14",
			fill: "#64748b",
			children: "Фільтр і колба-приймач"
		})
	] });
}
function AliquotScene({ p }) {
	const A = 130, B = 400;
	let px = A, tipY = 150, frac = 0;
	tipY = lerp(150, 322, ease(seg(p, 0, .15)));
	frac = seg(p, .15, .28);
	if (p >= .28 && p < .4) {
		tipY = lerp(322, 150, ease(seg(p, .28, .4)));
		frac = 1;
	} else if (p >= .4 && p < .55) {
		tipY = 150;
		px = lerp(A, B, ease(seg(p, .4, .55)));
		frac = 1;
	} else if (p >= .55) {
		px = B;
		frac = 1 - seg(p, .62, .76);
		tipY = p < .62 ? lerp(150, 230, ease(seg(p, .55, .62))) : p < .76 ? 230 : lerp(230, 150, ease(seg(p, .76, .82)));
	}
	const recvSurf = 318 + 8 * ease(seg(p, .15, .28));
	const surfB = lerp(334, 314, ease(seg(p, .62, .76)));
	const showPip = p < .82;
	const pour = p >= .62 && p < .76;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: `translate(${A} 0)`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flask, {
				id: "flA",
				surf: recvSurf,
				fill: "#bae6fd",
				fillOpacity: .55
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: `translate(${B} 0)`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flask, {
				id: "flB",
				surf: surfB,
				fill: "#bae6fd",
				fillOpacity: .55
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: A,
			y: "356",
			textAnchor: "middle",
			fontSize: "14",
			fill: "#64748b",
			children: "Фільтрат"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: B,
			y: "356",
			textAnchor: "middle",
			fontSize: "14",
			fill: "#64748b",
			children: "Колба для титрування"
		}),
		showPip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: "pipClip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: px - 14,
					y: tipY - frac * 92,
					width: "28",
					height: frac * 92 + 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				clipPath: "url(#pipClip)",
				fill: "#7dd3fc",
				opacity: ".85",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: px - 2.5,
					y: tipY - 52,
					width: "5",
					height: "52"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: px,
					cy: tipY - 70,
					rx: "10",
					ry: "18"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: px - 2.5,
				y: tipY - 52,
				width: "5",
				height: "52",
				fill: "none",
				stroke: "#64748b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${px - 2.5} ${tipY - 8} L${px} ${tipY} L${px + 2.5} ${tipY - 8}`,
				fill: "none",
				stroke: "#64748b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: px,
				cy: tipY - 70,
				rx: "10",
				ry: "18",
				fill: "url(#glassG)",
				fillOpacity: ".4",
				stroke: "#64748b",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: px - 2.5,
				y: tipY - 122,
				width: "5",
				height: "34",
				fill: "none",
				stroke: "#64748b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${px - 5} ${tipY - 108} h10`,
				stroke: "#ef4444",
				strokeWidth: "1.5"
			}),
			pour && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowLine, {
				x: px,
				y1: tipY + 2,
				y2: surfB
			})
		] }),
		p >= .82 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: B,
				cy: "38",
				rx: "11",
				ry: "8",
				fill: "#1f2937"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 380,
				y: "44",
				width: "40",
				height: "52",
				rx: "6",
				fill: "#f59e0b",
				fillOpacity: ".9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: B,
				y: "74",
				textAnchor: "middle",
				fontSize: "9",
				fill: "#451a03",
				children: "фенолфт."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M393 96 L393 114 L${B} 128 L407 114 L407 96 Z`,
				fill: "#e2e8f0",
				stroke: "#64748b"
			}),
			[.86, .94].map((k) => {
				const t = seg(p, k, k + .06);
				const b = seg(p, k + .06, k + .14);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [t > 0 && t < 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: B,
					cy: lerp(130, surfB, t * t),
					r: "3",
					fill: "#e2e8f0",
					stroke: "#94a3b8"
				}), b > 0 && b < 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: B,
					cy: surfB + 6,
					r: lerp(3, 14, b),
					fill: "#f472b6",
					opacity: .5 * (1 - b)
				})] }, k);
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			x: 200,
			y: 90,
			text: p < .62 ? "піпетка: аліквота 50 мл" : p < .82 ? "50,0 мл у колбі" : "+ 2 краплі фенолфталеїну"
		})
	] });
}
function TitrationScene({ lab, step, vol, target, tol, flowing, drop, dropKey, outcome }) {
	const cx = 330;
	const levelTop = Math.min(186, 34 + vol * 14.2);
	const surf = 314 - Math.min(vol, BURETTE_MAX) * .9;
	const over = vol > target + tol;
	const near = vol > 0 && vol >= target - tol && !over;
	const col = over ? "rgba(219,39,119,.88)" : near ? "rgba(244,114,182,.6)" : "rgba(186,230,253,.55)";
	const open = flowing;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "230",
			y: "338",
			width: "200",
			height: "5",
			rx: "2",
			fill: "#f1f5f9",
			stroke: "#cbd5e1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "110",
			x2: "110",
			y1: "14",
			y2: "338",
			stroke: "#64748b",
			strokeWidth: "7",
			strokeLinecap: "round"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "60",
			x2: "190",
			y1: "336",
			y2: "336",
			stroke: "#64748b",
			strokeWidth: "8",
			strokeLinecap: "round"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "110",
			x2: 316,
			y1: "44",
			y2: "44",
			stroke: "#64748b",
			strokeWidth: "6",
			strokeLinecap: "round"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 310,
			y: "36",
			width: "40",
			height: "16",
			rx: "4",
			fill: "#94a3b8",
			stroke: "#475569"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 318,
			y: "14",
			width: "24",
			height: "172",
			rx: "4",
			fill: "url(#glassG)",
			stroke: "#64748b",
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 322,
			y: levelTop,
			width: "16",
			height: 186 - levelTop,
			fill: "url(#naohG)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M322 ${levelTop} H338`,
			stroke: "#e0f2fe",
			strokeWidth: "1.5"
		}),
		Array.from({ length: 11 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M342 ${34 + i * 14.2} h${i % 2 === 0 ? 8 : 5}`,
			stroke: "#475569",
			strokeWidth: "1.2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: 354,
			y: 37 + i * 14.2,
			fontSize: "11",
			fill: "#475569",
			children: i
		})] }, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: 380,
			y: "100",
			fontSize: "13",
			fill: "#0369a1",
			children: lab === 2 ? "0,01 М NaOH" : "0,1 М NaOH"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 314,
			y: "186",
			width: "32",
			height: "8",
			rx: "2",
			fill: "#475569"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cx,
			y: "187",
			width: "36",
			height: "6",
			rx: "3",
			fill: "#0f172a",
			style: {
				transformOrigin: `${cx}px 190px`,
				transform: `rotate(${open ? -80 : 0}deg)`,
				transition: "transform .3s"
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M327 194 L327 214 L${cx} 226 L333 214 L333 194 Z`,
			fill: "#bae6fd",
			stroke: "#64748b",
			strokeWidth: "1.5"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M${cx} 194 L${cx} 220`,
			stroke: "#0284c7",
			strokeWidth: "2"
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowLine, {
			x: cx,
			y1: 228,
			y2: surf
		}),
		!open && drop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx,
			cy: "228",
			r: "3.5",
			fill: "#0284c7",
			stroke: "#38bdf8",
			style: {
				animation: "dropFall .45s cubic-bezier(.5,0,1,1) forwards",
				"--fall": `${surf - 230}px`
			}
		}, dropKey),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: `translate(${cx} 0)`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flask, {
				id: "flTit",
				surf,
				fill: col,
				fillOpacity: 1,
				children: (open || drop) && vol > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "0",
					cy: surf + 6,
					r: "16",
					fill: "#ec4899",
					style: {
						transformBox: "fill-box",
						transformOrigin: "center",
						animation: open ? "none" : "pinkBloom 1.1s ease-out forwards",
						opacity: open ? .45 : void 0
					}
				}, drop ? dropKey : "s")
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: cx,
			y: "356",
			textAnchor: "middle",
			fontSize: "14",
			fill: "#64748b",
			children: "50 мл фільтрату + фенолфталеїн"
		}),
		step === 5 && outcome && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			x: 470,
			y: 300,
			text: outcome === "correct" ? "стійке слабко-рожеве" : outcome === "over" ? "малинове (надлишок)" : "безбарвне (недотитровано)"
		})
	] });
}
function LabScene(props) {
	const { lab, step, ph, onSettled } = props;
	const p = useProgress(`${lab}-${step}`, STEP_MS[lab]?.[step] ?? 1e3);
	const done = p >= 1;
	(0, import_react.useEffect)(() => {
		onSettled(done);
	}, [done, onSettled]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 560 380",
		className: "w-full max-w-[620px]",
		role: "img",
		"aria-label": "Візуалізація етапу лабораторної роботи",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Defs, {}), lab === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab1Scene, {
			step,
			p,
			ph
		}) : step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeighScene, { p }) : step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PourScene, {
			p,
			lab
		}) : step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterScene, {
			p,
			lab
		}) : step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AliquotScene, { p }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitrationScene, {
			...props,
			lab
		})]
	});
}
function LabTab() {
	const { add } = useJournal();
	const [selectedSample, setSelectedSample] = (0, import_react.useState)(SAMPLES[0]);
	const [labMode, setLabMode] = (0, import_react.useState)("learn");
	const [activeLab, setActiveLab] = (0, import_react.useState)(1);
	const [currentStep, setCurrentStep] = (0, import_react.useState)(0);
	const [phMeterReading, setPhMeterReading] = (0, import_react.useState)(null);
	const [titrantVolume, setTitrantVolume] = (0, import_react.useState)(0);
	const [isAutoTitrating, setIsAutoTitrating] = (0, import_react.useState)(false);
	const [pour, setPour] = (0, import_react.useState)(null);
	const [dropKey, setDropKey] = (0, import_react.useState)(0);
	const [sceneDone, setSceneDone] = (0, import_react.useState)(false);
	const pourTimer = (0, import_react.useRef)(null);
	const [titrationOutcome, setTitrationOutcome] = (0, import_react.useState)(null);
	const [resultsLab1, setResultsLab1] = (0, import_react.useState)(null);
	const [resultsLab2, setResultsLab2] = (0, import_react.useState)(null);
	const [resultsLab3, setResultsLab3] = (0, import_react.useState)(null);
	const targetEndpointVolume = activeLab === 2 ? selectedSample.hExch * 40 * 50 / 500 : selectedSample.hHydro / .875;
	const endpointTolerance = Math.max(.05, targetEndpointVolume * .02);
	(0, import_react.useEffect)(() => {
		if (!isAutoTitrating || currentStep !== 4 || titrationOutcome !== null) return;
		const id = window.setInterval(() => {
			setTitrantVolume((prev) => Math.min(BURETTE_MAX, Number((prev + FLOW_STEP).toFixed(2))));
		}, FLOW_TICK);
		return () => window.clearInterval(id);
	}, [
		isAutoTitrating,
		currentStep,
		titrationOutcome
	]);
	(0, import_react.useEffect)(() => {
		if (isAutoTitrating && titrantVolume >= BURETTE_MAX) setIsAutoTitrating(false);
	}, [isAutoTitrating, titrantVolume]);
	(0, import_react.useEffect)(() => () => {
		if (pourTimer.current) window.clearTimeout(pourTimer.current);
	}, []);
	const handleSelectLab = (labId) => {
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
	const handleAddDrop = (amount) => {
		if (currentStep !== 4 || titrationOutcome !== null) return;
		setTitrantVolume((prev) => Math.min(BURETTE_MAX, Number((prev + amount).toFixed(2))));
		const single = amount <= .02;
		if (single) setDropKey((k) => k + 1);
		setPour(single ? "drop" : "stream");
		if (pourTimer.current) window.clearTimeout(pourTimer.current);
		pourTimer.current = window.setTimeout(() => setPour(null), single ? 450 : 700);
	};
	const handleFinishTitration = () => {
		if (currentStep !== 4) return;
		setIsAutoTitrating(false);
		setPour(null);
		let outcome;
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
		if (activeLab === 1 && currentStep === 3) setPhMeterReading(selectedSample.phH2O);
		if ((activeLab === 2 || activeLab === 3) && currentStep === 3) setTitrantVolume(0);
		if ((activeLab === 2 || activeLab === 3) && currentStep === 4) {
			toast.error("Спочатку завершіть титрування та зафіксуйте кінцеву точку.");
			return;
		}
		if (currentStep < totalSteps - 1) setCurrentStep((prev) => prev + 1);
	};
	const handleCompleteLab = () => {
		const now = (/* @__PURE__ */ new Date()).toLocaleDateString("uk-UA");
		if (activeLab === 1) {
			setResultsLab1({
				phH2O: selectedSample.phH2O,
				date: now
			});
			toast.success("Лабораторну роботу № 1 завершено!");
		} else if (activeLab === 2) {
			if (currentStep !== 5 || titrationOutcome === null) {
				toast.error("Завершіть титрування та зафіксуйте кінцеву точку.");
				return;
			}
			const measured = targetEndpointVolume > 0 ? selectedSample.hExch * titrantVolume / targetEndpointVolume : 0;
			setResultsLab2({
				phKCl: selectedSample.phKCl,
				hExch: measured,
				vNaOH: titrantVolume,
				outcome: titrationOutcome
			});
			toast.success("Результат титрування № 2 внесено до протоколу.");
		} else if (activeLab === 3) {
			if (currentStep !== 5 || titrationOutcome === null) {
				toast.error("Завершіть титрування та зафіксуйте кінцеву точку.");
				return;
			}
			const measured = targetEndpointVolume > 0 ? selectedSample.hHydro * titrantVolume / targetEndpointVolume : 0;
			setResultsLab3({
				hHydro: measured,
				vNaOH: titrantVolume,
				outcome: titrationOutcome
			});
			toast.success("Результат титрування № 3 внесено до протоколу.");
		}
	};
	const calcCaCO3 = (hHydro, density) => {
		return (.05 * hHydro * density * 20).toFixed(2);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
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
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-8 p-4 rounded-2xl border bg-card space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-4 w-4 text-purple-600" }), " Досліджуваний ґрунтовий зразок"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-500/20",
							children: selectedSample.code
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
						children: SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setSelectedSample(sample);
								handleResetLab();
								setResultsLab1(null);
								setResultsLab2(null);
								setResultsLab3(null);
							},
							className: `p-3 rounded-xl border text-left transition-all ${selectedSample.id === sample.id ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/30 font-semibold" : "bg-card hover:bg-muted"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-bold text-foreground truncate",
								children: sample.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground mt-1",
								children: sample.type
							})]
						}, sample.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-4 p-4 rounded-2xl border bg-card flex flex-col justify-between space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-600" }), " Режим виконання"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex p-1 bg-muted rounded-xl border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLabMode("learn"),
								className: `flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${labMode === "learn" ? "bg-background text-emerald-700 dark:text-emerald-400 shadow-sm" : "text-muted-foreground"}`,
								children: "🎓 Навчальний"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLabMode("control"),
								className: `flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${labMode === "control" ? "bg-background text-rose-700 dark:text-rose-400 shadow-sm" : "text-muted-foreground"}`,
								children: "⏱️ Контрольний"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground leading-tight",
							children: labMode === "learn" ? "Покрокові методичні підказки та візуальний контроль індикатора." : "Самостійне фіксування об'ємів титранту без підказок."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 p-1 bg-muted/60 rounded-xl border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSelectLab(1),
						className: `flex-1 min-w-[200px] px-4 py-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-between ${activeLab === 1 ? "bg-background text-emerald-700 dark:text-emerald-400 shadow border" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-4 w-4 text-emerald-600" }), " Лаб №1: Актуальна pH(H₂O)"]
						}), resultsLab1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-600" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSelectLab(2),
						className: `flex-1 min-w-[200px] px-4 py-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-between ${activeLab === 2 ? "bg-background text-amber-700 dark:text-amber-400 shadow border" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestTube, { className: "h-4 w-4 text-amber-600" }), " Лаб №2: Обмінна (1 М KCl)"]
						}), resultsLab2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-amber-600" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSelectLab(3),
						className: `flex-1 min-w-[200px] px-4 py-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-between ${activeLab === 3 ? "bg-background text-indigo-700 dark:text-indigo-400 shadow border" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-4 w-4 text-indigo-600" }), " Лаб №3: Гідролітична (CH₃COONa)"]
						}), resultsLab3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-indigo-600" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-7 p-6 rounded-2xl border bg-card flex flex-col justify-between min-h-[460px] relative overflow-hidden shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center border-b pb-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold text-foreground",
								children: [
									activeLab === 1 && "Лабораторна робота № 1 (ДСТУ ISO 10390:2007 / ДСТУ 7862:2015)",
									activeLab === 2 && "Лабораторна робота № 2 (ДСТУ 7910:2015 — 1.0 М KCl)",
									activeLab === 3 && "Лабораторна робота № 3 (ДСТУ 7537:2014 — Каппен / CH₃COONa)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[11px] bg-muted px-2 py-0.5 rounded",
								children: [
									"Крок ",
									currentStep + 1,
									" з ",
									activeLab === 1 ? STEPS_LAB1.length : activeLab === 2 ? STEPS_LAB2.length : STEPS_LAB3.length
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-5 rounded-2xl border bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950/70 dark:to-slate-900/50 p-4 md:p-6 relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid md:grid-cols-[1fr_190px] gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-center items-center min-h-[300px]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabScene, {
												lab: activeLab,
												step: currentStep,
												ph: selectedSample.phH2O,
												vol: titrantVolume,
												target: targetEndpointVolume,
												tol: endpointTolerance,
												flowing: isAutoTitrating || pour === "stream",
												drop: pour === "drop",
												dropKey,
												outcome: titrationOutcome,
												onSettled: setSceneDone
											})
										}), activeLab === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border bg-white/80 dark:bg-slate-900/80 p-4 space-y-2 shadow-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] uppercase tracking-wider text-muted-foreground font-bold",
													children: "Цифровий індикатор"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-mono text-4xl font-bold tracking-tight text-emerald-600",
													children: currentStep >= 4 && phMeterReading !== null && sceneDone ? phMeterReading.toFixed(2) : "— —"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-muted-foreground",
													children: currentStep < 3 ? "Прилад ще не підготовлено" : currentStep === 3 ? "Калібрування за буферами" : sceneDone ? "Сигнал стабілізовано" : "Електрод переміщується"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 transition-all duration-500",
														style: { width: currentStep >= 4 && phMeterReading !== null && sceneDone ? `${Math.max(5, Math.min(100, phMeterReading * 10))}%` : "0%" }
													})
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border bg-white/85 dark:bg-slate-900/85 p-4 shadow-sm space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] uppercase tracking-wider font-bold text-muted-foreground",
													children: "Витрата титранту"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-mono text-3xl font-bold tabular-nums",
													children: [titrantVolume.toFixed(2), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm ml-1 text-muted-foreground",
														children: "мл"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground",
													children: activeLab === 2 ? "0.01 М NaOH" : "0.1 М NaOH"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full bg-sky-500 transition-all",
														style: { width: `${Math.min(100, labMode === "learn" ? titrantVolume / Math.max(targetEndpointVolume * 1.5, .1) * 100 : titrantVolume / BURETTE_MAX * 100)}%` }
													})
												}),
												labMode === "learn" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-muted-foreground",
													children: [
														"Орієнтир еквівалентності: ",
														targetEndpointVolume.toFixed(2),
														" мл"
													]
												})
											]
										})]
									}),
									activeLab !== 1 && currentStep === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3 border-t pt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setIsAutoTitrating(!isAutoTitrating),
													disabled: titrationOutcome !== null || titrantVolume >= BURETTE_MAX,
													className: `px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40 ${isAutoTitrating ? "bg-rose-600 text-white shadow-sm hover:bg-rose-700" : "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"}`,
													children: [isAutoTitrating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), isAutoTitrating ? "Перекрити кран" : "Відкрити кран (безперервне титрування)"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-[1px] bg-border hidden sm:block" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleAddDrop(.02),
													disabled: titrationOutcome !== null || isAutoTitrating,
													className: "px-3 py-2 rounded-lg border bg-card text-xs font-semibold hover:bg-muted disabled:opacity-40",
													children: "+ 1 крапля (0.02 мл)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleAddDrop(.05),
													disabled: titrationOutcome !== null || isAutoTitrating,
													className: "px-3 py-2 rounded-lg border bg-card text-xs font-semibold hover:bg-muted disabled:opacity-40",
													children: "+ 0.05 мл"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleAddDrop(.2),
													disabled: titrationOutcome !== null || isAutoTitrating,
													className: "px-3 py-2 rounded-lg border bg-card text-xs font-semibold hover:bg-muted disabled:opacity-40",
													children: "+ 0.20 мл"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: handleFinishTitration,
													disabled: titrantVolume <= 0 || titrationOutcome !== null,
													className: "px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 disabled:opacity-40",
													children: "Завершити титрування"
												})
											]
										})
									}),
									titrationOutcome && getTitrationMessage() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `rounded-xl border p-3 text-xs space-y-1 ${getTitrationMessage().tone}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold",
											children: getTitrationMessage().title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "leading-relaxed",
											children: getTitrationMessage().body
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 rounded-xl border bg-muted/40 text-xs space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-bold text-foreground flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-primary" }),
									"Крок ",
									currentStep + 1,
									": ",
									activeLab === 1 ? STEPS_LAB1[currentStep] : activeLab === 2 ? STEPS_LAB2[currentStep] : STEPS_LAB3[currentStep]
								]
							}), labMode === "learn" && NOTES[activeLab][currentStep] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground leading-relaxed",
								children: NOTES[activeLab][currentStep].t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium text-foreground",
								children: ["Контрольований параметр: ", NOTES[activeLab][currentStep].c]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 border-t flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								variant: "outline",
								onClick: handleResetLab,
								className: "text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Скинути"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
									onClick: handleNextStep,
									disabled: currentStep >= (activeLab === 1 ? STEPS_LAB1.length - 1 : activeLab === 2 ? STEPS_LAB2.length - 1 : STEPS_LAB3.length - 1) || (activeLab === 2 || activeLab === 3) && currentStep === 4,
									className: "text-xs",
									children: ["Наступний крок ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 ml-1" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
									variant: "primary",
									onClick: handleCompleteLab,
									disabled: activeLab === 1 && currentStep < STEPS_LAB1.length - 1 || (activeLab === 2 || activeLab === 3) && (currentStep !== 5 || titrationOutcome === null),
									className: "text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5 mr-1" }), " Фіксувати в протокол"]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-5 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl border bg-card space-y-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-semibold text-sm text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-primary" }), " Зведений лабораторний протокол"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono text-muted-foreground",
									children: selectedSample.code
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-xs text-left border-collapse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b bg-muted/50 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-2 font-medium",
												children: "Показник"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-2 font-medium",
												children: "Результат"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-2 font-medium",
												children: "Одиниці вимірювання"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
										className: "divide-y",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 font-medium",
													children: "Актуальна кислотність"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 font-mono font-bold text-emerald-600",
													children: resultsLab1 ? resultsLab1.phH2O.toFixed(2) : "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 text-muted-foreground font-mono",
													children: "pH H₂O"
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 font-medium",
													children: "pH сольової витяжки"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 font-mono font-bold text-amber-600",
													children: resultsLab2 ? resultsLab2.phKCl.toFixed(2) : "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 text-muted-foreground font-mono",
													children: "pH KCl"
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 font-medium",
													children: "Обмінна кислотність"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-2 font-mono font-bold text-amber-600",
													children: [resultsLab2 ? resultsLab2.hExch.toFixed(2) : "—", resultsLab2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[9px] font-normal text-muted-foreground",
														children: [
															"NaOH: ",
															resultsLab2.vNaOH.toFixed(2),
															" мл"
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 text-muted-foreground font-mono",
													children: "мг-екв/100 г ґрунту"
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 font-medium",
													children: "Гідролітична кислотність (Hг)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-2 font-mono font-bold text-indigo-600",
													children: [resultsLab3 ? resultsLab3.hHydro.toFixed(2) : "—", resultsLab3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[9px] font-normal text-muted-foreground",
														children: [
															"NaOH: ",
															resultsLab3.vNaOH.toFixed(2),
															" мл"
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-2 text-muted-foreground font-mono",
													children: "мг-екв/100 г ґрунту"
												})
											] })
										]
									})]
								})
							}),
							resultsLab3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3.5 rounded-xl border bg-purple-500/10 border-purple-500/30 text-xs space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-bold text-purple-700 dark:text-purple-300 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Розрахована норма CaCO₃:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-sm font-extrabold text-foreground",
										children: [calcCaCO3(resultsLab3.hHydro, selectedSample.density), " т/га"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground leading-relaxed",
									children: [
										"Повна норма вапнування для орного шару 20 см (щільність ",
										selectedSample.density,
										" г/см³) за Каппеном."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
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
								},
								className: "w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-sm transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Зберегти протокол у Журнал"]
							})
						]
					})
				})]
			})
		]
	});
}
var MATERIALS = {
	caco3: "Карбонат кальцію (CaCO₃)",
	cao: "Оксид кальцію (CaO)",
	dolomite: "Доломітове борошно"
};
var defaults = {
	hg: "3",
	d: "1.3",
	h: "20",
	hUnit: "cm",
	S: "1",
	sUnit: "ha",
	mat: "caco3",
	nv: "100",
	tol: "1e-9"
};
function CalculatorTab() {
	const { add } = useJournal();
	const [f, setF] = (0, import_react.useState)(defaults);
	const [formula, setFormula] = (0, import_react.useState)("academic");
	const [errs, setErrs] = (0, import_react.useState)([]);
	const [res, setRes] = (0, import_react.useState)(null);
	const [compare, setCompare] = (0, import_react.useState)(false);
	const set = (k) => (v) => setF({
		...f,
		[k]: v
	});
	const compute = () => {
		const r = {
			hg: parseNum(f.hg, "Hг"),
			d: parseNum(f.d, "Щільність d"),
			h: parseNum(f.h, "Глибина h"),
			S: parseNum(f.S, "Площа S"),
			nv: parseNum(f.nv, "Нейтралізуюча здатність")
		};
		const e = Object.values(r).flatMap((x) => x.ok ? [] : [x.error]);
		const val = (k) => r[k].value;
		if (!e.length) {
			if (val("nv") > 200) e.push("Нейтралізуюча здатність понад 200 % фізично некоректна.");
			if (val("d") > 3) e.push("Щільність ґрунту понад 3 г/см³ некоректна.");
			if ((f.hUnit === "cm" ? cmToM(val("h")) : val("h")) > 2) e.push("Глибина орного шару понад 2 м некоректна — перевірте одиниці (см/м).");
		}
		setErrs(e);
		if (e.length) {
			setRes(null);
			return null;
		}
		const hg = val("hg"), d = val("d"), nv = val("nv");
		const h_m = f.hUnit === "cm" ? cmToM(val("h")) : val("h");
		const h_cm = f.hUnit === "cm" ? val("h") : mToCm(val("h"));
		const S_m2 = f.sUnit === "ha" ? haToM2(val("S")) : val("S");
		const S_ha = m2ToHa(S_m2);
		const acadT = limingAcademic(hg, S_m2, d, h_m);
		const exprTHa = limingExpress(hg, d, h_cm);
		const total = formula === "academic" ? acadT : exprTHa * S_ha;
		const perHa = formula === "academic" ? acadT / S_ha : exprTHa;
		const out = {
			formula,
			hg,
			d,
			h_m,
			h_cm,
			S_m2,
			S_ha,
			nv,
			total,
			perHa,
			matTotal: materialRate(total, nv),
			matPerHa: materialRate(perHa, nv),
			acadT,
			exprTHa
		};
		setRes(out);
		return out;
	};
	const tol = Number(f.tol) || 1e-9;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "3.1. Вхідні параметри",
				kind: "user",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-5 w-5 text-primary" }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 inline-flex rounded-lg border bg-muted p-1",
						role: "tablist",
						children: ["academic", "express"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							role: "tab",
							"aria-selected": formula === k,
							onClick: () => {
								setFormula(k);
								setRes(null);
							},
							className: `rounded-md px-4 py-2 text-sm font-medium ${formula === k ? "bg-primary text-primary-foreground" : ""}`,
							children: k === "academic" ? "Академічна (розширена)" : "Експрес (польова)"
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "formula mb-4",
						children: formula === "academic" ? "CaCO₃ = (Hг × 0.5 × S × d × h) / 1000   [т на площу S; S — м², h — м]" : "CaCO₃ = 0.05 × Hг × d × h_cm   [т/га; h — см]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "chg",
								label: "Гідролітична кислотність Hг",
								unit: "мг-екв/100 г",
								value: f.hg,
								onChange: set("hg")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "cd",
								label: "Щільність ґрунту d",
								unit: "г/см³",
								value: f.d,
								onChange: set("d")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "ch",
										label: "Глибина орного шару h",
										value: f.h,
										onChange: set("h")
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Одиниці глибини",
									value: f.hUnit,
									onChange: (e) => setF({
										...f,
										hUnit: e.target.value
									}),
									className: "rounded-md border border-input bg-background px-2 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "cm",
										children: "см"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "m",
										children: "м"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "cs",
										label: "Площа поля S",
										value: f.S,
										onChange: set("S")
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Одиниці площі",
									value: f.sUnit,
									onChange: (e) => setF({
										...f,
										sUnit: e.target.value
									}),
									className: "rounded-md border border-input bg-background px-2 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ha",
										children: "га"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "m2",
										children: "м²"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-medium",
									children: "Вапнякове добриво"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: f.mat,
									onChange: (e) => setF({
										...f,
										mat: e.target.value
									}),
									className: "w-full rounded-md border border-input bg-background px-3 py-2",
									children: Object.entries(MATERIALS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: k,
										children: v
									}, k))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "cnv",
								label: "Нейтралізуюча здатність (CaCO₃-екв.)",
								unit: "%",
								value: f.nv,
								onChange: set("nv"),
								tip: "Введіть явне значення з паспорта матеріалу"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Нейтралізуюча здатність не визначається за назвою матеріалу — вкажіть значення з сертифіката. 100 % — навчальний приклад, який можна редагувати."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBox, { errors: errs })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								onClick: () => {
									if (compute()) toast.success("Розрахунок виконано");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-4 w-4" }), "Розрахувати"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								variant: "outline",
								onClick: () => {
									if (compute()) setCompare(true);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-4 w-4" }), "Порівняти формули"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								variant: "outline",
								disabled: !res,
								onClick: () => {
									if (!res) return;
									add({
										type: "Вапнування",
										title: `${MATERIALS[f.mat]} — ${res.formula === "academic" ? "академічна" : "експрес"} формула`,
										status: "Розраховано",
										data: {
											"Hг": String(res.hg),
											"d, г/см³": String(res.d),
											"h, см": fmt(res.h_cm),
											"S, га": fmt(res.S_ha, 4),
											"НЗ, %": String(res.nv),
											"CaCO₃, т/га": fmt(res.perHa),
											"CaCO₃ всього, т": fmt(res.total),
											"Матеріал, т/га": fmt(res.matPerHa),
											"Матеріал всього, т": fmt(res.matTotal)
										}
									});
									toast.success("Розрахунок збережено в журнал");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Зберегти розрахунок"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								variant: "ghost",
								onClick: () => {
									setF(defaults);
									setRes(null);
									setErrs([]);
									setCompare(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "h-4 w-4" }), "Очистити поля"]
							})
						]
					})
				]
			}),
			res && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "3.3. Хід розрахунку",
				kind: "calc",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 font-mono text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-sans font-semibold",
								children: "Перерахунок одиниць"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"h = ",
								fmt(res.h_cm, 2),
								" см = ",
								fmt(res.h_m, 4),
								" м"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"S = ",
								fmt(res.S_ha, 4),
								" га = ",
								fmt(res.S_m2, 2),
								" м²"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 font-sans font-semibold",
								children: "Підстановка"
							}),
							res.formula === "academic" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"CaCO₃ = (",
									res.hg,
									" × 0.5 × ",
									res.S_m2,
									" × ",
									res.d,
									" × ",
									res.h_m,
									") / 1000"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"CaCO₃ = ",
									fmt(res.hg * .5 * res.S_m2 * res.d * res.h_m, 4),
									" / 1000"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"CaCO₃ = ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [fmt(res.total, 3), " т"] }),
									" на ",
									fmt(res.S_ha, 4),
									" га"
								] })
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"CaCO₃ = 0.05 × ",
									res.hg,
									" × ",
									res.d,
									" × ",
									res.h_cm
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["CaCO₃ = ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [fmt(res.perHa, 3), " т/га"] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"Всього: ",
									fmt(res.perHa, 3),
									" × ",
									fmt(res.S_ha, 4),
									" га = ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [fmt(res.total, 3), " т"] })
								] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 font-sans font-semibold",
								children: "Корекція на матеріал"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"Норма = CaCO₃ / (",
								res.nv,
								" / 100) = ",
								fmt(res.perHa, 3),
								" / ",
								fmt(res.nv / 100, 2)
							] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [[
							["Теоретична потреба CaCO₃", `${fmt(res.perHa)} т/га`],
							["CaCO₃ на всю площу", `${fmt(res.total)} т`],
							[`${MATERIALS[f.mat]}, норма`, `${fmt(res.matPerHa)} т/га`],
							["Матеріал на всю площу", `${fmt(res.matTotal)} т`]
						].map(([l, v], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-lg p-3 ${i >= 2 ? "bg-primary text-primary-foreground" : "bg-accent/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs opacity-80",
								children: l
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xl font-bold",
								children: v
							})]
						}, l)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 text-xs text-muted-foreground",
								children: "Візуальне зведення (норма матеріалу, т/га; шкала 0–15)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-4 overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-hero transition-all",
									style: { width: `${Math.min(100, res.matPerHa / 15 * 100)}%` }
								})
							})]
						})]
					})]
				})
			}),
			res && compare && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Порівняння формул",
				kind: "calc",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "ctol",
						label: "Допуск порівняння",
						value: f.tol,
						onChange: set("tol")
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3 font-mono text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted p-3",
							children: [
								"Академічна: ",
								fmt(res.acadT, 6),
								" т / ",
								fmt(res.S_ha, 4),
								" га",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"= ",
								fmt(res.acadT / res.S_ha, 6),
								" т/га"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted p-3",
							children: [
								"Експрес: ",
								fmt(res.exprTHa, 6),
								" т/га",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"× ",
								fmt(res.S_ha, 4),
								" га = ",
								fmt(res.exprTHa * res.S_ha, 6),
								" т"
							]
						}),
						(() => {
							const diff = Math.abs(res.acadT / res.S_ha - res.exprTHa);
							const ok = diff <= tol;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-lg p-3 ${ok ? "bg-success/20" : "bg-destructive/15"}`,
								children: [
									"|Δ| = ",
									diff.toExponential(2),
									" т/га",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									ok ? "✓ Результати еквівалентні" : "✗ Перевищено допуск"
								]
							});
						})()
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "3.5. До та після вапнування",
				kind: "theory",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg p-4 text-background",
						style: { background: "linear-gradient(135deg,#EF4444,#F97316)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "До" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "Кислий ґрунт: високий вміст рухомого Al³⁺, низький ступінь насиченості основами."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg p-4 text-background",
						style: { background: "linear-gradient(135deg,#84CC16,#22C55E)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Після" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "Нейтралізація кислотності, зростання SNO, кращі умови для чутливих культур."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "Схема ілюстративна і не є кількісним прогнозом pH: числове значення pH після вапнування з гідролітичної кислотності не обчислюється. Калькулятор дає теоретичну потребу за введеними даними; фактична агрономічна рекомендація залежить від властивостей ґрунту й вапнякового матеріалу."
				})]
			})
		]
	});
}
var SPECIALTIES = [
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
var COLS = [
	{
		key: "svo",
		label: "СВО",
		unit: "мг-екв/100 г"
	},
	{
		key: "hg",
		label: "Hг",
		unit: "мг-екв/100 г"
	},
	{
		key: "capacityT",
		label: "ЄП",
		unit: "мг-екв/100 г"
	},
	{
		key: "sno",
		label: "СНО",
		unit: "%"
	},
	{
		key: "caco3",
		label: "CaCO₃",
		unit: "т/га"
	}
];
var TEACHER_PIN = "2026";
function generateExtendedSamples(count, groupCode) {
	return Array.from({ length: count }).map((_, i) => {
		const density = Number((1.1 + Math.random() * .3).toFixed(2));
		const phKCl = Number((4.2 + Math.random() * 2.3).toFixed(2));
		const phH2O = Number((phKCl + .5 + Math.random() * .4).toFixed(2));
		const hg = Number((1.2 + Math.random() * 4.5).toFixed(2));
		const hobm = phKCl < 5 ? Number((.2 + Math.random() * 1.5).toFixed(2)) : 0;
		const svo = Number((5 + Math.random() * 25).toFixed(2));
		const capacityT = Number((svo + hg).toFixed(2));
		const sno = Number((svo / capacityT * 100).toFixed(2));
		const caco3 = Number((.05 * hg * density * 20).toFixed(2));
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
function printReport(title, student, specName, html) {
	const w = window.open("", "_blank");
	if (!w) {
		toast.error("Дозвольте спливаючі вікна для друку звіту");
		return;
	}
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
    <div class="sub">Напрям підготовки: <b>${specName}</b> · Студент: <b>${student || "____________________"}</b> · Дата: ${(/* @__PURE__ */ new Date()).toLocaleDateString("uk-UA")}</div>
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
function PracticeTab({ onSendToLab }) {
	const { add, entries, remove, studentName, setStudentName } = useJournal();
	const [selectedSpec, setSelectedSpec] = (0, import_react.useState)(SPECIALTIES[0]);
	const [subGroup, setSubGroup] = (0, import_react.useState)("1");
	const fullGroupCode = `${selectedSpec.prefix}-${subGroup}`;
	const [rows, setRows] = (0, import_react.useState)(() => generateExtendedSamples(20, fullGroupCode));
	const [studentMode, setStudentMode] = (0, import_react.useState)(true);
	const [isTeacherUnlocked, setIsTeacherUnlocked] = (0, import_react.useState)(false);
	const [showPasswordModal, setShowPasswordModal] = (0, import_react.useState)(false);
	const [inputPin, setInputPin] = (0, import_react.useState)("");
	const [hidden, setHidden] = (0, import_react.useState)([
		"capacityT",
		"sno",
		"caco3"
	]);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [checks, setChecks] = (0, import_react.useState)(null);
	const [tol, setTol] = (0, import_react.useState)("0.1");
	const [showCorrect, setShowCorrect] = (0, import_react.useState)(false);
	const [openRow, setOpenRow] = (0, import_react.useState)(null);
	const isHidden = (c) => studentMode && hidden.includes(c);
	const newBatch = () => {
		setRows(generateExtendedSamples(20, fullGroupCode));
		setAnswers({});
		setChecks(null);
		toast.success(`Згенеровано 20 нових зразків для групи ${fullGroupCode}`);
	};
	const resetTask = () => {
		setAnswers({});
		setChecks(null);
	};
	const handleTeacherToggle = () => {
		if (isTeacherUnlocked) {
			setIsTeacherUnlocked(false);
			setStudentMode(true);
			setShowCorrect(false);
			toast.info("Режим викладача вимкнено. Активовано режим студента.");
		} else setShowPasswordModal(true);
	};
	const handleUnlockTeacher = (e) => {
		e.preventDefault();
		if (inputPin === TEACHER_PIN) {
			setIsTeacherUnlocked(true);
			setStudentMode(false);
			setShowCorrect(true);
			setShowPasswordModal(false);
			setInputPin("");
			toast.success("Режим викладача успішно розблоковано!");
		} else toast.error("Невірний пароль викладача!");
	};
	const check = () => {
		const t = Math.max(0, Number(tol.replace(",", ".")) || 0);
		const res = {};
		rows.forEach((r) => {
			const o = {};
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
			"ID зразка",
			"Група",
			"pH(H2O)",
			"pH(KCl)",
			"Нобм",
			...COLS.flatMap((c) => isHidden(c.key) ? [`${c.label} (відповідь)`, `${c.label} (еталон)`] : [`${c.label}, ${c.unit}`])
		];
		const data = rows.map((r) => [
			r.id,
			r.group,
			r.phH2O.toFixed(2),
			r.phKCl.toFixed(2),
			r.hobm.toFixed(2),
			...COLS.flatMap((c) => isHidden(c.key) ? [answers[r.id]?.[c.key] ?? "", r[c.key].toFixed(2)] : [r[c.key].toFixed(2)])
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
			return isHidden(c.key) ? `<td class="${ck?.status === "correct" ? "ok" : ck ? "bad" : ""}">${answers[r.id]?.[c.key] || "—"} / ${fmt(r[c.key])}</td>` : `<td>${fmt(r[c.key])}</td>`;
		}).join("")}
      <td class="f">СНО = 100×${r.svo}/(${r.svo}+${r.hg}) = ${fmt(r.sno)}%</td>
    </tr>`).join("");
		printReport(`Офіційний лабораторний звіт: ${selectedSpec.name}`, studentName, selectedSpec.name, `<p><b>Фокус дослідження:</b> ${selectedSpec.focus}</p>
       <p class="f">Формули розрахунку: ЄП = СВО + Hг | СНО (V%) = (100 × СВО) / ЄП | CaCO₃ = 0.05 × Hг × d × h</p>
       <table>
         <tr>
           <th>ID</th><th>Група</th><th>pH(H₂O)</th><th>pH(KCl)</th><th>Нобм</th>
           ${COLS.map((c) => `<th>${c.label}${isHidden(c.key) ? " (студент / еталон)" : ""}</th>`).join("")}
           <th>Розрахунок СНО (V%)</th>
         </tr>
         ${tr}
       </table>
       ${checks ? `<p><b>Результат перевірки:</b> ${score} з ${total} правильних відповідей (допуск ±${tol}).</p>` : ""}`);
	};
	const saveExercise = () => {
		const payload = {
			rows,
			hidden: [...hidden],
			answers,
			group: fullGroupCode
		};
		add({
			type: "Завдання",
			title: `Набір ${fullGroupCode} (20 зразків)`,
			status: checks ? `${score}/${total} правильно` : studentMode ? "Не перевірено" : "Режим викладача",
			data: {
				Спеціальність: selectedSpec.name,
				Група: fullGroupCode,
				"Приховані стовпці": studentMode ? hidden.map((h) => COLS.find((c) => c.key === h).label).join(", ") : "—"
			},
			payload
		});
		toast.success("Вправу успішно збережено в журнал!");
	};
	const openExercise = (e) => {
		const p = e.payload;
		setRows(p.rows);
		setHidden(p.hidden);
		setAnswers(p.answers);
		setStudentMode(true);
		setChecks(null);
		toast.success("Вправу завантажено з журналу");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const sel = rows.find((r) => r.id === openRow);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			showPasswordModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-2xl border bg-card p-6 shadow-xl space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-purple-600" }), "Вхід у режим викладача"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowPasswordModal(false),
							className: "text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleUnlockTeacher,
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Введіть пароль викладача (PIN)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								autoFocus: true,
								value: inputPin,
								onChange: (e) => setInputPin(e.target.value),
								placeholder: "Пароль...",
								className: "w-full rounded-xl border bg-background px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-purple-500/20"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								type: "button",
								variant: "outline",
								onClick: () => setShowPasswordModal(false),
								className: "text-xs",
								children: "Скасувати"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								type: "submit",
								variant: "primary",
								className: "text-xs bg-purple-600 hover:bg-purple-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-3.5 w-3.5 mr-1" }), " Розблокувати"]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "4. Генератор завдань та агрохімічний журнал",
				kind: "synthetic",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block font-medium",
										children: "Спеціальність та Базовий код"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: selectedSpec.id,
										onChange: (e) => {
											const spec = SPECIALTIES.find((s) => s.id === e.target.value);
											setSelectedSpec(spec);
											setRows(generateExtendedSamples(20, `${spec.prefix}-${subGroup}`));
										},
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium",
										children: SPECIALTIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s.id,
											children: s.name
										}, s.id))
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block font-medium",
										children: "Підгрупа / №"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "bg-muted px-2 py-2 rounded-l-md border border-r-0 text-xs font-mono text-muted-foreground",
											children: [selectedSpec.prefix, "-"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: subGroup,
											onChange: (e) => {
												setSubGroup(e.target.value);
												setRows(generateExtendedSamples(20, `${selectedSpec.prefix}-${e.target.value}`));
											},
											className: "w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm font-mono",
											placeholder: "1"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block font-medium",
										children: "Ім'я студента (необов'язково)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: studentName,
										onChange: (e) => setStudentName(e.target.value),
										placeholder: "Шевченко Т. Г.",
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block font-medium",
										children: "Допуск (±)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										min: "0",
										value: tol,
										onChange: (e) => setTol(e.target.value),
										className: "w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm"
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 rounded-xl border bg-purple-500/10 border-purple-500/20 p-3 text-xs space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }),
								" Напрям дослідження: ",
								selectedSpec.focus
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground leading-relaxed",
							children: selectedSpec.taskDescription
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/40 p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${studentMode ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30" : "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30"}`,
								children: [studentMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-4 w-4" }), studentMode ? "Режим студента (Активний)" : "Режим викладача (Розблоковано)"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [isTeacherUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3 text-xs mr-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-muted-foreground",
									children: "Приховати стовпці:"
								}), COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-1 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										className: "accent-primary",
										checked: hidden.includes(c.key),
										onChange: (e) => {
											setHidden(e.target.checked ? [...hidden, c.key] : hidden.filter((h) => h !== c.key));
											setChecks(null);
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.label })]
								}, c.key))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleTeacherToggle,
								className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${isTeacherUnlocked ? "bg-card hover:bg-muted text-foreground" : "bg-purple-600 text-white hover:bg-purple-700 shadow-sm"}`,
								children: [isTeacherUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-3.5 w-3.5" }), isTeacherUnlocked ? "Вийти з режиму викладача" : "Увійти як викладач"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								onClick: newBatch,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "h-4 w-4" }), "Новий набір"]
							}),
							studentMode && hidden.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								onClick: check,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4" }), "Перевірити відповіді"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								variant: "outline",
								onClick: resetTask,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), "Скинути завдання"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								variant: "outline",
								onClick: saveExercise,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Зберегти вправу"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								variant: "outline",
								onClick: exportCSV,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Експорт CSV"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								variant: "outline",
								onClick: report,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), "Лабораторний звіт"]
							})
						]
					}),
					checks && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 rounded-md bg-emerald-500/15 border border-emerald-500/30 p-2.5 text-sm text-emerald-800 dark:text-emerald-300 font-medium",
						children: [
							"Результат розрахунків: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: score }),
							" з ",
							total,
							" правильних відповідей. (Допуск похибки: ±",
							tol,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-lg border shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[760px] text-xs text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-muted text-muted-foreground font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Група"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "pH(H₂O)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "pH(KCl)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
										className: "p-2.5",
										children: ["Нобм ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-normal opacity-70",
											children: "мг-екв"
										})]
									}),
									COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
										className: "p-2.5",
										children: [
											c.label,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-normal opacity-70",
												children: c.unit
											})
										]
									}, c.key)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5 text-center",
										children: "Дії"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y font-mono",
								children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/40 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-bold text-foreground",
											children: r.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-muted-foreground text-[11px]",
											children: r.group
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-semibold text-emerald-600",
											children: r.phH2O.toFixed(2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-semibold text-amber-600",
											children: r.phKCl.toFixed(2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5",
											children: r.hobm.toFixed(2)
										}),
										COLS.map((c) => {
											if (!isHidden(c.key)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: `p-2.5 ${c.key === "sno" ? "font-bold text-indigo-600" : c.key === "svo" ? "font-bold text-emerald-700" : ""}`,
												children: [fmt(r[c.key]), c.key === "sno" ? "%" : ""]
											}, c.key);
											const ck = checks?.[r.id]?.[c.key];
											const cls = ck?.status === "correct" ? "border-emerald-500 bg-emerald-500/15" : ck?.status === "rounding" ? "border-amber-500 bg-amber-500/20" : ck ? "border-rose-500 bg-rose-500/15" : "border-input";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													"aria-label": `${c.label} для ${r.id}`,
													inputMode: "decimal",
													value: answers[r.id]?.[c.key] ?? "",
													onChange: (e) => setAnswers({
														...answers,
														[r.id]: {
															...answers[r.id],
															[c.key]: e.target.value
														}
													}),
													className: `w-20 rounded border px-2 py-1 font-mono text-xs ${cls}`
												}), ck && ck.status !== "correct" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-0.5 text-[10px] leading-tight text-muted-foreground",
													title: ck.message,
													children: [ck.message, showCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" Еталон: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fmt(r[c.key]) })] })]
												})]
											}, c.key);
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-center font-sans",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
													variant: "ghost",
													className: "px-2 py-1 text-[11px]",
													onClick: () => setOpenRow(r.id),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3 w-3 mr-1" }), "Формули"]
												}), onSendToLab && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
													variant: "outline",
													className: "px-2 py-1 text-[11px] text-purple-600 border-purple-500/30 hover:bg-purple-500/10",
													onClick: () => {
														onSendToLab(r);
														toast.success(`Зразок ${r.id} передано у Віртуальну Лабораторію!`);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-3 w-3 mr-1" }), "Лаб"]
												})]
											})
										})
									]
								}, r.id))
							})]
						})
					}),
					sel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl border bg-card p-4 space-y-2 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
								className: "text-sm font-bold text-foreground",
								children: [
									"Розклад агрохімічного розрахунку для зразка ",
									sel.id,
									" (",
									sel.group,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								className: "px-2",
								"aria-label": "Закрити",
								onClick: () => setOpenRow(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}), studentMode && !isTeacherUnlocked && checks === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Покрокові рішення приховані у режимі студента. Вони стануть доступними після перевірки відповідей або у режимі викладача."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-xs space-y-1.5 bg-muted/50 p-3 rounded-lg border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"1. Ємність поглинання (ЄП): ЄП = СВО + Hг = ",
									sel.svo,
									" + ",
									sel.hg,
									" = ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [sel.capacityT.toFixed(2), " мг-екв/100 г"] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"2. Ступінь насиченості основами (СНО, V%): V = (100 × СВО) / ЄП = (100 × ",
									sel.svo,
									") / ",
									sel.capacityT,
									" = ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [sel.sno.toFixed(2), " %"] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"3. Експрес-норма вапнування (CaCO₃): 0.05 × Hг × d (щільностi ",
									sel.density,
									") × 20 см = 0.05 × ",
									sel.hg,
									" × ",
									sel.density,
									" × 20 = ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [sel.caco3.toFixed(2), " т/га"] })
								] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "СВО, Hг та pH згенеровано синтетично з розпреділенням за ДСТУ; СНО (V%), ЄП та норма вапнування обчислюються автоматично з високою точністю."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Лабораторний журнал збережених сесій",
				kind: "user",
				children: [entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Журнал порожній. Збережіть вимірювання з симулятора, калькулятора або вправу з генератора."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-xs text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted-foreground border-b bg-muted/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Тип"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Назва"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Дані"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Статус"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Студент"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Дата"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5 text-center",
									children: "Дії"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y",
							children: entries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { kind: e.type === "Завдання" ? "synthetic" : e.type === "Вапнування" ? "calc" : "sim" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 font-semibold text-[11px]",
											children: e.type
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-medium",
										children: e.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono text-[11px]",
										children: Object.entries(e.data).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											k,
											": ",
											v
										] }, k))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-bold text-emerald-600",
										children: e.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5",
										children: e.studentName || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 text-muted-foreground",
										children: e.date
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-center gap-1",
											children: [e.payload ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
												variant: "ghost",
												className: "px-2 py-1",
												title: "Відкрити вправу",
												onClick: () => openExercise(e),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-3.5 w-3.5" })
											}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
												variant: "ghost",
												className: "px-2 py-1 text-rose-600 hover:bg-rose-500/10",
												title: "Видалити",
												onClick: () => remove(e.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})]
										})
									})
								]
							}, e.id))
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] text-muted-foreground",
					children: "Записи зберігаються в межах вашої браузерної сесії."
				})]
			})
		]
	});
}
var TABS = [
	{
		id: "theory",
		label: "Теорія та концепції",
		icon: BookOpen
	},
	{
		id: "lab",
		label: "Віртуальна лабораторія",
		icon: FlaskConical
	},
	{
		id: "calc",
		label: "Калькулятор вапнування",
		icon: Calculator
	},
	{
		id: "practice",
		label: "Завдання та журнал",
		icon: ClipboardList
	}
];
var MONO_BANK_URL = "https://send.monobank.ua/jar/784u1m7ro9";
var FEEDBACK_FORM_URL = "https://forms.gle/zWVf6W5G2VLvSj8x5";
function Index() {
	const [tab, setTab] = (0, import_react.useState)("theory");
	const [showInfoModal, setShowInfoModal] = (0, import_react.useState)(false);
	const [showSupportModal, setShowSupportModal] = (0, import_react.useState)(false);
	const [infoModalTab, setInfoModalTab] = (0, import_react.useState)("usage");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "bg-hero text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestTubeDiagonal, { className: "h-6 w-6 text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider font-medium opacity-90",
									children: "Цифрове ґрунтознавство: глибше розуміння, ефективніші рішення"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-2 font-serif text-3xl font-semibold md:text-4xl",
								children: ["SoilSim: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-95",
									children: "Інтерактивний симулятор кислотності ґрунтів"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-2xl text-sm opacity-90",
								children: "Теорія, віртуальна лабораторія, калькулятор вапнування та генератор практичних завдань."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowInfoModal(true),
								className: "flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 text-sm font-medium transition-colors border border-primary-foreground/15",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Про симулятор" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowSupportModal(true),
								className: "flex items-center gap-2 px-3.5 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 text-sm font-medium transition-colors border border-rose-400/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 text-rose-400 fill-rose-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Подякувати автору" })]
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4",
					role: "tablist",
					"aria-label": "Розділи",
					children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						role: "tab",
						"aria-selected": tab === t.id,
						onClick: () => setTab(t.id),
						className: `flex shrink-0 items-center gap-2 rounded-t-lg px-4 py-3 text-sm font-medium transition-colors ${tab === t.id ? "bg-background text-foreground" : "hover:bg-primary-foreground/10"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-4 w-4" }), t.label]
					}, t.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-8 fade-in",
				children: [
					tab === "theory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TheoryTab, {}),
					tab === "lab" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabTab, {}),
					tab === "calc" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatorTab, {}),
					tab === "practice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeTab, {})
				]
			}, tab),
			showInfoModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-4 border-b bg-muted/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold text-lg",
									children: "Про симулятор SoilSim v2.0"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowInfoModal(false),
								className: "p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex border-b bg-muted/20 px-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setInfoModalTab("usage"),
									className: `flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${infoModalTab === "usage" ? "border-emerald-600 text-emerald-600 font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" }), " Як користуватись"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setInfoModalTab("about"),
									className: `flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${infoModalTab === "about" ? "border-emerald-600 text-emerald-600 font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Про проєкт"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setInfoModalTab("history"),
									className: `flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${infoModalTab === "history" ? "border-emerald-600 text-emerald-600 font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4" }), " Історія версій"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 overflow-y-auto space-y-4 text-sm leading-relaxed",
							children: [
								infoModalTab === "usage" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-base text-foreground",
										children: "Інтерактивний посібник користувача:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-lg border bg-muted/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-emerald-700 dark:text-emerald-400 block mb-1",
													children: "1. Теорія та концепції:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Досліджуйте 3 незалежні системи градації pH, екологічні групи культур та динамічний модуль доступності 12 елементів живлення з контролем токсичності Al³⁺."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-lg border bg-muted/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-blue-700 dark:text-blue-400 block mb-1",
													children: "2. Віртуальна лабораторія:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Виконуйте покрокову симуляцію дослідів за ДСТУ: зважування, додавання реактивів, струшування на шейкері, фільтрування та титрування з бюретки з веденням протоколу."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-lg border bg-muted/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-amber-700 dark:text-amber-400 block mb-1",
													children: "3. Калькулятор вапнування:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Розраховуйте норми CaCO₃, CaO та доломітового борошна за Академічною та Експрес формулами з корекцією на нейтралізуючу здатність матеріалу та орний шар."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 rounded-lg border bg-muted/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-purple-700 dark:text-purple-400 block mb-1",
													children: "4. Завдання та журнал:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Розв'язуйте розрахункові завдання відповідно до вашої спеціальності (206, 205, 203, 200). Режим контролю викладача захищений секретним PIN-кодом."
												})]
											})
										]
									})]
								}),
								infoModalTab === "about" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												className: "font-semibold text-base text-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-5 w-5 text-emerald-600" }), " Візія та масштабування SoilSim"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-muted-foreground text-xs leading-relaxed mt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SoilSim" }), " — це перша ластівка в рамках розробки глобальної освітньої цифрової екосистеми з ґрунтознавства, агрохімії та землеробства."]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground text-xs leading-relaxed mt-1.5",
												children: "Симулятор розробляється як фундаментальна навчально-практична платформа для студентів, викладачів та науковців, покликана замінити застарілі статичні підручники інтерактивними експериментами у реальному часі."
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 rounded-lg border bg-purple-500/10 border-purple-500/20 text-xs space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Незабаром у наступних релізах екосистеми:"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
												className: "list-disc pl-4 space-y-1 text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Органічна речовина ґрунту:" }), " Модуль віртуального визначення вмісту гумусу та фракціонування органіки."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Гідрофіка та фізика ґрунтів:" }), " Повноцінна імітація руху води, вологоємності та її поведінки залежно від гранулометричного складу і чинників довкілля."] })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 rounded-lg border bg-muted/40 text-xs font-mono space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Розробка та адаптація:" }), " Володимир Нікорич"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Платформа:" }), " Чернівецький національний університет ім. Ю. Федьковича, 2026"] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 rounded-lg border border-blue-500/30 bg-blue-500/10 flex items-center justify-between gap-3 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-blue-600 dark:text-blue-400" }), " Нам важливий ваш фідбек!"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground text-[11px] block",
													children: "Поділіться вашою думкою або ідеями для нових модулів. Збір анонімний."
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: FEEDBACK_FORM_URL,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition-colors shrink-0 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }), " Заповнити форму"]
											})]
										})
									]
								}),
								infoModalTab === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-l-2 border-purple-500 pl-3 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Версія 2.0.0 (Масштабне методичне оновлення)"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300",
												children: "Поточний реліз"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "text-xs text-muted-foreground list-disc pl-4 space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Нова теорія та концепції:" }), " Повноцінний перегляд подачі матеріалу — 3 автономні системи градацій pH, екологічні групи рослин, їхнє відношення до кислотності та динамічний модуль поведінки і доступності 12 елементів живлення."] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Нова віртуальна лабораторія:" }), " Концептуально та візуально оновлений стенд. Студент повністю імітує реальний хід роботи за ДСТУ (зважування, шейкер, лійка, титрування бюреткою з краплями)."] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Оновлені завдання та журнал:" }), " Адаптація під 4 спеціальності (206 Агрономія, 205 Землевпорядкування, 203 Екологія, 200 Біологія) з розрахунком СВО, СНО (V%) та ЄП."] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Захищений контроль викладача:" }), " Режим перевірки та перегляду розкладок рішень захищено викладацьким PIN-кодом."] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Уніфікований макет:" }), " Додано наскрізний стандартизований дворядковий футер авторів на всіх сторінках."] })
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-l-2 border-muted pl-3 space-y-1 opacity-70",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: "Версія 1.0.0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Базовий прототип"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Початковий реліз 4 базових розділів із простими розрахунковими формулами вапнування."
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 border-t bg-muted/20 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowInfoModal(false),
								className: "px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors",
								children: "Зрозуміло"
							})
						})
					]
				})
			}),
			showSupportModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-xl shadow-2xl max-w-md w-full p-6 space-y-5 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 bg-rose-100 dark:bg-rose-950/50 rounded-full flex items-center justify-center mx-auto text-rose-500 border border-rose-200 dark:border-rose-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-6 w-6 fill-rose-500" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-xl text-foreground",
								children: "Підтримати розвиток SoilSim"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "Якщо симулятор допоміг у вашому навчанні чи викладанні, ви можете підтримати розробку нових модулів та підтримку сервера!"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border flex flex-col items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(MONO_BANK_URL)}`,
								alt: "QR-код Monobank",
								className: "w-44 h-44 rounded-lg shadow-sm border bg-white p-1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-mono text-muted-foreground mt-2.5",
								children: "Скануйте камерою смартфона або застосунком Monobank"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: MONO_BANK_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-md transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), " Відкрити Банку в Monobank"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowSupportModal(false),
								className: "w-full py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
								children: "Закрити"
							})]
						})
					]
				})
			})
		]
	}) });
}
//#endregion
export { Index as component };
