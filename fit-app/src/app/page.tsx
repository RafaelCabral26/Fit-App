'use client'

import DumbbellSvg from "@/svgs/dumbbell"


export default function MyPage() {

    return (
        <>
            <div className='absolute top-0 right-0 z-0 scale-x-[-1]  w-full h-4/5 lg:h-[95%] 2xl:min-h-full  bg-no-repeat bg-cover bg-center bg-[url("../../public/teste-6.JPG")]' >
            </div>
            <section className="relative h-[75vh] lg:h-[85vh] 2xl:h-[95vh] grid  xl:gap-y-12 2xl:gap-y-20 text-white w-full  grid-cols-12 grid-rows-6 ">
                <div className="place-self-center col-start-2 xl:col-start-2 2xl:col-start-2 col-span-12 xl:col-span-8 2xl:col-span-6  row-start-2 xl:row-start-3  ">
                    <span className="my-landing-text">Cuide de seu
                        <span className="my-landing-text text-secondary mx-4"> Corpo</span>
                    </span>
                    <span className="my-landing-text">Aprimore sua
                        <span className="my-landing-text text-secondary mx-4"> Rotina</span>
                    </span>
                </div>
                <div className="col-start-2 md:col-start-2 xl:col-start-2 row-start-3 xl:row-start-4 col-span-9 md:col-span-6 xl:col-span-4 ">
                    <span className="text-white font-serif text-xs 2xl:text-2xl ">
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
        </>
    )
}
const Section2 = () => {
    return (

        <section className="container flex flex-col md:flex-row  m-auto ">
            <div className="flex flex-col md:flex-row items-center gap-3 ">
                <div className="flex  w-full justify-around">
                    <div className="w-[14%] h-20 self-center text-primary mx-4 relative">
                        <DumbbellSvg></DumbbellSvg>
                    </div>
                    <div className="flex flex-col items-start basis-[65%]">
                        <span className="text-xl  font-bold font-sans">TREINAMENTO <br />PERSONALIZADO</span>
                        <span className="text-lg text-primary font-semibold font-mono uppercase">Acelere seu progresso e de seus clientes.</span>
                    </div>
                </div>
                <div className="w-[90%] m-auto h-1 border-b-2 border-secondary/50 "></div>
                <span className="text-center font-serif ">Ao utilizar ferramentas para </span>
            </div>
        </section>
    )
}
