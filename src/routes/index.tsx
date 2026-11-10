import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  BookOpen, 
  FlaskConical, 
  Calculator, 
  ClipboardList, 
  TestTubeDiagonal, 
  Info, 
  Heart, 
  X,
  CheckCircle2,
  HelpCircle,
  History,
  ExternalLink,
  Sparkles,
  MessageSquare,
  Layers
} from "lucide-react";
import { JournalProvider } from "@/lib/journal";
import { TheoryTab } from "@/components/soil/Theory";
import { LabTab } from "@/components/soil/Lab";
import { CalculatorTab } from "@/components/soil/Calculator";
import { PracticeTab } from "@/components/soil/Practice";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoilSim v2.0: Інтерактивний симулятор кислотності ґрунтів" },
      { name: "description", content: "Теорія, віртуальна лабораторія ДСТУ, калькулятор вапнування та генератор практичних завдань." },
      { property: "og:title", content: "SoilSim v2.0: Інтерактивний симулятор кислотності ґрунтів" },
      { property: "og:description", content: "Цифрове ґрунтознавство: глибше розуміння, ефективніші рішення." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TABS = [
  { id: "theory", label: "Теорія та концепції", icon: BookOpen },
  { id: "lab", label: "Віртуальна лабораторія", icon: FlaskConical },
  { id: "calc", label: "Калькулятор вапнування", icon: Calculator },
  { id: "practice", label: "Завдання та журнал", icon: ClipboardList },
] as const;

// 🏦 Посилання на Банку в Monobank
const MONO_BANK_URL = "https://send.monobank.ua/jar/784u1m7ro9";

// 📋 Посилання на Google Form для фідбеку
const FEEDBACK_FORM_URL = "https://forms.gle/zWVf6W5G2VLvSj8x5";

function Index() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("theory");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [infoModalTab, setInfoModalTab] = useState<"about" | "usage" | "history">("usage");

  return (
    <JournalProvider>
      <div className="min-h-screen">
        <header className="bg-hero text-primary-foreground">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                {/* Слоган */}
                <div className="flex items-center gap-2">
                  <TestTubeDiagonal className="h-6 w-6 text-emerald-300" />
                  <span className="text-xs uppercase tracking-wider font-medium opacity-90">
                    Цифрове ґрунтознавство: глибше розуміння, ефективніші рішення
                  </span>
                </div>

                {/* Назва проєкту */}
                <h1 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
                  SoilSim: <span className="opacity-95">Інтерактивний симулятор кислотності ґрунтів</span>
                </h1>

                {/* Опис */}
                <p className="mt-2 max-w-2xl text-sm opacity-90">
                  Теорія, віртуальна лабораторія, калькулятор вапнування та генератор практичних завдань.
                </p>
              </div>

              {/* Кнопки верхньої панелі */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setShowInfoModal(true)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 text-sm font-medium transition-colors border border-primary-foreground/15"
                >
                  <Info className="h-4 w-4 text-emerald-300" />
                  <span>Про симулятор</span>
                </button>

                <button
                  onClick={() => setShowSupportModal(true)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 text-sm font-medium transition-colors border border-rose-400/30"
                >
                  <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
                  <span>Подякувати автору</span>
                </button>
              </div>
            </div>
          </div>

          {/* Навігаційні вкладки */}
          <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4" role="tablist" aria-label="Розділи">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-t-lg px-4 py-3 text-sm font-medium transition-colors ${
                  tab === t.id ? "bg-background text-foreground" : "hover:bg-primary-foreground/10"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Контент активної вкладки */}
        <main key={tab} className="mx-auto max-w-6xl px-4 py-8 fade-in">
          {tab === "theory" && <TheoryTab />}
          {tab === "lab" && <LabTab />}
          {tab === "calc" && <CalculatorTab />}
          {tab === "practice" && <PracticeTab />}
        </main>

        {/* -------------------- МОДАЛЬНЕ ВІКНО: ПРО СИМУЛЯТОР -------------------- */}
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-background border rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b bg-muted/40">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-emerald-600" />
                  <h2 className="font-semibold text-lg">Про симулятор SoilSim v2.0</h2>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Таби всередині модалки */}
              <div className="flex border-b bg-muted/20 px-4">
                <button
                  onClick={() => setInfoModalTab("usage")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    infoModalTab === "usage"
                      ? "border-emerald-600 text-emerald-600 font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <HelpCircle className="h-4 w-4" /> Як користуватись
                </button>
                <button
                  onClick={() => setInfoModalTab("about")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    infoModalTab === "about"
                      ? "border-emerald-600 text-emerald-600 font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" /> Про проєкт
                </button>
                <button
                  onClick={() => setInfoModalTab("history")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    infoModalTab === "history"
                      ? "border-emerald-600 text-emerald-600 font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <History className="h-4 w-4" /> Історія версій
                </button>
              </div>

              {/* Контент табів модалки */}
              <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed">
                
                {/* 1. ЯК КОРИСТУВАТИСЬ */}
                {infoModalTab === "usage" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base text-foreground">Інтерактивний посібник користувача:</h3>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-muted/30">
                        <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">1. Теорія та концепції:</strong>
                        <p className="text-xs text-muted-foreground">Досліджуйте 3 незалежні системи градації pH, екологічні групи культур та динамічний модуль доступності 12 елементів живлення з контролем токсичності Al³⁺.</p>
                      </div>

                      <div className="p-3 rounded-lg border bg-muted/30">
                        <strong className="text-blue-700 dark:text-blue-400 block mb-1">2. Віртуальна лабораторія:</strong>
                        <p className="text-xs text-muted-foreground">Виконуйте покрокову симуляцію дослідів за ДСТУ: зважування, додавання реактивів, струшування на шейкері, фільтрування та титрування з бюретки з веденням протоколу.</p>
                      </div>

                      <div className="p-3 rounded-lg border bg-muted/30">
                        <strong className="text-amber-700 dark:text-amber-400 block mb-1">3. Калькулятор вапнування:</strong>
                        <p className="text-xs text-muted-foreground">Розраховуйте норми CaCO₃, CaO та доломітового борошна за Академічною та Експрес формулами з корекцією на нейтралізуючу здатність матеріалу та орний шар.</p>
                      </div>

                      <div className="p-3 rounded-lg border bg-muted/30">
                        <strong className="text-purple-700 dark:text-purple-400 block mb-1">4. Завдання та журнал:</strong>
                        <p className="text-xs text-muted-foreground">Розв'язуйте розрахункові завдання відповідно до вашої спеціальності (206, 205, 203, 200). Режим контролю викладача захищений секретним PIN-кодом.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ПРО ПРОЄКТ */}
                {infoModalTab === "about" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
                        <Layers className="h-5 w-5 text-emerald-600" /> Візія та масштабування SoilSim
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-2">
                        <strong>SoilSim</strong> — це перша ластівка в рамках розробки глобальної освітньої цифрової екосистеми з ґрунтознавства, агрохімії та землеробства. 
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-1.5">
                        Симулятор розробляється як фундаментальна навчально-практична платформа для студентів, викладачів та науковців, покликана замінити застарілі статичні підручники інтерактивними експериментами у реальному часі.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border bg-purple-500/10 border-purple-500/20 text-xs space-y-2">
                      <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" /> Незабаром у наступних релізах екосистеми:
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        <li><b>Органічна речовина ґрунту:</b> Модуль віртуального визначення вмісту гумусу та фракціонування органіки.</li>
                        <li><b>Гідрофіка та фізика ґрунтів:</b> Повноцінна імітація руху води, вологоємності та її поведінки залежно від гранулометричного складу і чинників довкілля.</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-lg border bg-muted/40 text-xs font-mono space-y-1">
                      <div><b>Розробка та адаптація:</b> Володимир Нікорич</div>
                      <div><b>Платформа:</b> Чернівецький національний університет ім. Ю. Федьковича, 2026</div>
                    </div>

                    {/* Блок збору фідбеку через Google Form */}
                    <div className="p-3.5 rounded-lg border border-blue-500/30 bg-blue-500/10 flex items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                          <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Нам важливий ваш фідбек!
                        </span>
                        <span className="text-muted-foreground text-[11px] block">
                          Поділіться вашою думкою або ідеями для нових модулів. Збір анонімний.
                        </span>
                      </div>
                      <a
                        href={FEEDBACK_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Заповнити форму
                      </a>
                    </div>
                  </div>
                )}

                {/* 3. ІСТОРІЯ ВЕРСІЙ */}
                {infoModalTab === "history" && (
                  <div className="space-y-4">
                    <div className="border-l-2 border-purple-500 pl-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 text-sm">
                          <Sparkles className="h-4 w-4" /> Версія 2.0.0 (Масштабне методичне оновлення)
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">Поточний реліз</span>
                      </div>
                      
                      <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1.5">
                        <li><b>Нова теорія та концепції:</b> Повноцінний перегляд подачі матеріалу — 3 автономні системи градацій pH, екологічні групи рослин, їхнє відношення до кислотності та динамічний модуль поведінки і доступності 12 елементів живлення.</li>
                        <li><b>Нова віртуальна лабораторія:</b> Концептуально та візуально оновлений стенд. Студент повністю імітує реальний хід роботи за ДСТУ (зважування, шейкер, лійка, титрування бюреткою з краплями).</li>
                        <li><b>Оновлені завдання та журнал:</b> Адаптація під 4 спеціальності (206 Агрономія, 205 Землевпорядкування, 203 Екологія, 200 Біологія) з розрахунком СВО, СНО (V%) та ЄП.</li>
                        <li><b>Захищений контроль викладача:</b> Режим перевірки та перегляду розкладок рішень захищено викладацьким PIN-кодом.</li>
                        <li><b>Уніфікований макет:</b> Додано наскрізний стандартизований дворядковий футер авторів на всіх сторінках.</li>
                      </ul>
                    </div>

                    <div className="border-l-2 border-muted pl-3 space-y-1 opacity-70">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">Версія 1.0.0</span>
                        <span className="text-xs text-muted-foreground">Базовий прототип</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Початковий реліз 4 базових розділів із простими розрахунковими формулами вапнування.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t bg-muted/20 flex justify-end">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  Зрозуміло
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- МОДАЛЬНЕ ВІКНО: ПОДЯКУВАТИ АВТОРУ (MONOBANK) -------------------- */}
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-background border rounded-xl shadow-2xl max-w-md w-full p-6 space-y-5 text-center">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950/50 rounded-full flex items-center justify-center mx-auto text-rose-500 border border-rose-200 dark:border-rose-900">
                <Heart className="h-6 w-6 fill-rose-500" />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-foreground">Підтримати розвиток SoilSim</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Якщо симулятор допоміг у вашому навчанні чи викладанні, ви можете підтримати розробку нових модулів та підтримку сервера!
                </p>
              </div>

              {/* Згенерований QR-код для Monobank Банки */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border flex flex-col items-center justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(MONO_BANK_URL)}`} 
                  alt="QR-код Monobank" 
                  className="w-44 h-44 rounded-lg shadow-sm border bg-white p-1"
                />
                <span className="text-[11px] font-mono text-muted-foreground mt-2.5">
                  Скануйте камерою смартфона або застосунком Monobank
                </span>
              </div>

              {/* Пряме посилання на Банку */}
              <div className="flex flex-col gap-2">
                <a
                  href={MONO_BANK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-md transition-all"
                >
                  <ExternalLink className="h-4 w-4" /> Відкрити Банку в Monobank
                </a>
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="w-full py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Закрити
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </JournalProvider>
  );
}