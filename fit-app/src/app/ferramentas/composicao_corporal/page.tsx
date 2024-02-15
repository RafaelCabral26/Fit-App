"use client"

import { useState } from "react";

const ComposicaoCorporal = () => {
    const [ points , setPoints] = useState<3 | 7>();
    return (
        <div className="container m-auto">
            <form className="my-form-modal">
                <label className="label gap-2 ">
                    <input className="checkbox focus:ring-transparent checkbox-secondary checkbox-sm rounded-sm" type="checkbox" checked={points === 3} onClick={() => setPoints(3)} />
                    <span className="label-text text-xs">Praticante</span>
                </label>
                <label className="label gap-2 ">
                    <input className="checkbox focus:ring-transparent checkbox-secondary checkbox-sm rounded-sm" type="checkbox" checked={points === 7} onChange={() => setPoints(7)} onClick={() => setPoints(7)} />
                    <span className="label-text text-xs">Praticante</span>
                </label>
                <input type="checkbox" className="checkbox-secondary" />
                <div className="">
                    <h1>Dobras</h1>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="Tricipital" className="label-input relative">
                                <input name="Tricipital" placeholder="Tricipital" type="text" className=" my-input peer" />
                                <span className="span-input">Tricipital</span>
                            </label>
                            <label htmlFor="Subescapular" className="label-input relative">
                                <input name="Subescapular" placeholder="Subescapular" type="text" className=" my-input peer" />
                                <span className="span-input">Subescapular</span>
                            </label>
                            <label htmlFor="Axilar Média" className="label-input relative">
                                <input name="Axilar Média" placeholder="Axilar Média" type="text" className=" my-input peer" />
                                <span className="span-input">Axilar Média</span>
                            </label>
                            <label htmlFor="Bicipital" className="label-input relative">
                                <input name="Bicipital" placeholder="Bicipital" type="text" className=" my-input peer" />
                                <span className="span-input">Bicipital</span>
                            </label>
                            <label htmlFor="Torácica" className="label-input relative">
                                <input name="Torácica" placeholder="Torácica" type="text" className=" my-input peer" />
                                <span className="span-input">Torácica</span>
                            </label>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="Supra-Ilíaca" className="label-input relative">
                                <input name="Supra-Ilíaca" placeholder="Supra-Ilíaca" type="text" className=" my-input peer" />
                                <span className="span-input">Supra-Ilíaca</span>
                            </label>
                            <label htmlFor="Supra-Espinhal" className="label-input relative">
                                <input name="Supra-Espinhal" placeholder="Supra-Espinhal" type="text" className=" my-input peer" />
                                <span className="span-input">Supra-Espinhal</span>
                            </label>
                            <label htmlFor="Abdominal" className="label-input relative">
                                <input name="Abdominal" placeholder="Abdominal" type="text" className=" my-input peer" />
                                <span className="span-input">Abdominal</span>
                            </label>
                            <label htmlFor="Coxa" className="label-input relative">
                                <input name="Coxa" placeholder="Coxa" type="text" className=" my-input peer" />
                                <span className="span-input">Coxa</span>
                            </label>
                            <label htmlFor="Panturrilha Medial" className="label-input relative">
                                <input name="Panturrilha Medial" placeholder="Panturrilha Medial" type="text" className=" my-input peer" />
                                <span className="span-input">Panturrilha Medial</span>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ComposicaoCorporal;
