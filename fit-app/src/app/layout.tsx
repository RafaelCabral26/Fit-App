
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { GlobalProvider } from '@/services/GlobalContext'
import { MyToast } from '@/services/MyToast'
import Head from 'next/head'
import { Josefin_Sans, Source_Sans_3 } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { ReactElement } from 'react'

export const metadata = {
  title: 'Fit-App',
  description: 'Fitness App',

}

const Josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
})

const SourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sourcesans',
})
export default function RootLayout({
  children,
}: {
  children: ReactElement
}) {

  return (
    <html lang="pt-br" data-theme="mytheme" className={`flex flex-col grow-1 ${Josefin.variable} ${SourceSans.variable} font-mono scroll-smooth bg-white  `}>
      <Head>
        <meta charSet='utf-8' />
      </Head>
      <body className={` bg-white font-normal text-neutral-600  relative`}>
        <GlobalProvider>
          <Navbar></Navbar>
            <MyToast></MyToast>
            {children}
        </GlobalProvider>
        <Footer />
      </body>
    </html>
  )
}


