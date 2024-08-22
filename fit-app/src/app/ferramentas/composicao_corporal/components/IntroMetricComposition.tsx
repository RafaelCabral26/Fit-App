"use client"

const IntroMetricComposition = () => {
  return (
    <>
      <div className="flex shrink-0 flex-col justify-center items-center h-[33vh]  w-screen bg-gradient-to-b from-secondary to-[#ffa255] ">
        <h1 className="my-landing-text  text-white">Cálculo Densidade (Jackson & Pollock)</h1>
        <p className="font-thin text-white">Meça e calcule rapidamente sua % de gordura corporal, massa magra e massa gorda</p>
      </div>
      <div className="container max-w-4xl text-neutral-600 flex flex-col  gap-4 p-8  md:text-2xl">
        <h1>
          Objetivo
        </h1>
        <p>
          Estimar a porcentagem de gordura corporal com base em medições de gordura subcutânea.
        </p>
        <h1>
          Equipamento
        </h1>
        <p>
          Adipômetro
        </p>
        <h1>
          Procedimento
        </h1>
        <p>
          As medições são feitas no lado direito do corpo. O adipômetro deve estar perpendicular ao local analisado. O participante deve relaxar o grupo muscular que está sendo avaliado. Ao pinçar a prega cutânea, o profissional deve realizar a leitura no meio da pele pinçada, não no ápice ou na base. Espere 1 a 2 segundos após soltar o adipômetro e registre a medida mais próxima de 0,5 mm. Repita a medição em cada local para obter leituras precisas.
        </p>
        <ul className="list-disc self-center">
          <li><span className="underline">Tríceps</span> Prega vertical no ponto médio do lado posterior do tríceps, entre o ombro e o cotovelo, com o braço relaxado ao lado do corpo.</li>
          <li><span className="underline">Peito</span> Prega diagonal a meio caminho entre a linha axilar anterior e o mamilo.</li>
          <li><span className="underline">Subescapular</span> Prega diagonal a 2 cm do ângulo inferior da escápula.</li>
          <li><span className="underline">Linha axilar média</span> Na linha axilar média, horizontal ao processo xifoide do esterno.</li>
          <li><span className="underline">Suprailíaca</span> Prega diagonal paralela e superior à crista ilíaca.</li>
          <li><span className="underline">Abdômen</span> Prega vertical a 2 cm à direita do umbigo.</li>
          <li><span className="underline">Coxa</span> Ponto médio da parte anterior da coxa, entre a patela e o topo da coxa.</li>
        </ul>

      </div>
    </>
  )
}

export default IntroMetricComposition;
