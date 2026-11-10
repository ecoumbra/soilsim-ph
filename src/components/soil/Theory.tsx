import { useState } from "react";
import { ChevronDown, Leaf, Sigma, FlaskConical, Activity, Layers, Droplet, Info, ShieldAlert, CheckCircle2, AlertTriangle, Filter } from "lucide-react";
import { hydrolyticAcidityExtract, baseSaturation, limingAcademic, limingExpress, parseNum, fmt } from "@/lib/soil";
import { Panel, Field, ErrorBox } from "./shared";

// ----------------------------------------------------------------------
// 1. СИСТЕМИ КЛАСИФІКАЦІЇ КИСЛОТНОСТІ (ДСТУ 4362:2004, ДСТУ H2O, USDA 2017)
// ----------------------------------------------------------------------

interface ClassificationStep {
  name: string;
  enName?: string;
  min: number;
  max: number;
  labelRange: string;
  color: string;
}

// А. ДСТУ 4362:2004 (pH KCl - 11 градацій)
const DSTU_KCL_STEPS: ClassificationStep[] = [
  { name: "Дуже сильнокислі", min: 1.0, max: 4.09, labelRange: "< 4.1", color: "#991B1B" },
  { name: "Сильнокислі", min: 4.1, max: 4.5, labelRange: "4.1–4.5", color: "#DC2626" },
  { name: "Середньокислі", min: 4.6, max: 5.0, labelRange: "4.6–5.0", color: "#EF4444" },
  { name: "Слабокислі", min: 5.1, max: 5.5, labelRange: "5.1–5.5", color: "#F97316" },
  { name: "Близькі до нейтральних", min: 5.6, max: 6.0, labelRange: "5.6–6.0", color: "#EAB308" },
  { name: "Нейтральні", min: 6.1, max: 7.0, labelRange: "6.1–7.0", color: "#22C55E" },
  { name: "Близькі до нейтральних (лужні)", min: 7.1, max: 7.5, labelRange: "7.1–7.5", color: "#14B8A6" },
  { name: "Слаболужні", min: 7.6, max: 8.0, labelRange: "7.6–8.0", color: "#06B6D4" },
  { name: "Середньолужні", min: 8.1, max: 8.5, labelRange: "8.1–8.5", color: "#3B82F6" },
  { name: "Сильнолужні", min: 8.6, max: 9.0, labelRange: "8.6–9.0", color: "#1D4ED8" },
  { name: "Дуже сильнолужні", min: 9.01, max: 14.0, labelRange: "> 9.0", color: "#1E1B4B" },
];

// Б. Українська агрономічна градація (pH H2O - 10 градацій)
const UA_WATER_STEPS: ClassificationStep[] = [
  { name: "Дуже сильнокислі", min: 1.0, max: 4.49, labelRange: "< 4.5", color: "#991B1B" },
  { name: "Сильнокислі", min: 4.5, max: 5.0, labelRange: "4.6–5.0", color: "#DC2626" },
  { name: "Середньокислі", min: 5.1, max: 5.5, labelRange: "5.1–5.5", color: "#EF4444" },
  { name: "Слабокислі", min: 5.6, max: 6.0, labelRange: "5.6–6.0", color: "#F97316" },
  { name: "Близькі до нейтральних", min: 6.1, max: 7.0, labelRange: "6.1–7.0", color: "#EAB308" },
  { name: "Нейтральні", min: 7.1, max: 7.5, labelRange: "7.1–7.5", color: "#22C55E" },
  { name: "Слаболужні", min: 7.6, max: 8.0, labelRange: "7.6–8.0", color: "#06B6D4" },
  { name: "Середньолужні", min: 8.1, max: 8.5, labelRange: "8.1–8.5", color: "#3B82F6" },
  { name: "Сильнолужні", min: 8.6, max: 9.0, labelRange: "8.6–9.0", color: "#1D4ED8" },
  { name: "Дуже сильнолужні", min: 9.01, max: 14.0, labelRange: "> 9.0", color: "#1E1B4B" },
];

// В. USDA NRCS (Soil Survey Manual 2017 - 11 градацій)
const USDA_STEPS: ClassificationStep[] = [
  { name: "Ультракислі", enName: "Ultra acid", min: 1.0, max: 3.49, labelRange: "< 3.5", color: "#7F1D1D" },
  { name: "Надзвичайно кислі", enName: "Extremely acid", min: 3.5, max: 4.4, labelRange: "3.5–4.4", color: "#991B1B" },
  { name: "Дуже сильнокислі", enName: "Very strongly acid", min: 4.5, max: 5.0, labelRange: "4.5–5.0", color: "#DC2626" },
  { name: "Сильнокислі", enName: "Strongly acid", min: 5.1, max: 5.5, labelRange: "5.1–5.5", color: "#EF4444" },
  { name: "Середньокислі", enName: "Moderately acid", min: 5.6, max: 6.0, labelRange: "5.6–6.0", color: "#F97316" },
  { name: "Слабокислі", enName: "Slightly acid", min: 6.1, max: 6.5, labelRange: "6.1–6.5", color: "#EAB308" },
  { name: "Нейтральні", enName: "Neutral", min: 6.6, max: 7.3, labelRange: "6.6–7.3", color: "#22C55E" },
  { name: "Слаболужні", enName: "Slightly alkaline", min: 7.4, max: 7.8, labelRange: "7.4–7.8", color: "#06B6D4" },
  { name: "Середньолужні", enName: "Moderately alkaline", min: 7.9, max: 8.4, labelRange: "7.9–8.4", color: "#3B82F6" },
  { name: "Сильнолужні", enName: "Strongly alkaline", min: 8.5, max: 9.0, labelRange: "8.5–9.0", color: "#1D4ED8" },
  { name: "Дуже сильнолужні", enName: "Very strongly alkaline", min: 9.01, max: 14.0, labelRange: "> 9.0", color: "#1E1B4B" },
];

function getStepForPh(ph: number, steps: ClassificationStep[]): ClassificationStep {
  const found = steps.find((s) => ph >= s.min && ph <= s.max);
  return found ?? steps[steps.length - 1]!;
}

// ----------------------------------------------------------------------
// 2. БАЗА ДАНИХ ЕКОЛОГІЧНИХ ГРУП ТА СІЛЬСЬКОГОСПОДАРСЬКИХ КУЛЬТУР
// ----------------------------------------------------------------------

interface CropInfo {
  name: string;
  lat: string;
  optMin: number;
  optMax: number;
  tolMin: number;
  tolMax: number;
  group: "acidophile" | "acidotolerant" | "neutrophile" | "alkalotolerant" | "alkalophile";
  mechanism: string;
}

const ECOLOGICAL_CROPS: CropInfo[] = [
  { name: "Лохина високоросла", lat: "Vaccinium corymbosum", optMin: 4.2, optMax: 5.2, tolMin: 3.8, tolMax: 5.5, group: "acidophile", mechanism: "Ерикоїдна мікориза, фізіологічна потреба в кислому субстраті. Високий ризик залізного хлорозу при pH > 5.8." },
  { name: "Журавлина великоплідна", lat: "Vaccinium macrocarpon", optMin: 4.0, optMax: 5.0, tolMin: 3.5, tolMax: 5.3, group: "acidophile", mechanism: "Адаптація до органогенних кислих ґрунтів та специфічного водного режиму." },
  { name: "Чайний кущ", lat: "Camellia sinensis", optMin: 4.5, optMax: 5.5, tolMin: 4.0, tolMax: 6.0, group: "acidophile", mechanism: "На лужних субстратах різко блокується засвоєння Fe, Mn та Cu." },
  { name: "Ананас", lat: "Ananas comosus", optMin: 4.5, optMax: 5.5, tolMin: 4.0, tolMax: 6.2, group: "acidophile", mechanism: "Висока продуктивність на кислих субстратах за належного мінерального живлення." },

  { name: "Картопля", lat: "Solanum tuberosum", optMin: 5.0, optMax: 5.8, tolMin: 4.5, tolMax: 6.8, group: "acidotolerant", mechanism: "Кисла реакція стримує звичайну паршу (Streptomyces scabies), але дуже низький pH викликає дефіцит Ca/Mg та токсичність Al/Mn." },
  { name: "Жито озиме", lat: "Secale cereale", optMin: 5.0, optMax: 6.0, tolMin: 4.5, tolMax: 7.2, group: "acidotolerant", mechanism: "Найвища стійкість серед зернових до алюмінієвого стресу та екструзії органічних кислот корінням." },
  { name: "Овес посівний", lat: "Avena sativa", optMin: 5.0, optMax: 6.0, tolMin: 4.6, tolMax: 7.2, group: "acidotolerant", mechanism: "Переносить кислотність значно краще за ячмінь та зернобобові." },
  { name: "Гречка", lat: "Fagopyrum esculentum", optMin: 5.0, optMax: 6.5, tolMin: 4.7, tolMax: 7.5, group: "acidotolerant", mechanism: "Завдяки ексудації органічних кислот розчиняє труднодоступні фосфати алюмінію." },
  { name: "Люпин білий/жовтий", lat: "Lupinus spp.", optMin: 4.8, optMax: 6.2, tolMin: 4.3, tolMax: 6.8, group: "acidotolerant", mechanism: "Формує кластерні корені (протеоїдні), але толерантність ризобій залежить від штаму." },

  { name: "Пшениця озима", lat: "Triticum aestivum", optMin: 6.0, optMax: 7.0, tolMin: 5.5, tolMax: 7.5, group: "neutrophile", mechanism: "Чутлива до активного алюмінію Al³⁺ при pH < 5.0; знижується кущення та подовження коренів." },
  { name: "Кукурудза", lat: "Zea mays", optMin: 5.8, optMax: 7.0, tolMin: 5.2, tolMax: 7.8, group: "neutrophile", mechanism: "Чутлива до дефіциту цинку при високому pH та до алюмінієвого стресу при pH < 5.0." },
  { name: "Соя", lat: "Glycine max", optMin: 6.0, optMax: 7.0, tolMin: 5.5, tolMax: 7.5, group: "neutrophile", mechanism: "При pH < 5.5 пригнічується симбіоз із Bradyrhizobium japonicum та доступність молібдену (Mo)." },
  { name: "Люцерна посівна", lat: "Medicago sativa", optMin: 6.2, optMax: 7.5, tolMin: 5.8, tolMax: 8.0, group: "neutrophile", mechanism: "Дуже чутлива до кислотності: при pH < 6.0 блокується бульбочкоутворення і коренева система." },
  { name: "Цукровий буряк", lat: "Beta vulgaris", optMin: 6.5, optMax: 7.5, tolMin: 5.8, tolMax: 8.2, group: "neutrophile", mechanism: "Потребує високої насиченості основами (Ca, Mg) та доброго забезпечення бором." },

  { name: "Ячмінь ярий", lat: "Hordeum vulgare", optMin: 6.2, optMax: 7.5, tolMin: 5.5, tolMax: 8.2, group: "alkalotolerant", mechanism: "Висока стійкість до слабкої лужності, але чутливий до кислих ґрунтів." },
  { name: "Еспарцет", lat: "Onobrychis viciifolia", optMin: 6.5, optMax: 8.0, tolMin: 5.8, tolMax: 8.5, group: "alkalotolerant", mechanism: "Чудово пристосований до карбонатних ґрунтів з високим вмістом Ca." },
  { name: "Сорго", lat: "Sorghum bicolor", optMin: 6.0, optMax: 7.8, tolMin: 5.0, tolMax: 8.5, group: "alkalotolerant", mechanism: "Широка екологічна амплітуда, витримує помірну лужність." },

  { name: "Кіноа", lat: "Chenopodium quinoa", optMin: 6.0, optMax: 8.5, tolMin: 5.0, tolMax: 9.0, group: "alkalophile", mechanism: "Генотипи демонструють стійкість до лужних та засолених субстратів." },
  { name: "Лобода кущова", lat: "Atriplex spp.", optMin: 7.0, optMax: 9.0, tolMin: 6.0, tolMax: 9.5, group: "alkalophile", mechanism: "Галофітна та алкалофільна рослина, адаптована до содових та карбонатних ґрунтів." },
  { name: "Кохія вінична", lat: "Bassia scoparia", optMin: 6.8, optMax: 8.8, tolMin: 5.5, tolMax: 9.2, group: "alkalophile", mechanism: "Висока пристосованість до лужних, посушливих і засолених ґрунтів." }
];

// Автоматичне визначення відповідної екологічної групи за значенням pH
function getGroupForPh(phVal: number): string {
  if (phVal < 4.5) return "acidophile";
  if (phVal < 5.8) return "acidotolerant";
  if (phVal <= 7.2) return "neutrophile";
  if (phVal <= 8.2) return "alkalotolerant";
  return "alkalophile";
}

// ----------------------------------------------------------------------
// 3. МАТЕМАТИЧНА МОДЕЛЬ ДОСТУПНОСТІ ЕЛЕМЕНТІВ (12 ЕЛЕМЕНТІВ + Al)
// ----------------------------------------------------------------------

interface ElementCurve {
  id: string;
  name: string;
  symbol: string;
  category: "macro" | "secondary" | "micro" | "toxic";
  color: string;
  calcValue: (ph: number) => number;
}

const NUTRIENT_CURVES: ElementCurve[] = [
  {
    id: "Al", name: "Алюміній (Токсичність)", symbol: "Al³⁺", category: "toxic", color: "#DC2626",
    calcValue: (ph) => ph <= 4.0 ? 100 : ph <= 5.0 ? 100 - (ph - 4.0) * 80 : ph <= 5.5 ? 20 - (ph - 5.0) * 40 : 0
  },
  {
    id: "P", name: "Фосфор", symbol: "P", category: "macro", color: "#F59E0B",
    calcValue: (ph) => ph < 4.5 ? 15 : ph <= 6.0 ? 15 + (ph - 4.5) * 56.6 : ph <= 7.0 ? 100 : ph <= 8.5 ? 100 - (ph - 7.0) * 46.6 : 30
  },
  {
    id: "Mo", name: "Молібден", symbol: "Mo", category: "micro", color: "#8B5CF6",
    calcValue: (ph) => ph <= 4.5 ? 10 : ph <= 7.5 ? 10 + (ph - 4.5) * 26.6 : 90
  },
  {
    id: "Fe", name: "Залізо", symbol: "Fe", category: "micro", color: "#EF4444",
    calcValue: (ph) => ph <= 5.5 ? 95 : ph <= 6.5 ? 95 - (ph - 5.5) * 35 : ph <= 8.0 ? 60 - (ph - 6.5) * 33.3 : 10
  },
  {
    id: "Mn", name: "Марганець", symbol: "Mn", category: "micro", color: "#D97706",
    calcValue: (ph) => ph <= 5.0 ? 95 : ph <= 6.5 ? 95 - (ph - 5.0) * 30 : ph <= 8.0 ? 50 - (ph - 6.5) * 26.6 : 10
  },
  {
    id: "Zn", name: "Цинк", symbol: "Zn", category: "micro", color: "#06B6D4",
    calcValue: (ph) => ph <= 5.5 ? 90 : ph <= 7.0 ? 90 - (ph - 5.5) * 33.3 : 40
  },
  {
    id: "Cu", name: "Мідь", symbol: "Cu", category: "micro", color: "#059669",
    calcValue: (ph) => ph <= 5.5 ? 85 : ph <= 7.5 ? 85 - (ph - 5.5) * 25 : 35
  },
  {
    id: "B", name: "Бор", symbol: "B", category: "micro", color: "#EC4899",
    calcValue: (ph) => ph <= 5.0 ? 50 : ph <= 6.5 ? 85 : ph <= 8.0 ? 85 - (ph - 6.5) * 40 : 25
  },
  {
    id: "Ca", name: "Кальцій", symbol: "Ca", category: "secondary", color: "#10B981",
    calcValue: (ph) => ph <= 4.5 ? 20 : ph <= 6.5 ? 20 + (ph - 4.5) * 37.5 : 95
  },
  {
    id: "Mg", name: "Магній", symbol: "Mg", category: "secondary", color: "#14B8A6",
    calcValue: (ph) => ph <= 4.5 ? 25 : ph <= 6.5 ? 25 + (ph - 4.5) * 32.5 : 90
  },
  {
    id: "N", name: "Азот", symbol: "N", category: "macro", color: "#3B82F6",
    calcValue: (ph) => ph <= 5.0 ? 30 : ph <= 6.0 ? 30 + (ph - 5.0) * 50 : ph <= 7.5 ? 80 : 60
  },
  {
    id: "K", name: "Калій", symbol: "K", category: "macro", color: "#6366F1",
    calcValue: (ph) => ph <= 5.0 ? 45 : ph <= 6.0 ? 45 + (ph - 5.0) * 40 : 85
  }
];

// ----------------------------------------------------------------------
// ІНТЕРАКТИВНИЙ ГРАФІК ДОСТУПНОСТІ ЕЛЕМЕНТІВ ЖИВЛЕННЯ
// ----------------------------------------------------------------------

function InteractiveNutrientGraph({ currentPh, onPhChange }: { currentPh: number; onPhChange: (ph: number) => void }) {
  const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>({
    Al: true, P: true, N: true, K: true, Ca: true, Fe: true, Mo: true, Mn: false, Zn: false, Cu: false, B: false, Mg: false
  });

  const toggleElement = (id: string) => {
    setVisibleElements(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (cat: 'all' | 'macro' | 'micro') => {
    if (cat === 'all') {
      const allTrue = Object.values(visibleElements).every(Boolean);
      const nextState: Record<string, boolean> = {};
      NUTRIENT_CURVES.forEach(el => { nextState[el.id] = !allTrue; });
      setVisibleElements(nextState);
    } else {
      const nextState = { ...visibleElements };
      NUTRIENT_CURVES.filter(el => el.category === cat).forEach(el => {
        nextState[el.id] = true;
      });
      setVisibleElements(nextState);
    }
  };

  const getX = (valPh: number) => 50 + ((valPh - 3.0) / 7.0) * 700;
  const getY = (avail: number) => 250 - (avail / 100) * 220;

  const generatePath = (curveFn: (ph: number) => number) => {
    const points: string[] = [];
    for (let cPh = 3.0; cPh <= 10.0; cPh += 0.1) {
      const x = getX(cPh);
      const y = getY(curveFn(cPh));
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M ${points.join(" L ")}`;
  };

  const alTox = NUTRIENT_CURVES.find(e => e.id === "Al")?.calcValue(currentPh) || 0;

  return (
    <div className="space-y-5">
      {/* Панель вибору кривих */}
      <div className="space-y-2 bg-muted/40 p-3 rounded-xl border">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1"><Filter className="h-3.5 w-3.5" /> Вибір кривих для відображення:</span>
          <div className="flex gap-2 text-[11px]">
            <button onClick={() => toggleCategory('all')} className="hover:underline text-emerald-600 dark:text-emerald-400 font-medium">Усі/Скинути</button>
            <button onClick={() => toggleCategory('macro')} className="hover:underline text-blue-600 dark:text-blue-400 font-medium">Макро</button>
            <button onClick={() => toggleCategory('micro')} className="hover:underline text-purple-600 dark:text-purple-400 font-medium">Мікро</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {NUTRIENT_CURVES.map(el => {
            const active = visibleElements[el.id];
            return (
              <button
                key={el.id}
                onClick={() => toggleElement(el.id)}
                style={{
                  backgroundColor: active ? el.color : "transparent",
                  borderColor: el.color,
                  color: active ? "#ffffff" : el.color
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                  active ? "shadow-sm font-bold" : "opacity-60 hover:opacity-100"
                }`}
              >
                {el.symbol} {el.id === "Al" && "☠️"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Головний інтерактивний SVG-графік */}
      <div className="relative border rounded-xl bg-background p-2 overflow-hidden shadow-inner">
        <svg viewBox="0 0 800 280" className="w-full h-auto select-none">
          <defs>
            <pattern id="toxic-stripe-theory" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#EF4444" strokeWidth="3" />
            </pattern>
          </defs>

          {/* Заштрихована зона токсичності Al³⁺ та Mn²⁺ (pH 3.0 .. 5.2) */}
          <rect
            x={getX(3.0)}
            y={30}
            width={getX(5.2) - getX(3.0)}
            height={220}
            fill="url(#toxic-stripe-theory)"
            opacity={0.25}
          />

          {/* Сітка по осі Y (0%, 50%, 100%) */}
          {[0, 50, 100].map(val => (
            <g key={val}>
              <line x1="50" y1={getY(val)} x2="750" y2={getY(val)} stroke="currentColor" strokeDasharray="3 3" className="text-border" />
              <text x="42" y={getY(val) + 4} textAnchor="end" className="text-[10px] fill-muted-foreground font-mono">{val}%</text>
            </g>
          ))}

          {/* Сітка та позначки по осі X (pH 3.0 .. 10.0) */}
          {[3, 4, 5, 5.5, 6, 7, 8, 9, 10].map(valPh => (
            <g key={valPh}>
              <line x1={getX(valPh)} y1="30" x2={getX(valPh)} y2="250" stroke="currentColor" strokeDasharray="2 2" className="text-border/60" />
              <text x={getX(valPh)} y="268" textAnchor="middle" className="text-[11px] fill-muted-foreground font-mono font-bold">
                {valPh}
              </text>
            </g>
          ))}

          {/* Малювання активних кривих */}
          {NUTRIENT_CURVES.map(el => {
            if (!visibleElements[el.id]) return null;
            return (
              <path
                key={el.id}
                d={generatePath(el.calcValue)}
                fill="none"
                stroke={el.color}
                strokeWidth={el.id === "Al" ? "3" : "2.2"}
                strokeDasharray={el.id === "Al" ? "4 2" : "none"}
                className="transition-all duration-200 hover:stroke-[4]"
              />
            );
          })}

          {/* Маркер поточного pH */}
          <line
            x1={getX(currentPh)}
            y1="20"
            x2={getX(currentPh)}
            y2="250"
            stroke="#10B981"
            strokeWidth="2.5"
          />
          <circle cx={getX(currentPh)} cy={250} r="5" fill="#10B981" />
        </svg>

        {currentPh <= 5.2 && (
          <div className="absolute top-4 left-16 bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
            ЗОНА КРИТИЧНОЇ ТОКСИЧНОСТІ Al³⁺ / Mn²⁺
          </div>
        )}
      </div>

      {/* Слайдер pH для графіка */}
      <div className="space-y-1 bg-card p-3 rounded-xl border">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-muted-foreground">Зміна pH ґрунту на графіку:</span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">pH {currentPh.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min={3.0}
          max={10.0}
          step={0.1}
          value={currentPh}
          onChange={(e) => onPhChange(parseFloat(e.target.value))}
          className="w-full accent-emerald-600 cursor-pointer h-2 bg-muted rounded-lg"
        />
      </div>

      {/* Динамічні роз'яснення хімічного механізму */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
          alTox > 40 ? "bg-rose-500/10 border-rose-500/40 text-rose-900 dark:text-rose-200" : "bg-emerald-500/5 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
        }`}>
          <div className="font-bold flex items-center gap-1.5">
            {alTox > 40 ? <ShieldAlert className="h-4 w-4 text-rose-600" /> : <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
            Стан Алюмінію (Al³⁺): {alTox > 40 ? "ТОКСИЧНИЙ РІВЕНЬ" : "Безпечний рівень"}
          </div>
          <p className="text-[11px] leading-relaxed opacity-90">
            {currentPh <= 5.0
              ? "Висока концентрація вільних катіонів Al³⁺. Руйнуються мікрофібрили кореневих чехликів, вимиваються Ca та Mg, блокується поглинання фосфатів."
              : currentPh <= 5.5
              ? "Початковий рівень гідролізу Al³⁺ → Al(OH)²⁺. Фітотоксичність проявляється на чутливих культурах (пшениця, ячмінь, соя)."
              : "Алюміній зв'язаний у малорозчинний гідроксид Al(OH)₃ та не завдає фізіологічної шкоди корінню."}
          </p>
        </div>

        <div className="p-3.5 rounded-xl border bg-muted/40 text-xs space-y-1.5">
          <div className="font-bold text-foreground flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Доступність Фосфору (P) та Молібдену (Mo):
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {currentPh < 5.5 && "Фосфор зв'язується у малорозчинні фосфати алюмінію та заліза (AlPO₄, FePO₄). Молібден сорбується гідроксидами та недоступний бобовим."}
            {currentPh >= 5.5 && currentPh <= 7.0 && "Оптимальне вікно! Фосфор перебуває у легкозасвоюваній формі H₂PO₄⁻. Молібден та макроелементи знаходяться у збалансованому стані."}
            {currentPh > 7.0 && "Фосфор зв'язується у малорозчинні фосфати кальцію Ca₃(PO₄)₂. Різко падає розчинність Fe, Mn, Zn, Cu та B."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// ОСНОВНИЙ КОМПОНЕНТ ВКЛАДКИ «ТЕОРІЯ ТА КОНЦЕПЦІЇ»
// ----------------------------------------------------------------------

export function TheoryTab() {
  const [ph, setPh] = useState(6.5);
  const [system, setSystem] = useState<"dstu_kcl" | "ua_h2o" | "usda">("dstu_kcl");
  const [selectedCropGroup, setSelectedCropGroup] = useState<string>("neutrophile");

  // Обробник зміни pH з автоматичною синхронізацією екологічної групи
  const handlePhChange = (newPh: number) => {
    setPh(newPh);
    setSelectedCropGroup(getGroupForPh(newPh));
  };

  const currentSteps = system === "dstu_kcl" ? DSTU_KCL_STEPS : system === "ua_h2o" ? UA_WATER_STEPS : USDA_STEPS;
  const dstuStep = getStepForPh(ph, DSTU_KCL_STEPS);
  const uaWaterStep = getStepForPh(ph, UA_WATER_STEPS);
  const usdaStep = getStepForPh(ph, USDA_STEPS);
  const currentStep = system === "dstu_kcl" ? dstuStep : system === "ua_h2o" ? uaWaterStep : usdaStep;

  const filteredCrops = ECOLOGICAL_CROPS.filter((c) => selectedCropGroup === "all" || c.group === selectedCropGroup);

  return (
    <div className="space-y-8">
      {/* 1.1. ТРИ АВТОНОМНІ СИСТЕМИ КЛАСИФІКАЦІЇ КИСЛОТНОСТІ */}
      <Panel title="1.1. Класифікація кислотно-основної реакції ґрунтів" kind="theory" icon={<Activity className="h-5 w-5 text-emerald-600" />}>
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            У симуляторі розмежовано <b>три незалежні класифікаційні системи</b>. Жодна з них не виводиться з іншої за допомогою фіксованого формульного коефіцієнта, оскільки pH<sub>H₂O</sub> ≠ pH<sub>KCl</sub> + const.
          </p>

          <div className="flex flex-wrap gap-2 p-1 bg-muted/50 rounded-lg border">
            <button
              onClick={() => setSystem("dstu_kcl")}
              className={`flex-1 min-w-[200px] px-3 py-2 text-xs font-semibold rounded-md transition-all ${system === "dstu_kcl" ? "bg-background text-emerald-700 dark:text-emerald-400 shadow-sm border" : "text-muted-foreground hover:text-foreground"}`}
            >
              🌱 ДСТУ 4362:2004 (pH<sub>KCl</sub> - 11 градацій)
            </button>
            <button
              onClick={() => setSystem("ua_h2o")}
              className={`flex-1 min-w-[200px] px-3 py-2 text-xs font-semibold rounded-md transition-all ${system === "ua_h2o" ? "bg-background text-blue-700 dark:text-blue-400 shadow-sm border" : "text-muted-foreground hover:text-foreground"}`}
            >
              💧 Агрономічна UA (pH<sub>H₂O</sub> - 10 градацій)
            </button>
            <button
              onClick={() => setSystem("usda")}
              className={`flex-1 min-w-[200px] px-3 py-2 text-xs font-semibold rounded-md transition-all ${system === "usda" ? "bg-background text-purple-700 dark:text-purple-400 shadow-sm border" : "text-muted-foreground hover:text-foreground"}`}
            >
              🌎 USDA NRCS 2017 (pH<sub>H₂O</sub> - 11 градацій)
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentSteps.map((st) => {
              const isSelected = ph >= st.min && ph <= st.max;
              const targetVal = Number(((st.min + st.max) / 2).toFixed(1));

              return (
                <button
                  key={st.name}
                  onClick={() => handlePhChange(targetVal)}
                  style={{
                    backgroundColor: isSelected ? st.color : `${st.color}15`,
                    borderColor: st.color,
                    color: isSelected ? "#ffffff" : st.color,
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
                    isSelected ? "shadow-md ring-2 ring-offset-1 font-bold" : "hover:opacity-90"
                  }`}
                >
                  {st.name} ({st.labelRange})
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl border bg-card space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white shadow-lg font-mono text-3xl font-extrabold transition-all duration-300"
                  style={{ backgroundColor: currentStep.color }}
                >
                  <span className="text-[10px] font-sans font-normal opacity-90">
                    {system === "dstu_kcl" ? "pH KCl" : "pH H₂O"}
                  </span>
                  {ph.toFixed(1)}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    {system === "dstu_kcl" && "ДСТУ 4362:2004 (Сольова витяжка)"}
                    {system === "ua_h2o" && "Українська агрономічна шкала (Водна витяжка)"}
                    {system === "usda" && "USDA Soil Survey Manual 2017 (Водна витяжка 1:1)"}
                  </div>
                  <div className="text-xl font-serif font-bold mt-0.5" style={{ color: currentStep.color }}>
                    {currentStep.name} {currentStep.enName ? `(${currentStep.enName})` : ""}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Офіційний інтервал: <b className="font-mono text-foreground">{currentStep.labelRange} pH</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <input
                aria-label="pH value"
                type="range"
                min={3.0}
                max={9.5}
                step={0.1}
                value={ph}
                onChange={(e) => handlePhChange(Number(e.target.value))}
                style={{ accentColor: currentStep.color }}
                className="w-full cursor-pointer h-2 rounded-lg bg-muted"
              />
              <div className="flex justify-between font-mono text-[11px] text-muted-foreground px-1">
                <span>3.0 (Ультракислий)</span>
                <span>5.5 (Критична межа)</span>
                <span>7.0 (Нейтральний)</span>
                <span>9.5 (Дуже сильнолужний)</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 text-xs">
            <div className={`p-3 rounded-lg border transition-all ${system === "dstu_kcl" ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20" : "bg-card"}`}>
              <div className="font-semibold text-emerald-800 dark:text-emerald-300">1. ДСТУ 4362:2004 (pH<sub>KCl</sub>)</div>
              <div className="mt-1 font-medium">{dstuStep.name} ({dstuStep.labelRange})</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">База для розрахунку вапнування в Україні.</div>
            </div>

            <div className={`p-3 rounded-lg border transition-all ${system === "ua_h2o" ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" : "bg-card"}`}>
              <div className="font-semibold text-blue-800 dark:text-blue-300">2. Агрономічна UA (pH<sub>H₂O</sub>)</div>
              <div className="mt-1 font-medium">{uaWaterStep.name} ({uaWaterStep.labelRange})</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Характеризує активну кислотність розчину.</div>
            </div>

            <div className={`p-3 rounded-lg border transition-all ${system === "usda" ? "border-purple-500 bg-purple-50/50 dark:bg-purple-950/20" : "bg-card"}`}>
              <div className="font-semibold text-purple-800 dark:text-purple-300">3. USDA NRCS (pH<sub>H₂O</sub> 1:1)</div>
              <div className="mt-1 font-medium">{usdaStep.name} ({usdaStep.labelRange})</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Міжнародний стандарт Soil Survey Manual.</div>
            </div>
          </div>
        </div>
      </Panel>

      {/* 1.2. 5 ЕКОЛОГІЧНИХ ГРУП СІЛЬСЬКОГОСПОДАРСЬКИХ КУЛЬТУР */}
      <Panel title="1.2. Екологічні групи культур та фізіологічна чутливість" kind="theory" icon={<Leaf className="h-5 w-5 text-emerald-600" />}>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "Усі 5 екологічних груп" },
              { id: "acidophile", label: "🫐 Ацидофіли" },
              { id: "acidotolerant", label: "🥔 Ацидотолерантні" },
              { id: "neutrophile", label: "🌾 Нейтрофіли" },
              { id: "alkalotolerant", label: "🌻 Алкалотолерантні" },
              { id: "alkalophile", label: "🌿 Алкалофіли" }
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedCropGroup(b.id)}
                className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${selectedCropGroup === b.id ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCrops.map((crop) => {
              const isOpt = ph >= crop.optMin && ph <= crop.optMax;
              const isTol = ph >= crop.tolMin && ph <= crop.tolMax && !isOpt;

              return (
                <div key={crop.name} className={`p-3.5 rounded-xl border transition-all ${isOpt ? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/30" : isTol ? "border-amber-500/40 bg-amber-500/5" : "border-border bg-card opacity-75"}`}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-semibold text-sm text-foreground">{crop.name}</div>
                      <div className="text-[11px] italic text-muted-foreground">{crop.lat}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isOpt ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : isTol ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"}`}>
                      {isOpt ? "🟢 Оптимум" : isTol ? "🟡 Толерує" : "🔴 Пригнічення"}
                    </span>
                  </div>

                  <div className="mt-2.5 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Оптимум pH:</span>
                      <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{crop.optMin} – {crop.optMax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Межі толерантності:</span>
                      <span className="font-mono text-muted-foreground">{crop.tolMin} – {crop.tolMax}</span>
                    </div>
                  </div>

                  <p className="mt-2 text-[11px] text-muted-foreground border-t pt-2 leading-relaxed">
                    <b>Фізіологія:</b> {crop.mechanism}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      {/* 1.3. ВЗАЄМОЗВ'ЯЗОК ВІДІВ КИСЛОТНОСТІ ҐРУНТУ */}
      <Panel title="1.3. Види кислотності ґрунту та їх взаємозв'язок" kind="theory" icon={<Layers className="h-5 w-5 text-emerald-600" />}>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 rounded-xl border bg-card space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400 text-sm">
                  <Droplet className="h-4 w-4" />
                  1. Актуальна (активна) кислотність
                </div>
                <div className="text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 p-1.5 rounded text-center font-bold">
                  pH(H₂O) — Водна витяжка
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Зумовлена концентрацією вільних іонів H⁺ у ґрунтовому розчині. Характеризує фактичну кислотно-основну реакцію ґрунтового середовища та визначається показником pH водної витяжки (pH H₂O).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-card space-y-3 border-purple-500/30 bg-purple-500/5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-purple-700 dark:text-purple-400 text-sm">
                  <FlaskConical className="h-4 w-4" />
                  2. Потенційна (прихована) кислотність
                </div>
                <div className="text-xs font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 p-1.5 rounded text-center font-bold">
                  Зосереджена у Ґрунтовому Вбирному Комплексі (ҐВК)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Зумовлена наявністю кислотних компонентів у ґрунтовому вбирному комплексі. <b>Поділяється на два види:</b>
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-3 rounded-lg border bg-background space-y-1">
                  <div className="font-semibold text-xs text-amber-700 dark:text-amber-400 flex items-center justify-between">
                    <span>2.1. Обмінна кислотність</span>
                    <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border">pH(KCl)</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Зумовлена обмінно-поглинутими іонами H⁺ та Al³⁺, які витісняються з ґрунтового вбирного комплексу розчинами нейтральних солей (зазвичай KCl). Визначається за pH сольової витяжки та вмістом витіснених кислотних компонентів.
                  </p>
                </div>

                <div className="p-3 rounded-lg border bg-background space-y-1">
                  <div className="font-semibold text-xs text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                    <span>2.2. Гідролітична кислотність (Hг)</span>
                    <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border">CH₃COONa</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Характеризує ширший резерв кислотних компонентів ґрунту, які витісняються під дією гідролітично лужних солей (зазвичай CH₃COONa). Використовується як основний показник для розрахунку потреби ґрунту у вапнуванні.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border bg-muted/40 text-xs space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-2">
              <Sigma className="h-4 w-4 text-primary" />
              Взаємозв'язок та буферна здатність ґрунту:
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <b>Взаємозв'язок:</b> Актуальна кислотність характеризує реакцію ґрунтового розчину, а потенційна — запас кислотності, зосереджений у твердій фазі ґрунту. 
              Обмінна кислотність є частиною гідролітичної, тому зазвичай виконується співвідношення:
            </p>
            <div className="p-2 rounded bg-card border text-center font-mono font-bold text-sm text-primary max-w-xs mx-auto">
              H<sub>г</sub> &gt; H<sub>обм</sub>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Саме потенційна кислотність визначає здатність ґрунту відновлювати кислу реакцію після нейтралізації ґрунтового розчину.
            </p>
          </div>
        </div>
      </Panel>

      {/* 1.4. ІНТЕРАКТИВНИЙ ГРАФІК ТА МАТРИЦЯ ДОСТУПНОСТІ ЕЛЕМЕНТІВ */}
      <Panel title="1.4. Вплив pH на доступність елементів живлення та токсичність алюмінію" kind="theory" icon={<Activity className="h-5 w-5 text-emerald-600" />}>
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <b>Методична умова:</b> Графік відображає концептуальну зміну потенційної доступності елементів живлення, а не фактичний вміст їх рухомих форм. Для визначення останнього необхідні лабораторні вимірювання.
          </p>
          <InteractiveNutrientGraph currentPh={ph} onPhChange={handlePhChange} />
        </div>
      </Panel>

      {/* 1.5. ГЛОСАРІЙ АГРОХІМІЧНИХ ФОРМУЛ ТА ВАПНУВАННЯ */}
      <h2 className="pt-2 font-serif text-2xl font-semibold">1.5. Агрохімічні формули та розрахунок вапнування</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <KappenCard />
        <SnoCard />
      </div>
      <LimingFormulaCards />
  
    </div>
  );
}

// ----------------------------------------------------------------------
// ДОПОМІЖНІ КАРТКИ ФОРМУЛ (КАППЕН, SNO, ЛІМІНГ)
// ----------------------------------------------------------------------

function KappenCard() {
  const [a, setA] = useState("2.5"), [K, setK] = useState("1"), [m, setM] = useState("40"), [V1, setV1] = useState("100"), [V2, setV2] = useState("50");
  const r = [parseNum(a, "a"), parseNum(K, "K"), parseNum(m, "m"), parseNum(V1, "V1"), parseNum(V2, "V2")];
  const errs = r.flatMap((x) => (x.ok ? [] : [x.error]));
  const v = errs.length ? null : r.map((x) => (x as { value: number }).value) as [number, number, number, number, number];

  return (
    <Panel title="Формула А: гідролітична кислотність за Каппеном" kind="calc" icon={<Sigma className="h-5 w-5 text-primary" />}>
      <div className="formula">Hг = (a × K × 0.1 × 100 × 1.75 × V1) / (m × V2)</div>
      <ul className="my-3 space-y-0.5 text-xs text-muted-foreground">
        <li><b>Hг</b> — гідролітична кислотність, мг-екв/100 г ґрунту</li>
        <li><b>a</b> — об'єм 0,1 н NaOH, витрачений на титрування, мл</li>
        <li><b>1.75</b> — поправковий коефіціент Каппена на неповне витіснення H⁺</li>
      </ul>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 text-xs">
        <Field id="ka" label="a" unit="мл" value={a} onChange={setA} />
        <Field id="kk" label="K" value={K} onChange={setK} />
        <Field id="km" label="m" unit="г" value={m} onChange={setM} />
        <Field id="kv1" label="V1" unit="мл" value={V1} onChange={setV1} />
        <Field id="kv2" label="V2" unit="мл" value={V2} onChange={setV2} />
      </div>
      <div className="mt-3"><ErrorBox errors={errs} /></div>
      {v && (
        <div className="mt-3 font-mono text-sm">
          <div className="text-base font-bold text-primary">Hг = {fmt(hydrolyticAcidityExtract(v[0], v[1], v[2], v[3], v[4]))} мг-екв/100 г</div>
        </div>
      )}
    </Panel>
  );
}

function SnoCard() {
  const [svo, setSvo] = useState("15"), [hg, setHg] = useState("2.5");
  const r = [parseNum(svo, "SVO"), parseNum(hg, "Hг", { allowZero: true })];
  const errs = r.flatMap((x) => (x.ok ? [] : [x.error]));
  const v = errs.length ? null : r.map((x) => (x as { value: number }).value) as [number, number];

  return (
    <Panel title="Формула Б: ступінь насиченості основами (V %)" kind="calc" icon={<Sigma className="h-5 w-5 text-primary" />}>
      <div className="formula">V = (100 × S) / (S + Hг)</div>
      <ul className="my-3 space-y-0.5 text-xs text-muted-foreground">
        <li><b>V</b> — ступінь насиченості основами, %</li>
        <li><b>S</b> — сума ввібраних основ, мг-екв/100 г</li>
        <li><b>Hг</b> — гідролітична кислотність, мг-екв/100 г</li>
      </ul>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <Field id="ssvo" label="S (основи)" unit="мг-екв" value={svo} onChange={setSvo} />
        <Field id="shg" label="Hг" unit="мг-екв" value={hg} onChange={setHg} />
      </div>
      <div className="mt-3"><ErrorBox errors={errs} /></div>
      {v && (
        <div className="mt-3 font-mono text-sm">
          <div className="text-base font-bold text-primary">V = {fmt(baseSaturation(v[0], v[1]))} %</div>
        </div>
      )}
    </Panel>
  );
}

function LimingFormulaCards() {
  const acad = limingAcademic(3, 10000, 1.3, 0.2), expr = limingExpress(3, 1.3, 20);

  return (
    <Panel title="Формула В: розрахунок норм меліорантів (CaCO₃)" kind="calc" icon={<Sigma className="h-5 w-5 text-primary" />}>
      <div className="grid gap-4 md:grid-cols-2 text-xs">
        <div className="rounded-lg border bg-background p-3">
          <b className="text-sm">Академічний розрахунок (за Hг):</b>
          <div className="formula mt-2">CaCO₃ = (Hг × 0.5 × S × d × h) / 1000</div>
          <p className="mt-2 text-muted-foreground">Розрахунок повної норми карбонату кальцію у тоннах на площу S.</p>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <b className="text-sm">Експрес-польовий розрахунок:</b>
          <div className="formula mt-2">CaCO₃ = 0.05 × Hг × d × h_cm</div>
          <p className="mt-2 text-muted-foreground">Розрахунок у т/га для орного шару глибиною h_cm.</p>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-accent/40 p-3 font-mono text-xs">
        <div className="mb-1 font-sans font-semibold">Приклад при Hг = 3.0 мг-екв/100г, d = 1.3 г/см³, h = 20 см:</div>
        <div>Повна норма (академічна): <b>{fmt(acad)} т/га CaCO₃</b></div>
        <div>Експрес-норма: <b>{fmt(expr)} т/га CaCO₃</b></div>
      </div>
    </Panel>
  );
}