"use client"

import { FC } from "react"
import { TResult } from "../metricTypes"

interface TResultCard {
  calcResult: TResult
}
const ResultCard: FC<TResultCard> = ({ calcResult }) => {
  return (
    <div className="container flex justify-center  md:text-xl text-primary bg-white ">
      <div className="max-w-2xl grid grid-rows-3 grid-cols-2 gap-12 ">
        <div className="text-center   ">
          <p className="text-accent">Densidade Corporal</p>
          <p className="text-3xl md:text-5xl font-bold font-sans">{calcResult.density} g/cm³</p>
        </div>
        <div className="text-center ">
          <p className="text-accent" >Gordura Corporal</p>
          <p className="text-3xl md:text-5xl font-bold font-sans">{calcResult.bodyFat} %</p>
        </div>
        <div className="text-center ">
          <p className="text-accent" >Massa Gorda </p>
          <p className="text-3xl md:text-5xl font-bold font-sans">{calcResult.bodyFatKg} Kg</p>
        </div>
        <div className="text-center ">
          <p className="text-accent" >Massa Magra</p>
          <p className="text-3xl md:text-5xl font-bold font-sans">{calcResult.leanMass} Kg</p>
        </div>
        <div className="text-center  ">
          <p className="text-accent ">Taxa Metabólica Basal</p>
          <p className="text-3xl md:text-5xl font-bold font-sans ">{calcResult.basalMetabolicRate} kcal</p>
        </div>
      </div>
    </div>
  )
}

export default ResultCard;
