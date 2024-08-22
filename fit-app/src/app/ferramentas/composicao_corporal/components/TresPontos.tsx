"use client"

import { MutableRefObject, useEffect, useRef } from "react";
import { TMetrics, TMetricsRef } from "./metricTypes";
import InputMetric from "./InputMetric";


const TresPontos = ({ metricInput, handleMetricInput, gender, }: { metricInput: TMetrics, handleMetricInput: (e: React.ChangeEvent<HTMLInputElement>) => void, gender: "male" | "female"  }) => {



  return (
    <div className="my-form shrink-0">
      {gender === "male" &&
          (<>
            <InputMetric inputName={"Peitoral"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

            <InputMetric inputName={"Abdominal"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

            <InputMetric inputName={"Coxa"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

          </>)
        }

        {gender === "female" &&
          (<>

            <InputMetric inputName={"Tricipital"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

            <InputMetric inputName={"SupraIlíaca"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

            <InputMetric inputName={"Coxa"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

          </>)
        }

      </div>
    )
  }
  export default TresPontos;
