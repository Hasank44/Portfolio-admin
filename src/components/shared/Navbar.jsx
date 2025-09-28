import React, { useContext, useState } from 'react'
import { Data } from '../../context/DataProvider'
import { Message } from '../../context/MessageContext';
import { MdMenuOpen, MdClose } from "react-icons/md";
import Sidebar from './Sidebar';

const Navbar = () => {
    const { ToastContainer } = useContext(Message);
    const { logo } = useContext(Data);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const navLogo = logo[0] || {};
  return (
    <nav className='w-full h-auto items-center fixed top-0 z-50 b '>
              <ToastContainer />
          <div className='w-full h-12 container mx-auto items-center justify-between flex bg-gray-800'>
              <div className='flex gap-1 items-center'>
                  <img src={navLogo.image} className='w-8 rounded-full h-auto' alt={ navLogo.name } />
                  <h1>{ navLogo.name }</h1>
              </div>
              <h1 className=' text-[18px] sm:text-[22px] lg:text-3xl font-semibold'>Admin Dashboard</h1>
              <p className='hidden lg:block'></p>
              <button
                  className='sm:hidden text-2xl pr-3'
                  onClick={toggleMenu}>
                  { isOpen ? <MdClose /> : <MdMenuOpen />}
              </button>
          </div>
          <div className={`${ isOpen ? 'block': 'hidden'}`}>
              <Sidebar />
          </div>
    </nav>
  )
}

export default Navbar