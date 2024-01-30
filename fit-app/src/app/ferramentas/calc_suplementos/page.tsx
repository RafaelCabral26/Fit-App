"use client"
import React, { useEffect, useState } from 'react'
type TCalcSuplementos = {
    pesoWhey: number,
    quantidade_porcao: number,
    quantidade_proteina: number,
    valor_produto: number
}
export default function CalcSuplementos() {
    const [wheyPurity, setWheyPurity] = useState<number>(0);
    const [totalProtein, setTotalProtein] = useState<number>(0);
    const [calcInput, setCalcInput] = React.useState<TCalcSuplementos>({
        pesoWhey: 0,
        quantidade_porcao: 0,
        quantidade_proteina: 0,
        valor_produto: 0
    });

    const handleCalcInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setCalcInput((prev: TCalcSuplementos) => {
            return { ...prev, [name]: value };
        })
    }
    useEffect(() => {
        console.log("wheyrrt");
        if (calcInput.quantidade_proteina > 0 && calcInput.quantidade_porcao > 0) {
            const whey = (calcInput.quantidade_proteina / calcInput.quantidade_porcao) * 100;
            return setWheyPurity(Number(whey.toFixed(1)));
        }
        setWheyPurity(0);
    }, [calcInput.quantidade_proteina, calcInput.quantidade_porcao])

    useEffect(() => {
        console.log(wheyPurity);
        if (wheyPurity > 0) {
            const total = (calcInput.pesoWhey/100)*wheyPurity;
            setTotalProtein(total);
        }
    },[calcInput.pesoWhey,wheyPurity])

    return (
        <div className='container m-auto flex justify-center'>
            <form className='my-form-modal  flex flex-col gap-4'>
                <h1>Calculadora de Whey</h1>
                <span>Realize o cálculo de custo-benefício do seu Whey Protein.</span>
                <label htmlFor="pesoWhey" className="label-input relative">
                    <input onChange={handleCalcInput} name="pesoWhey" placeholder="Peso Total do Whey(gramas)" type="text" className=" my-input peer" />
                    <span className="span-input">Peso Total do Whey(gramas)</span>
                </label>
                <label htmlFor="quantidade_porcao" className="label-input relative">
                    <input onChange={handleCalcInput} name="quantidade_porcao" placeholder="Quantidade porção(gramas)" type="text" className=" my-input peer" />
                    <span className="span-input">Quantidade porção(gramas)</span>
                </label>
                <label htmlFor="quantidade_proteina" className="label-input relative">
                    <input onChange={handleCalcInput}  name="quantidade_proteina" placeholder="Quantidade proteina por porção(gramas)" type="text" className=" my-input peer" />
                    <span className="span-input">Quantidade proteina por porção(gramas)</span>
                </label>
                <label htmlFor="valor_produto" className="label-input relative">
                    <input onChange={handleCalcInput} name="valor_produto" placeholder="Valor do Produto(Ex:125,00)" type="text" className=" my-input peer" />
                    <span className="span-input">Valor do Produto(Ex:125,00)</span>
                </label>
                <div className='text-xl'>
                    <span>Pureza do produto:</span>
                    <span>{!isNaN(wheyPurity) ? wheyPurity + "%" : ""}</span>
                </div>
                <div>
                    <span>Total de Proteina no Whey:</span>
                    <span>{Math.round(totalProtein)}g</span>
                </div>
            </form>
        </div>
    )
}
