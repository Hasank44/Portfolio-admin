import { MdOutlineDashboard, MdHistory, MdContactless, MdConnectWithoutContact  } from "react-icons/md";
import { Link, useNavigate } from 'react-router';
import { useContext, useEffect, useRef } from "react";
import { Message } from "../../context/MessageContext";
import { MdHome } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { FaToolbox, FaBox } from "react-icons/fa6";
import { FaParachuteBox } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { GrAchievement } from "react-icons/gr";
import { TiNews } from "react-icons/ti";

const Sidebar = ({isOpen, setIsOpen}) => {
  const { toast } = useContext(Message);
  const getToken = localStorage.getItem('auth_token');
  const getHours = localStorage.getItem('currentHour');

  const navigate = useNavigate();
  const Logout = () =>{
      localStorage.removeItem('auth_token');
      localStorage.removeItem('currentHour');
      toast.success('Logout Success');
      setTimeout(()=>{
        window.location.reload();
        navigate('/admin/login');
      }, 3500);
  };

const sidebarRef = useRef();
useEffect(() => {
  if (!isOpen) return;
  const handleClickOutside = (event) => {
  if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
    setIsOpen(false);
  }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen]);

  const menus = [
    { title: 'Dashboard', icon: <MdOutlineDashboard />, link: '/' },
    { title: 'Home', icon: <MdHome />, link: '/home' },
    { title: 'About', icon: <FcAbout />, link: '/about' },
    { title: 'Qualification', icon: <FaToolbox />, link: '/qualification' },
    { title: 'Skill', icon: <FaBox />, link: '/skill' },
    { title: 'Project', icon: <FaParachuteBox />, link: '/project' },
    { title: 'Service', icon: <IoIosListBox />, link: '/service' },
    { title: 'Achievement', icon: <GrAchievement />, link: '/achievement' },
    { title: 'Contact', icon: <MdContactless />, link: '/contact' },
    { title: 'Contact Other', icon: <MdConnectWithoutContact />, link: '/contact/other' },
    { title: 'News Letter', icon: <TiNews />, link: '/newsletter' },
  ];

  return (
    <div
      ref={sidebarRef}
      className="w-52 h-auto bg-gray-900 rounded-r-md overflow-y-auto"
    >
      <ul className="py-5 px-3">
        {menus.map((menu) => (
          <li 
            key={menu.title}
            className="py-1"
          >
            <Link 
              to={menu.link}
              className="flex items-center gap-2 py-1 bg-[#111111] hover:bg-[#2d2c2c] rounded-md px-2 text-slate-200"
            >
              <span className="text-xl">{menu.icon}</span>
              <span>{menu.title}</span>
            </Link>
          </li>
        ))}
        {
          getToken && getHours ?
            <button
          onClick={Logout}
          className=" bg-red-700 hover:bg-red-800 font-semibold px-2.5 py-1 text-center mt-5 ml-10 rounded-md cursor-pointer"
        >
          Logout
            </button>
            :
            <Link
              className=" bg-green-700 hover:bg-green-800 font-semibold px-2.5 py-1 text-center mt-5 ml-10 rounded-md cursor-pointer"
              to={'/admin/login'}>
              Login
            </Link>
        }
      </ul>
    </div>
  );
};

export default Sidebar;