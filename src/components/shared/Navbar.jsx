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

  return (
    <nav className='w-full h-auto items-center fixed top-0 z-50 b bg-gray-800'>
              <ToastContainer />
          <div className='w-full h-12 container mx-auto items-center justify-between flex'>
              <div className='flex gap-1 items-center'>
                  <img src={logo.image} className='w-8 rounded-full h-auto' alt="" />
                  <h1>Hasan</h1>
              </div>
              <h1 className=' text-[18px] sm:text-[22px] lg:text-3xl font-semibold'>Admin Dashboard</h1>
              <p className='hidden lg:block'></p>
              <button
                  className='lg:hidden text-2xl pr-3'
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