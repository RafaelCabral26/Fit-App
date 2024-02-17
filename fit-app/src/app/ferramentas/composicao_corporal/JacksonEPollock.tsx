"use client"

import { useEffect, useState } from "react"

type TMetrics = {
    Tricipital: number,
    Subescapular: number,
    AxilarMédia: number,
    SupraIlíaca: number,
    Peitoral: number
    Abdominal: number,
    Coxa: number
}
const JacksonEPollock = () => {
    const [gender, setGender] = useState<"male" | "female">();
    const [metricInput, setMetricInput] = useState<TMetrics>(
        {
            Tricipital: 0,
            Subescapular: 0,
            AxilarMédia: 0,
            SupraIlíaca: 0,
            Peitoral: 0,
            Abdominal: 0,
            Coxa: 0,
        }
    );

    const handleMetriInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setMetricInput((prev: TMetrics) => {
            return { ...prev, [name]: value };
        })

    }
    const handleCalc = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let sum = 0;
        for (let key in metricInput) {
            sum += key;
        }
    }

    return (
        <form className="m-auto">
            <div>
                <h1>Gênero</h1>
                <div className="flex justify-around ">
                    <label className="label gap-2 ">
                        <input className="checkbox focus:ring-transparent checkbox-secondary checkbox-sm rounded-sm" type="checkbox" checked={gender === "male"} onClick={() => setGender("male")} />
                        <span className="label-text">Masculino</span>
                    </label>
                    <label className="label gap-2 ">
                        <input className="checkbox focus:ring-transparent checkbox-secondary checkbox-sm rounded-sm" type="checkbox" checked={gender === "female"} onChange={() => setGender("female")} onClick={() => setGender("female")} />
                        <span className="label-text ">Feminino</span>
                    </label>
                </div>
            </div>
            <div className="">
                <h1>Dobras</h1>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="Tricipital" className="label-input relative">
                            <input onChange={handleMetriInput} name="Tricipital" placeholder="Tricipital" type="text" className=" my-input peer" />
                            <span className="span-input">Tricipital</span>
                        </label>
                        <label htmlFor="Subescapular" className="label-input relative">
                            <input onChange={handleMetriInput} name="Subescapular" placeholder="Subescapular" type="text" className=" my-input peer" />
                            <span className="span-input">Subescapular</span>
                        </label>
                        <label htmlFor="AxilarMédia" className="label-input relative">
                            <input onChange={handleMetriInput} name="AxilarMédia" placeholder="Axilar Média" type="text" className=" my-input peer" />
                            <span className="span-input">Axilar Média</span>
                        </label>
                        <label htmlFor="SupraIlíaca" className="label-input relative">
                            <input onChange={handleMetriInput} name="SupraIlíaca" placeholder="Supra-Ilíaca" type="text" className=" my-input peer" />
                            <span className="span-input">Supra-Ilíaca</span>
                        </label>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="Peitoral" className="label-input relative">
                            <input onChange={handleMetriInput} name="Peitoral" placeholder="Peitoral" type="text" className=" my-input peer" />
                            <span className="span-input">Peitoral</span>
                        </label>
                        <label htmlFor="Abdominal" className="label-input relative">
                            <input onChange={handleMetriInput} name="Abdominal" placeholder="Abdominal" type="text" className=" my-input peer" />
                            <span className="span-input">Abdominal</span>
                        </label>
                        <label htmlFor="Coxa" className="label-input relative">
                            <input onChange={handleMetriInput} name="Coxa" placeholder="Coxa" type="text" className=" my-input peer" />
                            <span className="span-input">Coxa</span>
                        </label>
                    </div>
                </div>
            </div>
            <button className="my-btn" onClick={handleCalc}>Calcular</button>
        </form>
    )
}
export default JacksonEPollock;
