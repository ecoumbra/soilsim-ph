import { describe, it, expect } from "vitest";
import { classifyPhKCl, hydrolyticAcidityExtract, baseSaturation, limingAcademic, limingExpress, materialRate, generateSamples } from "@/lib/soil";
describe("soil", () => {
  it("pH boundaries", () => {
    expect(classifyPhKCl(4.5).name).toBe("Сильнокислий");
    expect(classifyPhKCl(4.6).name).toBe("Середньокислий");
    expect(classifyPhKCl(7.5).name).toBe("Слаболужний");
    expect(classifyPhKCl(7.6).name).toBe("Сильнолужний");
  });
  it("Kappen with V1/V2", () => expect(hydrolyticAcidityExtract(2.5, 1, 40, 100, 50)).toBeCloseTo(2.1875));
  it("SNO", () => expect(baseSaturation(15, 5)).toBe(75));
  it("liming equivalence", () => expect(limingAcademic(3, 10000, 1.3, 0.2)).toBeCloseTo(limingExpress(3, 1.3, 20)));
  it("material NV 80%", () => expect(materialRate(4, 80)).toBe(5));
  it("20 rows", () => expect(generateSamples().length).toBe(20));
});
