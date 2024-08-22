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
  const [wheyPrice, setWheyPrice] = useState<number>();
  const [calcInput, setCalcInput] = React.useState<TCalcSuplementos>({
    pesoWhey: 0,
    quantidade_porcao: 0,
    quantidade_proteina: 0,
    valor_produto: 0
  });

  const handleCalcInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;
    console.log("VALUE", name);
    if (name === "valor_produto") {
      value = value.replace(/,/g, '.');
    }
    setCalcInput((prev: TCalcSuplementos) => {
      return { ...prev, [name]: value };
    })
  }
  useEffect(() => {
    if (calcInput.quantidade_proteina > 0 && calcInput.quantidade_porcao > 0) {
      const whey = (calcInput.quantidade_proteina / calcInput.quantidade_porcao) * 100;
      return setWheyPurity(Number(whey.toFixed(1)));
    }
    setWheyPurity(0);
  }, [calcInput.quantidade_proteina, calcInput.quantidade_porcao])

  useEffect(() => {
    if (wheyPurity > 0) {
      const total = (calcInput.pesoWhey / 100) * wheyPurity;
      setTotalProtein(total);
    }
  }, [calcInput.pesoWhey, wheyPurity])
  useEffect(() => {
    const calcPrice = (calcInput.valor_produto / totalProtein) * 100;
    setWheyPrice(calcPrice);
  }, [calcInput.valor_produto, totalProtein])

  return (
    <>

      <div className="flex shrink-0 flex-col justify-center items-center h-[23vh]  w-screen bg-gradient-to-b from-secondary -mt-14 to-[#ffa255] ">
        <h1 className="my-landing-text  text-white">Calculadora de Whey</h1>
        <p className="font-thin text-white">Realize o cálculo de custo-benefício do seu Whey Protein.</p>
      </div>
      <div className='container m-auto flex justify-center h-screen '>
        <form className='my-form w-[100vw] max-w-lg shadow-lg h-fit my-14 p-8 rounded-md '>
          <label htmlFor="pesoWhey" className="label-input relative">
            <input onChange={handleCalcInput} name="pesoWhey" placeholder="Peso Total do Whey(gramas)" type="text" className=" my-input peer" />
            <span className="span-input">Peso Total do Whey(gramas)</span>
          </label>
          <label htmlFor="quantidade_porcao" className="label-input relative">
            <input onChange={handleCalcInput} name="quantidade_porcao" placeholder="Quantidade porção(gramas)" type="text" className=" my-input peer" />
            <span className="span-input">Quantidade porção(gramas)</span>
          </label>
          <label htmlFor="quantidade_proteina" className="label-input relative">
            <input onChange={handleCalcInput} name="quantidade_proteina" placeholder="Quantidade proteina por porção(gramas)" type="text" className=" my-input peer" />
            <span className="span-input">Quantidade proteina por porção(gramas)</span>
          </label>
          <label htmlFor="valor_produto" className="label-input relative">
            <input onChange={handleCalcInput} name="valor_produto" placeholder="Valor do Produto(Ex:125,00)" type="text" className=" my-input peer" />
            <span className="span-input">Valor do Produto(Ex:125,00)</span>
          </label>
          <div className='flex gap-4 text-xl'>
            <span>Pureza do produto:</span>
            <span className='border-b-2 border-secondary'>{!isNaN(wheyPurity) ? wheyPurity + "%" : ""}</span>
          </div>
          <div className='flex gap-4 text-xl'>
            <span>Total de Proteina no Whey:</span>
            <span className='border-b-2 border-secondary'>{Math.round(totalProtein)}g</span>
          </div>
          <div className='flex gap-4 text-xl'>
            <span>Preço da Proteína por 100g:</span>
            <span className='border-b-2 border-secondary'>{wheyPrice ? "R$" + wheyPrice?.toFixed(2) : ""}</span>
          </div>
        </form>
      </div>
    </>
  )
}
