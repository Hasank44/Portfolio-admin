import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'
import { Update } from '../../../context/UpdateDataProvider';
import { Delete } from '../../../context/DeleteProvider';
import { Message } from '../../../context/MessageContext';

const Service = () => {
  const { service, setService } = useContext(Data);
  const { serviceUpdate, serviceToggle } = useContext(Update);
  const { serviceDelete } = useContext(Delete);
  const { toast } = useContext(Message);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (item) => setSelectedService(item);
  const closeModal = () => setSelectedService(null);

  // update modal
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [formData, setFormData] = useState({
      icon: "",
      title: "",
      description: ""
    });
  
    const [selectedData, setSelectedData] = useState(null);
  
    const openUpdateModal = (data) => {
      setFormData({
        icon: data.icon || "",
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
        await serviceUpdate(id, formData);
        closeUpdateModal();
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };

  // // delete
  const currentId = (id, data ) => {
    const confirmDelete = window.confirm(`Are You Sure Delete ${data}`);
    if (confirmDelete) {
      serviceDelete(id);
    }
  };
  
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(service.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentService = service.slice(startIndex, startIndex + itemsPerPage);

    // enable toggle
const handleToggle = async (id, currentStatus) => {
  setService(prev =>
    prev.map(p =>
      p._id === id ? { ...p, isEnable: !currentStatus } : p
    )
  );

  try {
    await serviceToggle(id, !currentStatus);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    setService(prev =>
      prev.map(p =>
        p._id === id ? { ...p, isEnable: currentStatus } : p
      )
    );
  }
};
  return (
    <div className="w-full px-1 py-5">
      <div className="w-full right-0 pb-3">
        <button
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm justify-end"
        >
          Add New
        </button>
      </div>
      <div className="flex flex-col w-full space-y-3">
        {currentService.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-700 rounded-lg px-3 py-2.5 w-full space-y-2 sm:space-y-0 sm:flex justify-between items-center"
          >
            <div className='flex items-center gap-2'>
              <h2 className="text-white font-semibold">Title: {item.title}</h2>
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
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 w-full">
          <div className="bg-gray-800 p-6 rounded-lg text-white space-y-3 w-[95%] sm:w-[75%] lg::w-[50%]">
            <div className="flex flex-col items-center space-y-2">
              <img src={selectedService.icon} alt={selectedService.title} className="w-30 h-auto object-contain" />
              <h2 className="text-xl font-bold">{selectedService.title}</h2>
                <span className="font-semibold">Details:
                    <p className='text-gray-300'> {selectedService.description}</p>
                </span>
              <p className="text-gray-400 text-sm">Created: {new Date(selectedService.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-400 text-sm">Updated: {new Date(selectedService.updatedAt).toLocaleDateString()}</p>
            </div>
            <button 
              onClick={closeModal} 
              className="mt-4 bg-red-500 px-4 py-2 rounded-md"
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
              Update Service
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

export default Service;
