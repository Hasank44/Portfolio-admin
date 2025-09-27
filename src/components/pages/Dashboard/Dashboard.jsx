import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { Data } from "../../../context/DataProvider";
const Dashboard = () => {
  const {
    home, about, qualification, skill, project, service, achievement, achieve, contact, footer
  } = useContext(Data);
  const totalAchieve = achievement.length + achieve.length;
  const totalContact = contact.length + footer.length;
  
  // contact length
 const [todayContact, setTodayContact] = useState([]);
  useEffect(() => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];

    const filtered = contact.filter(item => {
      const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
      return itemDate === todayDate;
    });

    setTodayContact(filtered);
  }, [contact]);

  // footer length
  const [todayNews, setTodayNews] = useState([]);
  useEffect(() => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    
    const filtered = footer.filter(item => {
      const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
      return itemDate === todayDate;
    });
    
    setTodayNews(filtered);
  }, [footer]);
  const newMessage = todayContact.length + todayNews.length;
  const total = home.length + about.length + qualification.length + skill.length + project.length + service.length + totalAchieve + totalContact;
  
  
  const cards = [
    { title: "Total", value: total, link: '/' },
    { title: "Home", value: home.length, link: '/home'},
    { title: "About", value: about.length, link: '/about' },
    { title: "Qualification", value: qualification.length, link: '/qualification' },
    { title: "Skill", value: skill.length, link: '/skill' },
    { title: "Projects", value: project.length, link: '/project' },
    { title: "Services", value: service.length, link: '/service' },
    { title: "Achievement", value: totalAchieve, link:'/achievement' },
    { title: "New Messages", value: newMessage, link: '/contact'},
    { title: "Messages", value: totalContact, link: '/contact' },
  ];
  
  return (
    <div className="px-1 py-5 w-full">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition duration-300 text-center"
          >
            <h2 className="text-lg font-semibold text-gray-300">{card.title}</h2>
            <p className="text-2xl font-bold text-green-500 mt-2">{card.value}</p>
            <Link to={card.link} className="px-5 py-0.5 bg-blue-700 hover:bg-blue-600 rounded-md">Go</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
