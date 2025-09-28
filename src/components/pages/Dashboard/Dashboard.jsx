import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { Data } from "../../../context/DataProvider";
import { Message } from "../../../context/MessageContext";
import { Update } from "../../../context/UpdateDataProvider";
const Dashboard = () => {
  const {
    logo ,home, about, qualification, skill, project, service, achievement, achieve, contact, footer
  } = useContext(Data);
  const { logoUpdate } = useContext(Update);
  const { toast } = useContext(Message);
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
  

// update modal
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  });
  const openUpdateModal = () => {
    const data = logo[0] || {};
    setFormData({
      name: data.name || "",
      image: data.image || ""
  });
    setIsUpdateOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = logo[0]._id;
      console.log(id)
      await logoUpdate(id, formData);
      closeUpdateModal();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="px-1 py-5 w-full">
      <div className="flex justify-between mb-6">
        <button
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm justify-end"
        >
          Add New
        </button>
        <button
          onClick={openUpdateModal}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm"
        >Update Logo</button>
      </div>
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

      {/* Update Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="relative bg-gray-800 p-6 rounded-md w-full max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">
              Update Navbar
            </h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block mb-1 text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Image</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className="px-4 py-2 bg-gray-500 rounded text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
