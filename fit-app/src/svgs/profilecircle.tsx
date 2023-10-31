"use client"

import { usePathname } from "next/navigation"

export const ProfileSvg = () => {
    const myUrl = usePathname()
    return (
        <div className="flex">
            <svg
                width="28"
                height="28"
                viewBox="0 0 20 20">
                <g>
                    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="2">
                        <g fill={`${myUrl !== "/" ? "#000000" : "#ffffff" }`} transform="translate(-380 -2159)">
                            <g transform="translate(56 160)">
                                <path d="M334 2011c3.785 0 6.958 2.214 7.784 6h-15.568c.826-3.786 3.999-6 7.784-6m-4-6c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4m7.758 4.673A5.983 5.983 0 00340 2005a6 6 0 10-9.758 4.673c-3.659 1.375-6.242 4.772-6.242 9.327h20c0-4.555-2.583-7.952-6.242-9.327"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                width={32}
                height={32}
                className="self-end "
            >

                <path
                    fill="none"
                    fillRule="evenodd"
                    d="M6.293 8.793a1 1 0 011.414 0L12 13.086l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    className="fill-black"
                ></path>
            </svg>
        </div>
    )
}
