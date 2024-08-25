"use client"

import { usePathname } from "next/navigation"

export const ProfileSvg = () => {
    const myUrl = usePathname()
    return (
        <>
            <svg
                className={`flex fill-current`}
                viewBox="0 0 20 20">
                <g className="">
                    <g fill="currentColor" fillRule="evenodd" stroke="none" strokeWidth="2">
                        <g   transform="translate(-380 -2159)">
                            <g transform="translate(56 160)">
                                <path d="M334 2011c3.785 0 6.958 2.214 7.784 6h-15.568c.826-3.786 3.999-6 7.784-6m-4-6c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4m7.758 4.673A5.983 5.983 0 00340 2005a6 6 0 10-9.758 4.673c-3.659 1.375-6.242 4.772-6.242 9.327h20c0-4.555-2.583-7.952-6.242-9.327"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </>
    )
}
