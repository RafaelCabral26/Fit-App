"use client"

import Image from "next/image"

const LoadingComponent = () => {
    return (
        <>
            <Image src={"/Spinner.svg"} alt="spinner" width={0} height={0} className="w-full h-auto" ></Image>
        </>
    )
}

export default LoadingComponent;
