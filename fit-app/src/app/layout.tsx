
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { GlobalProvider } from '@/services/GlobalContext'
import { MyToast } from '@/services/MyToast'
import Head from 'next/head'
import { Josefin_Sans, Source_Sans_3 } from 'next/font/google'

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
    children: React.ReactNode
}) {

    return (
        <html lang="pt-br" data-theme="mytheme" className={`${Josefin.variable} ${SourceSans.variable} font-mono`}>
            <Head>
                <meta charSet='utf-8' />
            </Head>
            <body className={`h-screen bg-white font-normal  overflow-x-hidden relative`}>
                <GlobalProvider>
                    <Navbar></Navbar>
                    <div className="">
                        <MyToast></MyToast>
                        {children}
                    </div>
                </GlobalProvider>
            </body>
        </html>
    )
}


