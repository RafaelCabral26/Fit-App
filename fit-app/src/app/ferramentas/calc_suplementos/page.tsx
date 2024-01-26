"use client"
import React from 'react'

export default function CalcSuplementos() {
const [calcInput, setCalcInput] = React.useState({
        pesoWhey:0,
        quantidade_porcao:0,
        quantidade_proteina:0
    });
  return (
    <div className='container m-auto flex justify-center'>
            <form className='my-form-modal  flex flex-col gap-4'>
                <h1>Calculadora de Whey</h1>
                <span>Realize o cálculo de custo-benefício do seu Whey Protein.</span>
                    <label htmlFor="pesoWhey" className="label-input relative">
                        <input name="pesoWhey" placeholder="Peso Total do Whey(gramas)"  type="text" className=" my-input peer" />
                        <span className="span-input">Peso Total do Whey(gramas)</span>
                    </label>
                    <label htmlFor="quantidade_porcao" className="label-input relative">
                        <input name="quantidade_porcao" placeholder="Quantidade porção(gramas)"  type="text" className=" my-input peer" />
                        <span className="span-input">Quantidade porção(gramas)</span>
                    </label>
                    <label htmlFor="quantidade_proteina" className="label-input relative">
                        <input name="quantidade_proteina" placeholder="Quantidade proteina(gramas)"  type="text" className=" my-input peer" />
                        <span className="span-input">Quantidade proteina(gramas)</span>
                    </label>
                    <label htmlFor="valor_produto" className="label-input relative">
                        <input name="valor_produto" placeholder="Valor do Produto"  type="text" className=" my-input peer" />
                        <span className="span-input">Valor do Produto</span>
                    </label>
                <div className='text-xl'>
                   <span>Pureza do produto:</span> 
                    <span>Teste</span>
                </div>
            </form>
    </div>
  )
}
