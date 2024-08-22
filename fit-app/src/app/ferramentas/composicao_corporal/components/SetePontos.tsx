"use client"

import { MutableRefObject, useEffect, useState } from "react"
import InputMetric from "./InputMetric";
import { TMetrics, TMetricsRef } from "../metricTypes";

const SetePontos = ({metricInput, handleMetricInput  }: { metricInput: TMetrics, handleMetricInput: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {

  return (
    <>
    <div className="my-form ">
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="flex flex-col  gap-4">
          <InputMetric inputName={"Tricipital"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

          <InputMetric inputName={"AxilarMédia"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

          <InputMetric inputName={"SupraIlíaca"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

          <InputMetric inputName={"Peitoral"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>
        </div>
        <div className="flex flex-col gap-4">

          <InputMetric inputName={"Abdominal"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

          <InputMetric inputName={"Coxa"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

          <InputMetric inputName={"Subescapular"}  metricInput={metricInput} handleMetricInput={handleMetricInput}></InputMetric>

        </div>
      </div>
    </div>
    </>
  )
}
export default SetePontos;
