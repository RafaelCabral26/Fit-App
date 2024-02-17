"use client"

import { useState } from "react";
import JacksonEPollock from "./JacksonEPollock";

const ComposicaoCorporal = () => {
    const [methods, setMethod] = useState<"Jackson E Pollock" | "">();
    return (
        <div className="container m-auto flex flex-col">
            <form className="m-auto my-14">
                <select className="my-select w-96 ">
                    <option className="" hidden>Escolher Método... </option>
                    <option onClick={() => {setMethod("Jackson E Pollock")}}>Jackson E Pollock</option>
                </select>
            </form>
            {methods === "Jackson E Pollock" && <JacksonEPollock></JacksonEPollock>}
        </div>
    ) 
}

export default ComposicaoCorporal;
