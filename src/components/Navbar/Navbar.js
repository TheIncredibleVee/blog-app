import React, {useContext,useEffect,useState} from 'react'
import '@themesberg/flowbite';
import { UserContext } from '../../context/userContext';
import {Link} from 'react-router-dom'
import { PathContext } from '../../context/pathContext';



const Navbar = () => {
    const {isLoggedIn, signOut, authError} = useContext(UserContext);
    const {path, setPath} = useContext(PathContext);

    const active="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-white";
    const inActive="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700";
    const handleLogin = () => {
    }


    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-gray-800 fixed w-full">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex">
            <svg className="h-10 mr-3" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z" fill="#76A9FA"/><path d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z" fill="#A4CAFE"/><path d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z" fill="#1C64F2"/></svg>
            <span className="self-center text-lg font-semibold whitespace-nowrap text-white">BlogApp</span>
        </Link>
        <div className="flex md:order-2">
            {isLoggedIn && !authError?<Link to="/" onClick={(e)=>setPath('/')}><button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 bg-red-600 hover:bg-red-700 focus:ring-red-800" onClick={signOut}>Logout</button></Link>:<Link to="/login" onClick={(e)=>setPath('/login')}><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" onClick={handleLogin}>Login</button></Link>}
            <button data-collapse-toggle="mobile-menu-4" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="mobile-menu-4" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
                <Link to="/" className={path==='/'?active:inActive } aria-current="page" onClick={(e)=>setPath('/')}>Home</Link>
            </li>
            <li>
                <Link to="/dashboard" className={path==='/dashboard'?active:inActive} onClick={(e)=>setPath('/dashboard')}>Dashboard</Link>
            </li>
            <li>
                <Link to="/login" className={path==='/login'?active:inActive} onClick={(e)=>setPath('/login')}>Login</Link>
            </li>
            <li>
                <Link to="/" className={path==='/contact'?active:inActive}>Contact</Link>
            </li>
            </ul>
        </div>
        </div>
        </nav>

    )
}

export default Navbar
