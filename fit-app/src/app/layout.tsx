import { createContext } from 'vm'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { MyToast, GlobalProvider } from '@/services/MyToast'


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
        <html lang="en" data-theme="dark">
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


