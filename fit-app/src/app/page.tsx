'use client'

import BoardSvg from "@/svgs/board"
import CheckSvg from "@/svgs/checkSvg"
import DumbbellSvg from "@/svgs/dumbbell"
import TapeSvg from "@/svgs/tape"


export default function MyPage() {

    return (
        <div className="w-full bg-neutral ">
            <div className='absolute top-0 right-0 z-0 scale-x-[-1]  w-full h-screen bg-no-repeat bg-cover bg-center bg-[url("../../public/teste-6.JPG")]' >
            </div>
            <section className="relative   h-[calc(100vh-3rem)] grid  xl:gap-y-12 2xl:gap-y-20 text-white w-full  grid-cols-12 grid-rows-6 ">
                <div className="place-self-center col-start-2 xl:col-start-2 2xl:col-start-2 col-span-12 sm:col-span-10 lg:col-span-6 xl:col-span-8 2xl:col-span-6  row-start-2 sm:col-start-2 lg:col-start-2 xl:row-start-3  ">
                    <span className="my-landing-text">Cuide de seu
                        <span className="my-landing-text text-secondary mx-4"> Corpo</span>
                    </span>
                    <span className="my-landing-text">Aprimore sua
                        <span className="my-landing-text text-secondary mx-4"> Rotina</span>
                    </span>
                </div>
                <div className="col-start-2 md:col-start-2 xl:col-start-2 row-start-3 xl:row-start-4 col-span-9 md:col-span-6 xl:col-span-4 ">
                    <span className="text-white font-serif text-sm  2xl:text-xl ">
                        Conheça as melhores ferramentas de monitoramento de rotina,  progresso e saúde. Acompanhe o
                        seu progresso e de seus clientes de
                        forma simples e organizada.
                        <br />
                    </span>
                </div>
                <div className="place-self-end justify-self-start md:place-self-start col-start-2  col-span-6  row-start-4 xl:row-start-5 ">
                    <button className="btn btn-secondary xl:btn-wide rounded-sm">Saiba Mais</button>
                </div>
            </section>
            <Section2></Section2>
            <Section3></Section3>
            <Section4></Section4>
        </div>
    )
}
const Section2 = () => {
    return (
        <section className="container  md:h-[50vh] bg-neutral flex  flex-col md:flex-row  m-auto ">

            <div className="flex self-center   flex-col md:flex-row  items-baseline gap-10 md:gap-0 ">
                <div className="flex flex-col gap-2 ">
                    <div className="flex  w-full justify-around h-40">
                        <div className="w-[64px]   self-center text-primary mx-4 relative">
                            <DumbbellSvg></DumbbellSvg>
                        </div>
                        <div className="self-center flex flex-col items-start basis-[45%]">
                            <span className="text-lg text-white font-bold font-sans">TREINAMENTO <br />PERSONALIZADO</span>
                            <span className="text-md text-primary font-semibold font-mono uppercase">Acelere seu progresso e de seus clientes.</span>
                        </div>
                    </div>
                    <div className="w-[90%] my-4 m-auto h-1 border-b-2 border-secondary/50 "></div>
                    <span className="text-center text-neutral-400 m-4 font-serif ">Nosso software de criação de planilhas de treinos para academia representam uma ferramenta valiosa para  treinadores e atletas, tornando o treinamento mais eficiente e personalizado. </span>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex  w-full justify-around h-40 ">
                        <div className="w-[64px]   self-center text-primary mx-4 relative">
                            <BoardSvg></BoardSvg>
                        </div>
                        <div className="self-center flex flex-col items-start basis-[45%]">
                            <span className="text-lg text-white font-bold font-sans"> VARIEDADE DE EXERCÍCIOS</span>
                            <span className="text-md text-primary font-semibold font-mono uppercase">CONSULTE OU CRIE<br /> SEUS EXERCÍCIOS</span>
                        </div>
                    </div>
                    <div className="w-[90%] my-4 m-auto h-1 border-b-2 border-secondary/50 "></div>
                    <span className="text-center  text-neutral-400 m-4 font-serif ">A variedade é a chave para manter o interesse e a motivação durante o treinamento.  Disponibilizamos uma ampla gama de exercícios, permitindo que os clientes explorem diferentes modalidades e técnicas.</span>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex  w-full justify-around h-40 ">
                        <div className="w-[64px]  self-center text-primary mx-4 relative">
                            <TapeSvg></TapeSvg>
                        </div>
                        <div className="self-center flex flex-col items-start basis-[45%]">
                            <span className="text-lg text-white  font-bold font-sans">MONITORE A <br /> SUA EVOLUÇÃO</span>
                            <span className="text-md text-primary font-semibold font-mono uppercase">ACOMPANHE A EVOLUÇÃO DE CARGAS E MEDIDAS</span>
                        </div>
                    </div>
                    <div className="w-[90%] md:my-4 m-auto h-1 border-b-2 border-secondary/50 "></div>
                    <span className="text-center  text-neutral-400 m-4 font-serif ">A possibilidade de registrar e acompanhar o progresso  é uma ferramenta valiosa. Isso permite que atletas e treinadores avaliem o desempenho, identifiquem áreas de melhoria e ajustem os planos de treino de acordo.</span>
                </div>
            </div>
        </section>
    )
}

const Section3 = () => {

    return (
        <section className="w-full bg-white p-4 text-black">
            <div className="container  m-auto lg:flex my-4 ">
                <div className="max-w-xl lg:max-w-2xl py-14 md:p-14 ">
                    <p className="text-lg text-primary font-semibold font-mono uppercase">Fit & App</p>
                    <p className="text-2xl text-neutral font-semibold font-mono uppercase my-4">POR QUE ESCOLHER TREINAR COM O FIT&APP?</p>
                    <div id="divisor" className="flex gap-2 ">
                        <div className="h-1 w-10 border-b-2 border-secondary"></div>
                        <div className="h-1 w-4 border-b-2 border-secondary/70"></div>
                    </div>
                    <p className="uppercase my-4 text-lg text-neutral font-semibold">Aplicativo de criação de planilhas de treino pode ser uma ferramenta valiosa para ajudá-lo a atingir seus objetivos.</p>
                    <p className="font-serif font-thin text-neutral-600">Você está pronto para levar seus treinos na academia a um novo patamar? Se você busca maximizar seus resultados, manter-se motivado e aproveitar ao máximo o seu tempo na academia, um aplicativo de planilha de treino é a ferramenta que você precisa.</p>
                    <div className="flex flex-col gap-3 my-4">
                        <CheckSvg spanText="Crie rapidamente planilhas de treino personalizadas." />
                        <CheckSvg spanText="Projetado para ser intuitivo e fácil de usar." />
                        <CheckSvg spanText="Oferecemos uma ampla gama de exercícios para escolher." />
                        <CheckSvg spanText="Acesse facilmente os registros de treino anteriores." />
                        <CheckSvg spanText="Compartilhar planilhas de treino de forma rápida e fácil." /> </div>
                    <button className="btn btn-secondary rounded-sm xl:w-60">Registre-se agora!</button>
                </div>
                <div className="w-[100%]  m-auto  ">
                    <div className='w-full top-0 right-0 z-0  h-[70vh] lg:h-[60vh]  bg-no-repeat bg-cover bg-center  bg-[url("../../public/teste-7-removebg-preview.png")]'></div>
                </div>
            </div>
        </section>
    )
}

const Section4 = () => {
    return (
        <section>
            Testeee
        </section>
    )
}
