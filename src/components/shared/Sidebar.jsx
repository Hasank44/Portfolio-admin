import { MdOutlineDashboard, MdHistory, MdContactless, MdConnectWithoutContact  } from "react-icons/md";
import { Link, useNavigate } from 'react-router';
import { useContext } from "react";
import { Message } from "../../context/MessageContext";
import { MdHome } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { FaToolbox, FaBox } from "react-icons/fa6";
import { FaParachuteBox } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { GrAchievement } from "react-icons/gr";
import { TiNews } from "react-icons/ti";

const Sidebar = () => {
  const { toast } = useContext(Message);

  const navigate = useNavigate();
  const Logout = () =>{
      localStorage.removeItem('auth_token');
      toast.success('Logout Success');
      setTimeout(()=>{
        window.location.reload();
        navigate('/admin/login');
      }, 3500);
  };

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
        <button
          onClick={Logout}
          className=" bg-red-700 hover:bg-red-800 font-semibold px-2.5 py-1 text-center mt-5 ml-10 rounded-md cursor-pointer"
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;