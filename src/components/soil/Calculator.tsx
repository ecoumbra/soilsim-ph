import { useState } from "react";
import { Calculator as CalcIcon, Eraser, Scale, Save } from "lucide-react";
import { toast } from "sonner";
import { parseNum, limingAcademic, limingExpress, materialRate, cmToM, mToCm, haToM2, m2ToHa, fmt } from "@/lib/soil";
import { useJournal } from "@/lib/journal";
import { Panel, Btn, Field, ErrorBox, Tag } from "./shared";

const MATERIALS = { caco3: "Карбонат кальцію (CaCO₃)", cao: "Оксид кальцію (CaO)", dolomite: "Доломітове борошно" } as const;
type Mat = keyof typeof MATERIALS;
const defaults = { hg: "3", d: "1.3", h: "20", hUnit: "cm" as "cm" | "m", S: "1", sUnit: "ha" as "ha" | "m2", mat: "caco3" as Mat, nv: "100", tol: "1e-9" };

type Res = { formula: "academic" | "express"; hg: number; d: number; h_m: number; h_cm: number; S_m2: number; S_ha: number; nv: number; total: number; perHa: number; matTotal: number; matPerHa: number; acadT: number; exprTHa: number };

export function CalculatorTab() {
  const { add } = useJournal();
  const [f, setF] = useState(defaults);
  const [formula, setFormula] = useState<"academic" | "express">("academic");
  const [errs, setErrs] = useState<string[]>([]);
  const [res, setRes] = useState<Res | null>(null);
  const [compare, setCompare] = useState(false);
  const set = (k: keyof typeof defaults) => (v: string) => setF({ ...f, [k]: v });

  const compute = (): Res | null => {
    const r = { hg: parseNum(f.hg, "Hг"), d: parseNum(f.d, "Щільність d"), h: parseNum(f.h, "Глибина h"), S: parseNum(f.S, "Площа S"), nv: parseNum(f.nv, "Нейтралізуюча здатність") };
    const e = Object.values(r).flatMap((x) => (x.ok ? [] : [x.error]));
    const val = (k: keyof typeof r) => (r[k] as { value: number }).value;
    if (!e.length) {
      if (val("nv") > 200) e.push("Нейтралізуюча здатність понад 200 % фізично некоректна.");
      if (val("d") > 3) e.push("Щільність ґрунту понад 3 г/см³ некоректна.");
      const hm = f.hUnit === "cm" ? cmToM(val("h")) : val("h");
      if (hm > 2) e.push("Глибина орного шару понад 2 м некоректна — перевірте одиниці (см/м).");
    }
    setErrs(e);
    if (e.length) { setRes(null); return null; }
    const hg = val("hg"), d = val("d"), nv = val("nv");
    const h_m = f.hUnit === "cm" ? cmToM(val("h")) : val("h");
    const h_cm = f.hUnit === "cm" ? val("h") : mToCm(val("h"));
    const S_m2 = f.sUnit === "ha" ? haToM2(val("S")) : val("S");
    const S_ha = m2ToHa(S_m2);
    const acadT = limingAcademic(hg, S_m2, d, h_m);
    const exprTHa = limingExpress(hg, d, h_cm);
    const total = formula === "academic" ? acadT : exprTHa * S_ha;
    const perHa = formula === "academic" ? acadT / S_ha : exprTHa;
    const out: Res = { formula, hg, d, h_m, h_cm, S_m2, S_ha, nv, total, perHa, matTotal: materialRate(total, nv), matPerHa: materialRate(perHa, nv), acadT, exprTHa };
    setRes(out);
    return out;
  };

  const tol = Number(f.tol) || 1e-9;

  return (
    <div className="space-y-6">
      <Panel title="3.1. Вхідні параметри" kind="user" icon={<CalcIcon className="h-5 w-5 text-primary" />}>
        <div className="mb-4 inline-flex rounded-lg border bg-muted p-1" role="tablist">
          {(["academic", "express"] as const).map((k) => (
            <button key={k} role="tab" aria-selected={formula === k} onClick={() => { setFormula(k); setRes(null); }}
              className={`rounded-md px-4 py-2 text-sm font-medium ${formula === k ? "bg-primary text-primary-foreground" : ""}`}>{k === "academic" ? "Академічна (розширена)" : "Експрес (польова)"}</button>
          ))}
        </div>
        <div className="formula mb-4">{formula === "academic" ? "CaCO₃ = (Hг × 0.5 × S × d × h) / 1000   [т на площу S; S — м², h — м]" : "CaCO₃ = 0.05 × Hг × d × h_cm   [т/га; h — см]"}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field id="chg" label="Гідролітична кислотність Hг" unit="мг-екв/100 г" value={f.hg} onChange={set("hg")} />
          <Field id="cd" label="Щільність ґрунту d" unit="г/см³" value={f.d} onChange={set("d")} />
          <div className="flex items-end gap-2">
            <div className="flex-1"><Field id="ch" label="Глибина орного шару h" value={f.h} onChange={set("h")} /></div>
            <select aria-label="Одиниці глибини" value={f.hUnit} onChange={(e) => setF({ ...f, hUnit: e.target.value as "cm" | "m" })} className="rounded-md border border-input bg-background px-2 py-2">
              <option value="cm">см</option><option value="m">м</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1"><Field id="cs" label="Площа поля S" value={f.S} onChange={set("S")} /></div>
            <select aria-label="Одиниці площі" value={f.sUnit} onChange={(e) => setF({ ...f, sUnit: e.target.value as "ha" | "m2" })} className="rounded-md border border-input bg-background px-2 py-2">
              <option value="ha">га</option><option value="m2">м²</option>
            </select>
          </div>
          <label className="block text-sm"><span className="mb-1 block font-medium">Вапнякове добриво</span>
            <select value={f.mat} onChange={(e) => setF({ ...f, mat: e.target.value as Mat })} className="w-full rounded-md border border-input bg-background px-3 py-2">
              {Object.entries(MATERIALS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
          <Field id="cnv" label="Нейтралізуюча здатність (CaCO₃-екв.)" unit="%" value={f.nv} onChange={set("nv")} tip="Введіть явне значення з паспорта матеріалу" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Нейтралізуюча здатність не визначається за назвою матеріалу — вкажіть значення з сертифіката. 100 % — навчальний приклад, який можна редагувати.</p>
        <div className="mt-4"><ErrorBox errors={errs} /></div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn onClick={() => { if (compute()) toast.success("Розрахунок виконано"); }}><CalcIcon className="h-4 w-4" />Розрахувати</Btn>
          <Btn variant="outline" onClick={() => { if (compute()) setCompare(true); }}><Scale className="h-4 w-4" />Порівняти формули</Btn>
          <Btn variant="outline" disabled={!res} onClick={() => {
            if (!res) return;
            add({ type: "Вапнування", title: `${MATERIALS[f.mat]} — ${res.formula === "academic" ? "академічна" : "експрес"} формула`, status: "Розраховано",
              data: { "Hг": String(res.hg), "d, г/см³": String(res.d), "h, см": fmt(res.h_cm), "S, га": fmt(res.S_ha, 4), "НЗ, %": String(res.nv), "CaCO₃, т/га": fmt(res.perHa), "CaCO₃ всього, т": fmt(res.total), "Матеріал, т/га": fmt(res.matPerHa), "Матеріал всього, т": fmt(res.matTotal) } });
            toast.success("Розрахунок збережено в журнал");
          }}><Save className="h-4 w-4" />Зберегти розрахунок</Btn>
          <Btn variant="ghost" onClick={() => { setF(defaults); setRes(null); setErrs([]); setCompare(false); }}><Eraser className="h-4 w-4" />Очистити поля</Btn>
        </div>
      </Panel>

      {res && (
        <Panel title="3.3. Хід розрахунку" kind="calc">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2 font-mono text-sm">
              <div className="font-sans font-semibold">Перерахунок одиниць</div>
              <div>h = {fmt(res.h_cm, 2)} см = {fmt(res.h_m, 4)} м</div>
              <div>S = {fmt(res.S_ha, 4)} га = {fmt(res.S_m2, 2)} м²</div>
              <div className="pt-2 font-sans font-semibold">Підстановка</div>
              {res.formula === "academic" ? (<>
                <div>CaCO₃ = ({res.hg} × 0.5 × {res.S_m2} × {res.d} × {res.h_m}) / 1000</div>
                <div>CaCO₃ = {fmt(res.hg * 0.5 * res.S_m2 * res.d * res.h_m, 4)} / 1000</div>
                <div>CaCO₃ = <b>{fmt(res.total, 3)} т</b> на {fmt(res.S_ha, 4)} га</div>
              </>) : (<>
                <div>CaCO₃ = 0.05 × {res.hg} × {res.d} × {res.h_cm}</div>
                <div>CaCO₃ = <b>{fmt(res.perHa, 3)} т/га</b></div>
                <div>Всього: {fmt(res.perHa, 3)} × {fmt(res.S_ha, 4)} га = <b>{fmt(res.total, 3)} т</b></div>
              </>)}
              <div className="pt-2 font-sans font-semibold">Корекція на матеріал</div>
              <div>Норма = CaCO₃ / ({res.nv} / 100) = {fmt(res.perHa, 3)} / {fmt(res.nv / 100, 2)}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Теоретична потреба CaCO₃", `${fmt(res.perHa)} т/га`], ["CaCO₃ на всю площу", `${fmt(res.total)} т`], [`${MATERIALS[f.mat]}, норма`, `${fmt(res.matPerHa)} т/га`], ["Матеріал на всю площу", `${fmt(res.matTotal)} т`]].map(([l, v], i) => (
                <div key={l} className={`rounded-lg p-3 ${i >= 2 ? "bg-primary text-primary-foreground" : "bg-accent/50"}`}><div className="text-xs opacity-80">{l}</div><div className="font-mono text-xl font-bold">{v}</div></div>
              ))}
              <div className="col-span-2">
                <div className="mb-1 text-xs text-muted-foreground">Візуальне зведення (норма матеріалу, т/га; шкала 0–15)</div>
                <div className="h-4 overflow-hidden rounded-full bg-muted"><div className="h-full bg-hero transition-all" style={{ width: `${Math.min(100, (res.matPerHa / 15) * 100)}%` }} /></div>
              </div>
            </div>
          </div>
        </Panel>
      )}

      {res && compare && (
        <Panel title="Порівняння формул" kind="calc">
          <div className="mb-3 max-w-xs"><Field id="ctol" label="Допуск порівняння" value={f.tol} onChange={set("tol")} /></div>
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-sm">
            <div className="rounded-lg bg-muted p-3">Академічна: {fmt(res.acadT, 6)} т / {fmt(res.S_ha, 4)} га<br />= {fmt(res.acadT / res.S_ha, 6)} т/га</div>
            <div className="rounded-lg bg-muted p-3">Експрес: {fmt(res.exprTHa, 6)} т/га<br />× {fmt(res.S_ha, 4)} га = {fmt(res.exprTHa * res.S_ha, 6)} т</div>
            {(() => { const diff = Math.abs(res.acadT / res.S_ha - res.exprTHa); const ok = diff <= tol; return (
              <div className={`rounded-lg p-3 ${ok ? "bg-success/20" : "bg-destructive/15"}`}>|Δ| = {diff.toExponential(2)} т/га<br />{ok ? "✓ Результати еквівалентні" : "✗ Перевищено допуск"}</div>); })()}
          </div>
        </Panel>
      )}

      <Panel title="3.5. До та після вапнування" kind="theory">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg p-4 text-background" style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}><b>До</b><p className="text-sm">Кислий ґрунт: високий вміст рухомого Al³⁺, низький ступінь насиченості основами.</p></div>
          <div className="rounded-lg p-4 text-background" style={{ background: "linear-gradient(135deg,#84CC16,#22C55E)" }}><b>Після</b><p className="text-sm">Нейтралізація кислотності, зростання SNO, кращі умови для чутливих культур.</p></div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Схема ілюстративна і не є кількісним прогнозом pH: числове значення pH після вапнування з гідролітичної кислотності не обчислюється. Калькулятор дає теоретичну потребу за введеними даними; фактична агрономічна рекомендація залежить від властивостей ґрунту й вапнякового матеріалу.</p>
      </Panel>
    </div>
  );
}
