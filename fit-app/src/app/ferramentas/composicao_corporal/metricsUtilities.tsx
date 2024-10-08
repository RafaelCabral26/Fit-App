import { TGender, TMethods } from "./metricTypes";

export const calcMetrics = (formData: FormData, methods: TMethods,
  gender: TGender) => {
  const splitedFormData = formData
  const weight = splitedFormData.get("Peso");
  const age = splitedFormData.get("Idade")
  splitedFormData.delete("Peso")
  splitedFormData.delete("Idade")
  let sum = 0;
  for (const value of Array.from(splitedFormData.values())) {
    sum += Number(value);
  }

  if (gender === "male") {
    return maleCalc(sum, age, methods, weight);
  }
  return femaleCalc(sum, age, methods, weight);
}

const maleCalc = (sum: number, age: FormDataEntryValue | null, methods: TMethods, weight: FormDataEntryValue | null) => {
  let density = 0;
  if (methods === "3 pontos") {
    density = 1.10938 - (0.0008267 * sum) + (0.0000016 * (sum ** 2)) - (0.0002574 * Number(age));
  } else if (methods === "7 pontos") {
   density =  1.112 - (0.00043499 * sum) + (0.00000055 * (sum ** 2)) - (0.00028826 * Number(age))
  }

  const result = calcsAfterDensity(density, weight);
  return result

};

const femaleCalc = (sum: number, age: FormDataEntryValue | null, methods: TMethods, weight: FormDataEntryValue | null) => {
  let density = 0;
  if (methods === "3 pontos") {
    density = 1.0994921 - (0.0009929 * sum) + (0.0000023 * (sum ** 2)) - (0.0001392 * Number(age));

  } else if (methods === "7 pontos") {
    density = 1.097 - (0.00046971 * sum) + (0.00000056 * (sum ** 2)) - (0.00012828 * Number(age));
  }

  const result = calcsAfterDensity(density, weight);
  return result
};

const calcsAfterDensity = (density: number, weight: FormDataEntryValue | null) => {
  const bodyFat = ((4.95 / density) - 4.50) * 100;
  const bodyFatKg = (bodyFat / 100) * Number(weight);
  const leanMass = (Number(weight) - Number(bodyFatKg)).toFixed(1);
  const basalMetabolicRate = (21.6 * Number(leanMass)) + 370;
  return { density: truncNumber(density, 2), bodyFat: Number(bodyFat.toFixed(2)), bodyFatKg: parseFloat(bodyFatKg.toFixed(1)), leanMass: Number(leanMass), basalMetabolicRate: Number(basalMetabolicRate.toFixed()) }
};

export const validateInput = (formData: FormData) => {
  for (let [key, value] of Array.from(formData.entries())) {
    const tooltipDiv = document.getElementById(key);

    if (Number(value) <= 0 || isNaN(+value)) {
      (tooltipDiv?.firstElementChild as HTMLElement)?.focus();
      if (tooltipDiv) {
        tooltipDiv.className = "label-input relative tooltip tooltip-open tooltip-top tooltip-primary text-sm";
        tooltipDiv.setAttribute("data-tip", "Somente números positivos")
        const closeTooltip = () => {
          tooltipDiv.className = "label-input relative"
          tooltipDiv.removeAttribute("data-tip");
          tooltipDiv.firstElementChild?.removeEventListener("input", closeTooltip)
          tooltipDiv.firstElementChild?.removeEventListener("focusout", closeTooltip)

        }
        tooltipDiv.firstElementChild?.addEventListener("input", closeTooltip)
        tooltipDiv.firstElementChild?.addEventListener("focusout", closeTooltip)
      }
      return false;
    }

  }
  return true;
};

const truncNumber = (num: number, decimal: number) => {
  return Math.trunc(num * Math.pow(10, decimal)) / Math.pow(10, decimal)
};
