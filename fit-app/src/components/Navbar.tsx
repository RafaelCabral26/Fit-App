import { ProfileSvg } from "@/svgs/profilecircle"
export const Navbar = () => {
    return (

        <div className='navbar border-b-2  p-4 drop-shadow-sm'>
            <div className='container flex justify-between m-auto'>
                <div className='lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <div className='text-primary font-bold'>FitApp</div>
                <div className='flex items-center font-bold gap-4'>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className=" m-1 cursor-pointer hover:text-secondary">Planilha</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/planilha/criar_planilha">Minhas Planilhas</a></li>
                            <li><a>Nova Planilha</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="cursor-pointer"><ProfileSvg/></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
