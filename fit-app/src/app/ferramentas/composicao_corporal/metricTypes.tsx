
export type TMetrics = {
  Tricipital: number | "",
  Subescapular: number | "",
  AxilarMédia: number | "",
  SupraIlíaca: number | "",
  Peitoral: number | "",
  Abdominal: number | "",
  Coxa: number | "",
}
export type TStringsMetrics = 
  "Tricipital"|
  "Subescapular"|
  "AxilarMédia"|
  "SupraIlíaca"|
  "Peitoral"|
  "Abdominal"|
  "Coxa";

export type TMetricsRef =  {
  Tricipital: HTMLInputElement | null,
  Subescapular: HTMLInputElement | null,
  AxilarMédia: HTMLInputElement | null,
  SupraIlíaca: HTMLInputElement | null,
  Peitoral: HTMLInputElement | null,
  Abdominal: HTMLInputElement | null,
  Coxa: HTMLInputElement | null,
}
export type TAge = number | "";

export type TMethods = "3 pontos" | "7 pontos";

export type TGender = "male" | "female";

export type TResult = {
  density:number ,
  bodyFat:number ,
  bodyFatKg: number,
  leanMass: number,
  basalMetabolicRate: number
}
