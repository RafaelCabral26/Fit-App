"use client"

import { useEffect, useState } from "react";
import SetePontos from "./components/SetePontos";
import TresPontos from "./components/TresPontos";
import { calcMetrics, validateInput } from "./metricsUtilities";
import { TAge, TGender, TMethods, TMetrics, TMetricsRef, TResult } from "./metricTypes";
import { filterNumberInput } from "@/services/tools";
import ResultCard from "./components/ResultCard";
import IntroMetricComposition from "./components/IntroMetricComposition";
import FormMetricComposition from "./components/FormMetricComposition";


const ComposicaoCorporal = () => {
  const [calcResult, setCalcResult] = useState<TResult>();

  return (
    <div className="container -mt-14 bg-white h-auto m-auto flex flex-col grow-1 items-center  gap-14 ">
      <IntroMetricComposition/>
      <FormMetricComposition setCalcResult={setCalcResult}/>
      {calcResult?.density &&
        <ResultCard calcResult={calcResult} />
      }

    </div>
  )
}

export default ComposicaoCorporal;
