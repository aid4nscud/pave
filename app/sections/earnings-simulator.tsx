"use client";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Calculator } from "lucide-react";

const schema = z.object({
  city: z.string().default("Phoenix, AZ"),
  scenario: z.enum(["conservative", "base", "aggressive"]).default("base"),
});

type Inputs = z.infer<typeof schema>;

const cityData = {
  "Phoenix, AZ": { demandMultiplier: 1.0, avgPrice: 35, description: "Strong AV pilot program" },
  "San Francisco, CA": { demandMultiplier: 1.3, avgPrice: 52, description: "High demand, premium rates" },
  "Los Angeles, CA": { demandMultiplier: 1.2, avgPrice: 42, description: "Large market, consistent demand" },
  "Miami, FL": { demandMultiplier: 0.9, avgPrice: 38, description: "Growing market, seasonal peaks" },
  "Austin, TX": { demandMultiplier: 1.1, avgPrice: 32, description: "Tech hub, expanding coverage" },
};

const scenarioPresets = {
  conservative: { priceMultiplier: 0.9, hoursPerDay: 8, daysPerMonth: 22, networkFeePct: 28 },
  base: { priceMultiplier: 1.0, hoursPerDay: 12, daysPerMonth: 26, networkFeePct: 25 },
  aggressive: { priceMultiplier: 1.15, hoursPerDay: 16, daysPerMonth: 28, networkFeePct: 22 },
};

export function EarningsSimulator() {
  const [inputs, setInputs] = useState<Inputs>(schema.parse({}));

  const results = useMemo(() => {
    const city = cityData[inputs.city as keyof typeof cityData];
    const preset = scenarioPresets[inputs.scenario];
    const pricePerHour = Math.round(city.avgPrice * preset.priceMultiplier);
    const gross = pricePerHour * preset.hoursPerDay * preset.daysPerMonth;
    const networkFee = Math.round((gross * preset.networkFeePct) / 100);
    const opsCostPerMonth = 1200;
    const financePayment = 900;
    const net = gross - networkFee - opsCostPerMonth - financePayment;
    return { pricePerHour, gross, networkFee, net };
  }, [inputs]);

  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-sm xl:p-8 xl:max-h-[72vh] xl:overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Earnings Preview</h3>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="grid gap-2 text-sm">
          <span className="text-foreground font-medium">City</span>
          <select
            className="w-full rounded-xl border border-border px-4 py-3 bg-white text-foreground"
            value={inputs.city}
            onChange={(e) => setInputs((s) => ({ ...s, city: e.target.value }))}
          >
            {Object.keys(cityData).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground">{cityData[inputs.city as keyof typeof cityData]?.description}</span>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-foreground font-medium">Scenario</span>
        <div className="grid grid-cols-3 gap-2">
            {Object.keys(scenarioPresets).map((key) => (
            <button
              key={key}
              type="button"
                onClick={() => setInputs((s) => ({ ...s, scenario: key as Inputs["scenario"] }))}
              className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                inputs.scenario === key 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-muted-foreground border-border hover:border-primary'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        </label>
      </div>

      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklab,var(--primary)_6%,white)]">
          <div className="text-xs text-muted-foreground">Estimated net monthly</div>
          <div className={`mt-1 text-3xl font-semibold ${results.net >= 0 ? 'text-success' : 'text-warning'}`}>{`$${Math.round(results.net).toLocaleString()}`}</div>
        </div>
        <Kpi label="Gross" value={`$${Math.round(results.gross).toLocaleString()}/mo`} />
        <Kpi label="Network fee" value={`-$${Math.round(results.networkFee).toLocaleString()}/mo`} tone="negative" />
      </div>

      <a href="#waitlist" className="mt-4 inline-flex items-center justify-center rounded-xl btn btn-primary px-5 py-3 text-sm">Get a full estimate</a>

      <div className="mt-3 text-xs text-muted-foreground">Illustrative preview. Assumptions vary by city and program terms.</div>
    </div>
  );
}

function Kpi({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "positive" | "negative" }) {
  const toneClass = tone === "positive" ? "text-success" : tone === "negative" ? "text-warning" : "text-foreground";
  return (
    <div className="rounded-xl border border-border p-3 bg-muted">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 text-lg font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}