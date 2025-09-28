import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'
import { Update } from '../../../context/UpdateDataProvider';
import { Delete } from '../../../context/DeleteProvider';
import { Message } from '../../../context/MessageContext';
import { Post } from '../../../context/PostDataProvider';

const Skill = () => {
  const { skill, setSkill } = useContext(Data);
  const { skillPost } = useContext(Post);
  const { skillUpdate, skillToggle } = useContext(Update);
  const { skillDelete } = useContext(Delete);
  const { toast } = useContext(Message);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const openModal = (item) => setSelectedSkill(item);
  const closeModal = () => setSelectedSkill(null);

  // update modal
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [formData, setFormData] = useState({
      title: "",
      icon: "",
      type: ""
    });
  
    const [selectedData, setSelectedData] = useState(null);
    const openUpdateModal = (data) => {
      setFormData({
        title: data.title || "",
        icon: data.icon || "",
        type: data.type || "",
      });
      setSelectedData(data);
      setIsUpdateOpen(true);
    };
  
    const closeUpdateModal = () => {
      setIsUpdateOpen(false);
      setSelectedData(null);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const id = selectedData._id;
        await skillUpdate(id, formData);
        closeUpdateModal();
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };

  // delete
  const currentId = (id, data ) => {
    const confirmDelete = window.confirm(`Are You Sure Delete ${data}`);
    if (confirmDelete) {
      skillDelete(id);
    }
  };
  
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(skill.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSkills = skill.slice(startIndex, startIndex + itemsPerPage);

  // enable toggle
  const handleToggle = async (id, currentStatus) => {
    setSkill(prev =>
      prev.map(p =>
      p._id === id ? { ...p, isEnable: !currentStatus } : p
    )
  );
  try {
    await skillToggle(id, !currentStatus);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    setSkill(prev =>
      prev.map(p =>
        p._id === id ? { ...p, isEnable: currentStatus } : p
      )
    );
  };
  };
  
  // add new data
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  const openPostModal = () => {
    setIsOpenPostModal(true)
  }
  const closePostModal = () => {
    setIsOpenPostModal(false);
  };
  const [newData, setNewData] = useState({
    icon: "",
    title: "",
    type: ""
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

const postNewData = (e) => {
  e.preventDefault();
  if (newData.icon && newData.title && newData.type) {
    skillPost(newData);
    setNewData({
      icon: "",
      title: "",
      type: ""
    });
    setTimeout(() => {
      setIsOpenPostModal(false);
    }, 1500);
  } else {
    skillPost(newData);
  }
};

  return (
    <div className="w-full px-1 py-5">
      <div className="w-full right-0 pb-3">
        <button
          onClick={openPostModal}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm justify-end"
        >
          Add New
        </button>
      </div>
      <div className="flex flex-col w-full space-y-3">
        {currentSkills.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-700 rounded-lg px-3 py-2 w-full space-y-2 sm:space-y-0 sm:flex justify-between items-center"
          >
            <div className='flex items-center gap-2'>
              <img src={item.icon} alt={item.title} className="w-8 h-auto " />
              <h2 className="text-white font-semibold">{item.title}</h2>
              <p className="text-gray-400 text-sm">{item.type}</p>
              <button
              onClick={() => handleToggle(item._id, item.isEnable)}
              className={`w-8 h-4 flex items-center rounded-full p-1 transition-colors duration-300 ${
              item.isEnable ? "bg-green-500" : "bg-gray-600"
              }`}
                >
              <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              item.isEnable ? "translate-x-3" : "translate-x-0"
              }`}
            ></div>
            </button>
            </div>
            <div className='space-x-3'>
              <button 
                onClick={() => openModal(item)} 
                className="px-1 py-1 bg-gray-500 rounded-md font-semibold text-sm"
              >
                View
              </button> 
              <button 
                onClick={()=> openUpdateModal(item)}
                className="px-1 py-1 bg-amber-500 rounded-md font-semibold text-sm"
              >
                Update
              </button> 
              <button 
                onClick={()=> currentId(item._id, item.title)}
                className="px-1 py-1 bg-red-500 rounded-md font-semibold text-sm"
              >
                Delete
              </button> 
            </div>
          </div>
        ))}
      </div>
          
      {/* Pagination */}
      <div className="flex justify-center items-center space-x-3 m-5">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-3 py-1 rounded-md text-white ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          Prev
        </button>
        
        <span className="text-white font-medium">
          Page {currentPage} of {totalPages}
        </span>
        
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-3 py-1 rounded-md text-white ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          Next
        </button>
      </div>  

      {/* Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[350px] max-w-[90%] text-white space-y-3">
            <div className="flex flex-col items-center space-y-2">
              <img src={selectedSkill.icon} alt={selectedSkill.title} className="w-16 h-16 object-contain" />
              <h2 className="text-xl font-bold">{selectedSkill.title}</h2>
              <p className="text-gray-300">Type: {selectedSkill.type}</p>
              <p className="text-gray-400 text-sm">Created: {new Date(selectedSkill.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-400 text-sm">Updated: {new Date(selectedSkill.updatedAt).toLocaleDateString()}</p>
            </div>
            <button 
              onClick={closeModal} 
              className="mt-4 bg-red-500 px-4 py-2 rounded-md w-full"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="relative bg-gray-800 p-6 rounded-md w-full max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">
              Update Skill
            </h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block mb-1 text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-1 text-gray-300">Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Languages">Languages</option>
                  <option value="Tools">Tools</option>
                </select>
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

      {/* Add New Data Modal */}
      {isOpenPostModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="relative bg-gray-800 p-6 rounded-md w-full max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">
              Add New Skill
            </h2>
            <form onSubmit={postNewData} className="space-y-2">
              <div>
                <label className="block mb-1 text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newData.title}
                  onChange={handleOnChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={newData.icon}
                  onChange={handleOnChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-1 text-gray-300">Type</label>
                <select
                  id="type"
                  name="type"
                  value={newData.type}
                  onChange={handleOnChange}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Languages">Languages</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closePostModal}
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
  )
}

export default Skill;
