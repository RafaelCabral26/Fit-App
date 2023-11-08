import React from "react";

function CheckSvg({spanText}:{spanText:string}) {
    return (
        <div className="flex grow-0 shrink-0 basis-5 ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#000"
                viewBox="0 0 24 24"
                className="grow-0 shrink-0 basis-6"
            >
                <path
                    stroke="#e24f00"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 12.611L8.923 17.5 20 6.5"
                ></path>
            </svg>
            <p className="font-serif font-thin text-neutral-600">{spanText}</p>
        </div>
    );
}

export default CheckSvg;
