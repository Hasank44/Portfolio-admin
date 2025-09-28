import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'
import { Update } from '../../../context/UpdateDataProvider';
import { Message } from '../../../context/MessageContext';

const Achievement = () => {
  const { achievement, achieve } = useContext(Data);
  const { achievementUpdate } = useContext(Update);
  const { toast } = useContext(Message);
  const stats = achieve;
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  // update modal
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [formData, setFormData] = useState({
      title: "",
      description: ""
  });
    
  const [selectedData, setSelectedData] = useState(null);
    
  const openUpdateModal = (data) => {
    setFormData({
      title: data.title || "",
      description: data.description || ""
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
      const id = selectedData._id
      await achievementUpdate(id, formData);
      closeUpdateModal();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  
  return (
    <div className="w-full px-1 py-5 space-y-3">
      <div className="w-full right-0">
        <button
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm justify-end"
        >
          Add New
        </button>
      </div>
      {achievement.map((item, index) => (
        <div 
          key={index}
          className="sm:flex space-y-1.5 sm:space-y-0 justify-between items-center bg-gray-700 px-3 py-2.5 rounded-md"
        >
          <h1 className="font-semibold text-white">
            Title: {item.degree || item.title || `Achievement ${index + 1}`}
          </h1>
          <div className='space-x-3'>
            <button 
            onClick={() => openModal(item)} 
            className="px-2 py-1 bg-gray-500 rounded-md font-semibold cursor-pointer text-sm"
          >
            View
          </button>
            <button 
              onClick={()=> openUpdateModal(item)}
            className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm"
          >
            Update
          </button>
          </div>
        </div>
      ))}

    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {stats.map((stat) => (
            <div
              key={stat._id}
              className="rounded-xl text-center py-3 sm:py-5 border border-gray-700 transition-colors"
            >
                <h2 className="text-2xl font-extrabold mb-2">{ stat.number }</h2>
              <p className="text-gray-400 text-lg">{stat.label}</p>
            </div>
          ))}  
    </div>
      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 w-full flex justify-center items-center z-50">
          <div className="relative p-5 bg-gray-800 rounded-lg w-[95%] sm:w-[75%] lg::w-[50%] text-white space-y-2">
            <h2 className="text-xl font-bold mb-2">{selectedItem.degree || selectedItem.title}</h2>
            <p><span className="font-semibold">Details:</span> {selectedItem.description}</p>

            <button 
              onClick={closeModal} 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
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
              Update Achievement
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
                <label className="block mb-1 text-gray-300">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
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
  )
}

export default Achievement;
