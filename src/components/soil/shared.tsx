import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Kind = "theory" | "sim" | "calc" | "synthetic" | "user";
const kinds: Record<Kind, { label: string; cls: string }> = {
  theory: { label: "Теорія", cls: "bg-secondary text-secondary-foreground" },
  sim: { label: "Симуляція", cls: "bg-warning/25 text-warning-foreground" },
  calc: { label: "Розрахунок", cls: "bg-primary/15 text-primary" },
  synthetic: { label: "Синтетичні дані", cls: "bg-earth/15 text-earth" },
  user: { label: "Дані користувача", cls: "bg-olive/20 text-accent-foreground" },
};

export function Tag({ kind }: { kind: Kind }) {
  const k = kinds[kind];
  return <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide", k.cls)}>{k.label}</span>;
}

export function Panel({ title, kind, children, className, icon }: { title: ReactNode; kind?: Kind; children: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <section className={cn("rounded-xl border bg-card p-5 shadow-soft fade-in", className)}>
      <header className="mb-4 flex flex-wrap items-center gap-2">
        {icon}
        <h3 className="font-serif text-lg font-semibold">{title}</h3>
        {kind && <Tag kind={kind} />}
      </header>
      {children}
    </section>
  );
}

export function Term({ children, tip }: { children: ReactNode; tip: string }) {
  return <abbr title={tip} className="term">{children}</abbr>;
}

export function Field({ label, unit, value, onChange, tip, step = "any", id }: { label: string; unit?: string; value: string; onChange: (v: string) => void; tip?: string; step?: string; id: string }) {
  return (
    <label htmlFor={id} className="block text-sm">
      <span className="mb-1 block font-medium" title={tip}>{label}{unit && <span className="text-muted-foreground"> ({unit})</span>}</span>
      <input id={id} type="number" inputMode="decimal" step={step} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

export function Btn({ children, variant = "primary", className, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "danger" }) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-muted",
    ghost: "hover:bg-muted",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  }[variant];
  return <button {...p} className={cn("inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none", v, className)}>{children}</button>;
}

export function ErrorBox({ errors }: { errors: string[] }) {
  if (!errors.length) return null;
  return (
    <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
      {errors.map((e) => <div key={e}>• {e}</div>)}
    </div>
  );
}
