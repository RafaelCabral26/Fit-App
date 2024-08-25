"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { TAge, TGender, TMethods, TMetrics, TResult } from "../metricTypes";
import { filterNumberInput } from "@/services/tools";
import TresPontos from "./TresPontos";
import SetePontos from "./SetePontos";
import { calcMetrics, validateInput } from "../metricsUtilities";
interface TFormMetricComposition {
    setCalcResult: Dispatch<SetStateAction<TResult | undefined>>;
}
const FormMetricComposition: FC<TFormMetricComposition> = ({setCalcResult}) => {
  const [methods, setMethod] = useState<TMethods>("3 pontos");
  const [gender, setGender] = useState<TGender>("male");
  const [weight, setWeight] = useState<number>();
  const [age, setAge] = useState<TAge>("");
  const [metricInput, setMetricInput] = useState<TMetrics>(
    {
      Tricipital: "",
      Subescapular: "",
      AxilarMédia: "",
      SupraIlíaca: "",
      Peitoral: "",
      Abdominal: "",
      Coxa: "",
    }
  );


  const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  };

  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  useEffect(() => {
    setMetricInput(
      {
        Tricipital: "",
        Subescapular: "",
        AxilarMédia: "",
        SupraIlíaca: "",
        Peitoral: "",
        Abdominal: "",
        Coxa: "",
      });
  }, [methods, gender]);

  const handleMetricInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setMetricInput((prev: TMetrics) => {
      return { ...prev, [name]: value };
    })
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!validateInput(formData)) {
      return;
    }
    const result = calcMetrics(formData, methods, gender)
    setCalcResult(result);
  };
  return (
      <form onSubmit={handleSubmit} className="my-form shadow-lg rounded-md p-8 w-[95%] max-w-xl items-center ">
        <div className="flex flex-col gap-4 max-w-full ">
            <div className="flex flex-col md:flex-row gap-4 ">
              <label className="label-input relative  " data-tip="">
                <div tabIndex={0} inputMode="numeric" placeholder={"Métodos"} className=" my-input peer input flex ">
                  <label className="label gap-2 ">
                    <input readOnly className="my-checkbox" type="checkbox" checked={methods === "3 pontos"}
                      onClick={() => setMethod("3 pontos")} />
                    <span className="label-text ">3 pontos</span>
                  </label>
                  <label className="label gap-2 ">
                    <input
                      readOnly
                      className="my-checkbox" type="checkbox"
                      checked={methods === "7 pontos"}
                      onClick={() => setMethod("7 pontos")} />
                    <span className="label-text ">7 pontos</span>
                  </label>
                  <span className="span-input">Métodos</span>
                  <span className=" "></span>
                </div>
              </label>
              <label className="label-input relative " data-tip="">
                <div tabIndex={0} placeholder={"Gênero"} className=" my-input peer input flex">
                  <label className="label gap-2 ">
                    <input
                      tabIndex={-1}
                      readOnly
                      className="my-checkbox"
                      type="checkbox"
                      checked={gender === "male"}
                      onClick={() => setGender("male")} />
                    <span className="label-text">Masculino</span>
                  </label>
                  <label className="label gap-2 ">
                    <input
                      tabIndex={-1}
                      readOnly
                      className="my-checkbox" type="checkbox"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      onClick={() => setGender("female")}
                    />
                    <span className="label-text ">Feminino</span>
                  </label>
                  <span className="span-input">Gênero</span>
                  <span className=" "></span>
                </div>
              </label>
            </div>
          <div className="flex flex-col md:flex-row   gap-4 ">
            <label
              id="Idade"
              htmlFor="Idade"
              className="label-input relative">
              <input
                name="Idade"
                placeholder="Idade"
                type="text"
                className="my-input peer"
                onKeyDown={(e) => filterNumberInput(e)}
                onChange={handleAge} />
              <span className="span-input">Idade</span>
            </label>
            <label id="Peso" htmlFor="Peso" className="label-input relative">
              <input
                name="Peso"
                placeholder="Peso/Kg"
                type="text"
                className="my-input peer"
                onKeyDown={(e) => filterNumberInput(e)}
                onChange={handleWeight} />
              <span className="span-input">Peso/Kg</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col  items-center gap-2">
        </div>
        <div className="flex  ">
          {methods === "3 pontos" && <TresPontos metricInput={metricInput} gender={gender} handleMetricInput={handleMetricInput}></TresPontos>}
          {methods === "7 pontos" && <SetePontos metricInput={metricInput} handleMetricInput={handleMetricInput}></SetePontos>}
        </div>
        <button className="my-btn btn-wide  " type="submit" >Calcular</button>
      </form>

  )
}

export default FormMetricComposition;
