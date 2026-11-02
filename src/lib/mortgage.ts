/**
 * Motor de simulación hipotecaria.
 * Todo es estimativo y se calcula en el navegador: no se envía ningún dato.
 */

export type Mode = 'uva' | 'fija';

export interface Product {
  id: Mode;
  label: string;
  short: string;
  tna: number;
  maxYears: number;
  maxFinanced: number;
  /** Seguro de vida e incendio, anual sobre el capital. */
  insurance: number;
  note: string;
}

export const PRODUCTS: Record<Mode, Product> = {
  uva: {
    id: 'uva',
    label: 'UVA',
    short: 'UVA',
    tna: 0.065,
    maxYears: 30,
    maxFinanced: 0.8,
    insurance: 0.004,
    note: 'La cuota se ajusta por inflación.',
  },
  fija: {
    id: 'fija',
    label: 'Tasa fija',
    short: 'Fija',
    tna: 0.125,
    maxYears: 15,
    maxFinanced: 0.6,
    insurance: 0.004,
    note: 'La cuota no cambia durante todo el plazo.',
  },
};

/** Tipo de cambio de referencia de la demo. */
export const FX = 1450;
/** Inflación anual asumida para proyectar la cuota UVA. */
export const INFLATION = 0.25;
/** Gastos de escritura, sellado y honorarios, sobre el valor de la propiedad. */
export const CLOSING_COSTS = 0.06;
/** Porcentaje máximo del ingreso que puede representar la cuota. */
export const INCOME_RATIO = 0.3;

export interface Inputs {
  priceUsd: number;
  /** Porcentaje del valor a financiar (50–80). */
  financedPct: number;
  years: number;
  mode: Mode;
  fx: number;
  inflation: number;
}

export const DEFAULT_INPUTS: Inputs = {
  priceUsd: 140_000,
  financedPct: 75,
  years: 25,
  mode: 'uva',
  fx: FX,
  inflation: INFLATION,
};

export interface Result {
  mode: Mode;
  months: number;
  financedPct: number;
  years: number;
  propertyArs: number;
  creditArs: number;
  downPaymentArs: number;
  closingArs: number;
  initialPayment: number;
  paymentAtYear5: number;
  requiredIncome: number;
  /** Tasa efectiva anual del costo financiero, en términos reales para UVA. */
  cft: number;
  totalPaidToday: number;
  first: {
    capital: number;
    interest: number;
    insurance: number;
  };
}

/** Cuota del sistema francés. */
export function monthlyPayment(principal: number, annualRate: number, months: number): number {
  const i = annualRate / 12;
  if (i <= 0) return principal / months;
  return (principal * i) / (1 - Math.pow(1 + i, -months));
}

/** Tasa mensual que iguala el valor presente de una cuota constante al capital. */
function monthlyIrr(presentValue: number, payment: number, months: number): number {
  let low = 0;
  let high = 1;
  for (let step = 0; step < 80; step += 1) {
    const mid = (low + high) / 2;
    const pv =
      mid === 0
        ? payment * months
        : (payment * (1 - Math.pow(1 + mid, -months))) / mid;
    if (pv > presentValue) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

export function simulate(input: Inputs): Result {
  const product = PRODUCTS[input.mode];
  const years = Math.min(input.years, product.maxYears);
  const financedPct = Math.min(input.financedPct, product.maxFinanced * 100);
  const months = years * 12;

  const propertyArs = input.priceUsd * input.fx;
  const creditArs = propertyArs * (financedPct / 100);
  const downPaymentArs = propertyArs - creditArs;
  const closingArs = propertyArs * CLOSING_COSTS;

  const interest = monthlyPayment(creditArs, product.tna, months);
  const insurance = (creditArs * product.insurance) / 12;
  const initialPayment = interest + insurance;

  const monthlyI = product.tna / 12;
  const firstInterest = creditArs * monthlyI;
  const firstCapital = interest - firstInterest;

  const paymentAtYear5 =
    input.mode === 'uva' ? initialPayment * Math.pow(1 + input.inflation, 5) : initialPayment;

  const effectiveMonthly = monthlyIrr(creditArs, initialPayment, months);
  const cft = Math.pow(1 + effectiveMonthly, 12) - 1;

  return {
    mode: input.mode,
    months,
    financedPct,
    years,
    propertyArs,
    creditArs,
    downPaymentArs,
    closingArs,
    initialPayment,
    paymentAtYear5,
    requiredIncome: initialPayment / INCOME_RATIO,
    cft,
    totalPaidToday: initialPayment * months,
    first: {
      capital: firstCapital,
      interest: firstInterest,
      insurance,
    },
  };
}

/* ---------- Formato es-AR ---------- */

export const ars = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export const usd = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const pct = new Intl.NumberFormat('es-AR', {
  style: 'percent',
  maximumFractionDigits: 1,
});
