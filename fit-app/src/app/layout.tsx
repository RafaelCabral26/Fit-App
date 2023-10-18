import './globals.css'
import { Navbar } from '@/components/Navbar'
import {  GlobalProvider } from '@/services/GlobalContext'
import { MyToast } from '@/services/MyToast'
import Head from 'next/head'


export const metadata = {
    title: 'Fit-App',
    description: 'Fitness App',
}
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br" data-theme="corporate">
            <Head>
               <meta charSet='utf-8'/> 
            </Head>
            <body className='h-screen overflow-x-hidden relative'>
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


