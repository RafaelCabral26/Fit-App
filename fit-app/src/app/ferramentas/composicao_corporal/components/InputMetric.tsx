"use client"

import { MutableRefObject } from "react"
import { filterNumberInput } from "@/services/tools"
import { TMetrics, TStringsMetrics } from "../metricTypes"

const InputMetric = ({ inputName, metricInput, handleMetricInput }: { inputName: TStringsMetrics, metricInput: TMetrics, handleMetricInput: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {

  return (
    <>
      <label key={inputName} htmlFor={inputName} id={inputName} className="label-input  " data-tip="">
        <input tabIndex={0} inputMode="numeric" value={metricInput[inputName]} onChange={handleMetricInput} name={inputName} placeholder={inputName} type="number" className=" my-input " onKeyDown={(e) => filterNumberInput(e)} />
        <span className="span-input">{inputName}</span>
        <div className=" absolute btn btn-base rounded-md rounded-l-none h-full  right-0 top-0 0 m-0 border-none shadow-none ">mm</div>
        <span className=" "></span>
      </label>
    </>
  )
}

export default InputMetric
