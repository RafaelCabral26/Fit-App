'use client'

import { Footer } from "@/components/Footer"
import ArrowSvg from "@/svgs/arrowSvg"
import BoardSvg from "@/svgs/board"
import CheckSvg from "@/svgs/checkSvg"
import DumbbellSvg from "@/svgs/dumbbell"
import SmallDumbbellSvg from "@/svgs/smallDumbbell"
import TapeSvg from "@/svgs/tape"
import WhatsAppSvg from "@/svgs/whatsappSvg"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


export default function MyPage() {

  return (
    <div className="w-full  bg-gradient-to-b from-base-100 to-white    ">
      <div className='absolute top-0 right-0 z-0 scale-x-[-1]  w-full h-screen bg-no-repeat bg-cover bg-center bg-[url("../../public/photo1-woman.jpg")]' >
      </div>
      <section className="relative h-[calc(100vh-3rem)] w-full p-4 grid grid-cols-12  grid-rows-24    ">
        <div className="sm:col-start-2 lg:col-start-3 xl:col-start-3 row-start-4 row-span-2 xl:row-span-[6]   ">
          <p className="my-landing-text whitespace-nowrap ">
            <span className="my-landing-text ">
              Cuide de seu
            </span>
            <span className="my-landing-text whitespace-nowrap text-secondary mx-4"> Corpo</span>
          </p>
          <p className="my-landing-text whitespace-nowrap ">Aprimore sua
            <span className="my-landing-text text-secondary mx-4"> Rotina</span>
          </p>
        </div>
        <div className=" sm:col-start-2 md:col-start-2 lg:col-start-3 row-start-7 md:row-start-7 lg:row-start-8 col-span-8 sm:col-span-6 md:col-span-6 lg:col-span-4 ">
          <span className=" font-serif text-neutral-600 text-sm  2xl:text-xl ">
            Conheça as melhores ferramentas de monitoramento de rotina,  progresso e saúde. Acompanhe o
            seu progresso e de seus clientes de
            forma simples e organizada.
            <br />
          </span>
        </div>
        <div className="sm:col-start-2 md:col-start-2 lg:col-start-3 row-start-[12] md:row-start-10 lg:row-start-12 xl:row-start-12 col-span-6 ">
          <a href="#section3" className="my-btn !btn-md xl:btn-wide">Saiba Mais</a>
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
    <section className="container  my-20   flex flex-col sm:flex-row  m-auto ">
      <div className="flex self-center flex-col lg:flex-row items-baseline md:gap-36 ">
        <Section2Card title={"TREINAMENTO PERSONALIZADO"}
          subtitle={"Acelere seu progresso e de seus clientes."}
          text={"Nosso software de criação de planilhas de treinos para academia representam uma ferramenta valiosa para  treinadores e atletas, tornando o treinamento mais eficiente e personalizado."}
          svg={<DumbbellSvg></DumbbellSvg>} />

        <Section2Card title={"VARIEDADE DE EXERCÍCIOS"}
          subtitle={"CONSULTE OU CRIE SEUS EXERCÍCIOS"}
          text={"A variedade é a chave para manter o interesse e a motivação durante o treinamento.  Disponibilizamos uma ampla gama de exercícios, permitindo que os clientes explorem diferentes modalidades e técnicas."}
          svg={<BoardSvg></BoardSvg>} />

        <Section2Card title={"MONITORE A SUA EVOLUÇÃO"}
          subtitle={"ACOMPANHE A EVOLUÇÃO DE CARGAS E MEDIDAS"}
          text={"A possibilidade de registrar e acompanhar o progresso  é uma ferramenta valiosa. Isso permite que atletas e treinadores avaliem o desempenho, identifiquem áreas de melhoria e ajustem os planos de treino de acordo."}
          svg={<TapeSvg></TapeSvg>} />

      </div>
    </section>
  )
}

const Section2Card = ({ title, subtitle, text, svg }: { title: string, subtitle: string, text: string, svg: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 max-w-sm ">
      <div className="flex w-full justify-around h-40">
        <div className="w-[64px] self-center text-secondary mx-4 relative">
          {svg}
        </div>
        <div className="self-center flex flex-col items-start basis-[45%]">
          <span className="text-lg text-primary font-bold font-sans">{title}</span>
          <span className="text-md text-secondary font-semibold font-mono uppercase">{subtitle}</span>
        </div>
      </div>
      <div className="w-[90%] my-4 m-auto h-1 border-b-2 border-neutral-300/50 "></div>
      <span className="text-center text-neutral-600 m-4 font-serif ">{text}</span>
    </div>
  )
}

const Section3 = () => {

  return (
    <section id="section3" className="w-full p-4 text-black">
      <div className="container m-auto lg:flex my-4 ">
        <div className="max-w-xl xl:max-w-2xl py-14 md:p-14 ">
          <p className="text-lg text-secondary font-semibold font-mono uppercase">Fit & App</p>
          <p className="text-2xl text-neutral font-semibold font-mono uppercase my-4">POR QUE ESCOLHER TREINAR COM O FIT&APP?</p>
          <div id="divisor" className="flex gap-2 ">
            <div className="h-1 w-10 border-b-2 border-secondary"></div>
            <div className="h-1 w-4 border-b-2 border-secondary/70"></div>
          </div>
          <p className="uppercase my-4 text-lg text-neutral font-semibold">Aplicativo de criação de planilhas de treino pode ser uma ferramenta valiosa para ajudá-lo a atingir seus objetivos.</p>
          <p className=" font-serif text-neutral-600">Você está pronto para levar seus treinos na academia a um novo patamar? Se você busca maximizar seus resultados, manter-se motivado e aproveitar ao máximo o seu tempo na academia, um aplicativo de planilha de treino é a ferramenta que você precisa.</p>
          <div className="flex flex-col gap-3 my-4">
            <CheckSvg spanText="Crie rapidamente planilhas de treino personalizadas." />
            <CheckSvg spanText="Projetado para ser intuitivo e fácil de usar." />
            <CheckSvg spanText="Oferecemos uma ampla gama de exercícios para escolher." />
            <CheckSvg spanText="Acesse facilmente os registros de treino anteriores." />
            <CheckSvg spanText="Compartilhar planilhas de treino de forma rápida e fácil." />
          </div>
          <a href="/planilha/construtor_planilha" className="my-btn !btn-md xl:btn-wide">Teste agora!</a>
        </div>
        <div className="max-w-full xl:max-w-[120%] max-h-full m-auto ">
          <img src="/teste-7-removebg-preview.png" alt="teste" className="" />
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
      text: "O treino de força é fundamental para o crescimento e fortalecimento dos músculos, proporcionando maior resistência e definição muscular.",
      image: "/slide1.jpg"
    },
    {
      title: "Saúde em dia",
      text: "Estudos indicam que a prática regular de exercícios está associada a uma maior expectativa de vida, destacando os benefícios  para a saúde.",
      image: "/slider-4.jpg"
    },
  ]

  const updateIndex = (newIndex: any) => {
    if (newIndex < 0) {
      newIndex = 2;
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
          <p className="text-2xl text-neutral font-semibold font-mono uppercase my-4">unindo tecnologia e saúde</p>
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
        <div className=" flex flex-col w-full justify-center overflow-hidden gap-8 m-auto ">
          <div id="inner" className="flex w-full whitespace-nowrap justify-start transition-transform   "
            style={{
              transform: `translate(-${activeIndex * 100}%)`
            }}
          >

            {carouselItems.map((item: any, index: any) => {
              return (
                <div key={item.title} className="flex w-screen ">
                  <div id="carousel-item" className="flex flex-col items-center w-screen sm:w-full m-auto pb-10  ">
                    <div className="card rounded-md shadow-md w-full xl:w-96  items-center border-white border-[0.1px] border-opacity-30 ">
                      <figure id="image-container" className="w-full h-auto">
                        <Image src={`${item.image}`} width={0} height={0} sizes="100vw" className="w-full h-auto" alt="foto halteres"></Image>
                      </figure>
                      <div className="card-body max-w-fit pt-0 relative">
                        <div className=" w-10  self-center">
                          <SmallDumbbellSvg></SmallDumbbellSvg>
                        </div>
                        <h2 className="card-title ">{item.title}</h2>
                        <p className="whitespace-normal text-primary md:m-4 ">{item.text}</p>
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
