'use client'

import ArrowSvg from "@/svgs/arrowSvg"
import BoardSvg from "@/svgs/board"
import CheckSvg from "@/svgs/checkSvg"
import DumbbellSvg from "@/svgs/dumbbell"
import SmallDumbbellSvg from "@/svgs/smallDumbbell"
import TapeSvg from "@/svgs/tape"
import WhatsAppSvg from "@/svgs/whatsappSvg"
import Image from "next/image"
import Link from "next/link"
import { SetStateAction, useState } from "react"


export default function MyPage() {

    return (
        <div className="w-full  ">
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
                    <a href="#section3" className="btn btn-secondary xl:btn-wide rounded-sm">Saiba Mais</a>
                </div>
            </section>
            <Section2></Section2>
            <Section3></Section3>
            <Section4></Section4>
            <Footer></Footer>
        </div>
    )
}
const Section2 = () => {
    return (
        <section className="container my-20  md:h-[50vh]  flex  flex-col md:flex-row  m-auto ">

            <div className="flex self-center   flex-col md:flex-row  items-baseline gap-10 md:gap-0 ">
                <div className="flex flex-col gap-2 ">
                    <div className="flex  w-full justify-around h-40">
                        <div className="w-[64px]   self-center text-secondary mx-4 relative">
                            <DumbbellSvg></DumbbellSvg>
                        </div>
                        <div className="self-center flex flex-col items-start basis-[45%]">
                            <span className="text-lg text-neutral-500 font-bold font-sans">TREINAMENTO <br />PERSONALIZADO</span>
                            <span className="text-md text-secondary font-semibold font-mono uppercase">Acelere seu progresso e de seus clientes.</span>
                        </div>
                    </div>
                    <div className="w-[90%] my-4 m-auto h-1 border-b-2 border-neutral-500/50 "></div>
                    <span className="text-center text-neutral-500 m-4 font-serif ">Nosso software de criação de planilhas de treinos para academia representam uma ferramenta valiosa para  treinadores e atletas, tornando o treinamento mais eficiente e personalizado. </span>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex  w-full justify-around h-40 ">
                        <div className="w-[64px]   self-center text-secondary mx-4 relative">
                            <BoardSvg></BoardSvg>
                        </div>
                        <div className="self-center flex flex-col items-start basis-[45%]">
                            <span className="text-lg text-neutral-500 font-bold font-sans"> VARIEDADE DE EXERCÍCIOS</span>
                            <span className="text-md text-secondary font-semibold font-mono uppercase">CONSULTE OU CRIE<br /> SEUS EXERCÍCIOS</span>
                        </div>
                    </div>
                    <div className="w-[90%] my-4 m-auto h-1 border-b-2 border-neutral-500/50 "></div>
                    <span className="text-center  text-neutral-500 m-4 font-serif ">A variedade é a chave para manter o interesse e a motivação durante o treinamento.  Disponibilizamos uma ampla gama de exercícios, permitindo que os clientes explorem diferentes modalidades e técnicas.</span>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex  w-full justify-around h-40 ">
                        <div className="w-[64px]  self-center text-secondary mx-4 relative">
                            <TapeSvg></TapeSvg>
                        </div>
                        <div className="self-center flex flex-col items-start basis-[45%]">
                            <span className="text-lg text-neutral-500  font-bold font-sans">MONITORE A <br /> SUA EVOLUÇÃO</span>
                            <span className="text-md text-secondary font-semibold font-mono uppercase">ACOMPANHE A EVOLUÇÃO DE CARGAS E MEDIDAS</span>
                        </div>
                    </div>
                    <div className="w-[90%] md:my-4 m-auto h-1 border-b-2 border-neutral-500/50 "></div>
                    <span className="text-center  text-neutral-500 m-4 font-serif ">A possibilidade de registrar e acompanhar o progresso  é uma ferramenta valiosa. Isso permite que atletas e treinadores avaliem o desempenho, identifiquem áreas de melhoria e ajustem os planos de treino de acordo.</span>
                </div>
            </div>
        </section>
    )
}

const Section3 = () => {

    return (
        <section id="section3" className="w-full bg-primary p-4 ">
            <div className="container  m-auto lg:flex my-4 ">
                <div className="max-w-xl xl:max-w-2xl py-14 md:p-14 ">
                    <p className="text-lg text-secondary font-semibold font-mono uppercase">Fit & App</p>
                    <p className="text-2xl text-neutral-200 font-semibold font-mono uppercase my-4">POR QUE ESCOLHER TREINAR COM O FIT&APP?</p>
                    <div id="divisor" className="flex gap-2 ">
                        <div className="h-1 w-10 border-b-2 border-secondary"></div>
                        <div className="h-1 w-4 border-b-2 border-secondary/70"></div>
                    </div>
                    <p className="uppercase my-4 text-lg text-neutral-400 font-semibold">Aplicativo de criação de planilhas de treino pode ser uma ferramenta valiosa para ajudá-lo a atingir seus objetivos.</p>
                    <p className="font-serif font-thin text-neutral-300">Você está pronto para levar seus treinos na academia a um novo patamar? Se você busca maximizar seus resultados, manter-se motivado e aproveitar ao máximo o seu tempo na academia, um aplicativo de planilha de treino é a ferramenta que você precisa.</p>
                    <div className="flex flex-col gap-3 my-4">
                        <CheckSvg spanText="Crie rapidamente planilhas de treino personalizadas." />
                        <CheckSvg spanText="Projetado para ser intuitivo e fácil de usar." />
                        <CheckSvg spanText="Oferecemos uma ampla gama de exercícios para escolher." />
                        <CheckSvg spanText="Acesse facilmente os registros de treino anteriores." />
                        <CheckSvg spanText="Compartilhar planilhas de treino de forma rápida e fácil." />

                    </div>
                    <a href="/planilha/construtor_planilha" className="btn btn-secondary rounded-sm xl:w-60">Teste agora!</a>
                </div>
                <div className="w-[100%]  m-auto  ">
                    <div className='w-full   top-0 right-0 z-0  h-[50vh] xl:h-[60vh]  bg-no-repeat bg-cover bg-center  bg-[url("../../public/teste-7-removebg-preview.png")]'></div>
                </div>
            </div>
        </section>
    )
}

const Section4 = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselItems = [
        {
            title: "Perca Peso",
            text: "A prática regular de exercícios é uma maneira eficaz de controlar o peso corporal, pois queima calorias e ajuda na manutenção de um peso saudável.",
            image: "/slide2.jpg"
        },
        {
            title: "Ganhe Força",
            text: "O treino de força é fundamental para o crescimento e forta- lecimento dos músculos, proporcionando maior resistência e definição muscular ao longo do tempo.",
            image: "/slide1.jpg"
        },
        {
            title: "Saúde em dia",
            text: "Estudos indicam que a prática regular de treino de força está associada a uma maior expectativa de vida, destacando os benefícios duradouros para a saúde.",
            image: "/slider-4.jpg"
        },
    ]

    const updateIndex = (newIndex: any) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= carouselItems.length) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
    };

    return (
        <section className="w-full  ">
            <div className="container m-auto my-20  ">
                <div className="w-full p-4 xl:pl-14 2xl:pl-24 m-auto ">
                    <p className="text-lg text-secondary font-semibold font-mono uppercase">construtor de planilhas de treino</p>
                    <p className="text-2xl text-neutral-500 font-semibold font-mono uppercase my-4">unindo tecnologia e saúde</p>
                    <div id="divisor" className="flex gap-2 ">
                        <div className="h-1 w-10 border-b-2 border-secondary"></div>
                        <div className="h-1 w-4 border-b-2 border-secondary/70"></div>
                    </div>
                </div>
                <div className="flex gap-2 float-right sm:hidden m-4">
                    <button type="button" onClick={() => {
                        updateIndex(activeIndex - 1);
                    }} className="flex justify-center items-center w-8 h-8 p-0 bg-secondary scale-[-1] rounded-sm">
                        <ArrowSvg></ArrowSvg>
                    </button>
                    <button type="button" onClick={() => {
                        updateIndex(activeIndex + 1);
                    }} className="flex justify-center items-center w-8 h-8 p-0 bg-secondary rounded-sm ">
                        <ArrowSvg></ArrowSvg>
                    </button>
                </div>



                <div className=" flex flex-col w-full justify-center overflow-hidden   gap-8 m-auto ">
                    <div id="inner" className="flex w-full whitespace-nowrap justify-start transition-transform   "
                        style={{
                            transform: `translate(-${activeIndex * 100}%)`
                        }}
                    >
                        {carouselItems.map((item: any, index: any) => {
                            return (
                                <div key={item.title} className="flex w-screen ">
                                    <div id="carousel-item" className="flex flex-col items-center w-screen sm:w-full m-auto pb-10  ">

                                        <div className=" items-center border-secondary border-[0.1px] border-opacity-30 ">

                                            <div id="image-container" className="relative w-[320px] sm:w-[210px] lg:w-[320px] h-[213.5px] sm:h-[187px] lg:h-[213.5px]  ">
                                                <Image src={`${item.image}`} width={0} height={0} sizes="100vw" className="w-full h-auto" alt="foto halteres"></Image>
                                            </div>
                                            <div className="relative h-1 flex justify-center ">
                                                <div className="absolute bg-secondary text-neutral-700   w-10 h-10 self-center">
                                                    <SmallDumbbellSvg></SmallDumbbellSvg>
                                                </div>
                                            </div>
                                            <div className="relative flex flex-col gap-3 text-center items-center my-10">
                                                <div className="w-16 relative self-center text-opacity-100">
                                                </div>
                                                <span className="text-neutral-600 text-center font-serif text-lg  2xl:text-xl uppercase">{item.title}</span>
                                                <p className="w-60 sm:w-36 lg:w-60 whitespace-normal text-neutral-500 m-4 font-serif ">{item.text}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
const Footer = () => {
    return (
        <section id="footer" className="flex flex-col items-center justify-center w-full bg-primary text-white font-sans  ">
            <div className="flex text-lg justify-center items-center">
                Entre em Contato:
                <Link href="https://wa.me/5521988357489">
                    <WhatsAppSvg />
                </Link>
            </div>
            <span>© 2023 - Fit & App  | Website by Rafael Cabral</span>
        </section>
    )
}
