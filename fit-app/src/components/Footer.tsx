"use client"

import WhatsAppSvg from "@/svgs/whatsappSvg"
import Link from "next/link"

 export const Footer = () => {
  return (
    <footer  className="h-28 mt-14  flex flex-col items-center justify-center w-full bg-primary text-white font-sans  ">
      <div className="flex text-lg justify-center items-center">
        Entre em Contato:
        <Link href="https://wa.me/5521988357489">
          <WhatsAppSvg />
        </Link>
      </div>
      <span>© 2023 - Fit & App  | Website by Rafael Cabral</span>
    </footer>
  )
}
