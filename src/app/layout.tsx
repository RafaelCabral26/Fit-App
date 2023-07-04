import './globals.css'
import { Navbar } from '@/components/Navbar'


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
        <html lang="en" data-theme="corporate">
            <body>
                <Navbar></Navbar>
                <div className='container m-auto'>
                    {children}
                </div>
            </body>
        </html>
    )
}


