import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'
import ContactSocial from './ContactSocial';
import { Update } from '../../../context/UpdateDataProvider';
import { Message } from '../../../context/MessageContext';

const ContactOther = () => {
  const { contactLocation } = useContext(Data);
  const { contactLocationUpdate } = useContext(Update);
  const { toast } = useContext(Message);
    
  const [selectedContact, setSelectedContact] = useState(null);

  const openModal = (item) => setSelectedContact(item);
  const closeModal = () => setSelectedContact(null);

  // update modal
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        icon: "",
        link: ""
     });
      
    const [selectedData, setSelectedData] = useState(null);
      
    const openUpdateModal = (data) => {
      setFormData({
        title: data.title || "",
        icon: data.icon || "",
        link: data.link || ""
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
        await contactLocationUpdate(id, formData);
        closeUpdateModal();
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
  };

  const addNew = () => {
    toast.warning('This Feathers Is Coming Soon')
  }
  return (
    <div className="w-full px-1 py-5">
      <div className="w-full right-0">
        <button
          onClick={addNew}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm justify-end"
        >
          Add New
        </button>
      </div>
        <div>
        <h1 className='text-xl'>Contact Location</h1>
        <div className="flex flex-col w-full space-y-3">
        {contactLocation.map((item) => (
          <div 
            key={item._id} 
            className="bg-gray-700 rounded-lg px-3 py-2 w-full space-y-2 sm:space-y-0 sm:flex justify-between items-center"
          >
            <div className='flex items-center gap-2'>
              <h2 className="text-white font-semibold">Title: {item.title}</h2>
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
            </div>
          </div>
        ))}
      </div>
    </div>
          
    <ContactSocial />
      {/* Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 w-full">
          <div className="bg-gray-800 p-6 rounded-lg text-white space-y-3 w-[95%] sm:w-[75%] lg::w-[50%]">
            <div className="flex flex-col items-center space-y-2">
              <img src={selectedContact.icon} alt={selectedContact.title} className="w-30 h-auto object-contain" />
              <h2 className="text-xl font-bold">{selectedContact.title}</h2>
                <span className="font-semibold">Details:
                    <p className='text-gray-300'> {selectedContact.link}</p>
                </span>
              <p className="text-gray-400 text-sm">Created: {new Date(selectedContact.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-400 text-sm">Updated: {new Date(selectedContact.updatedAt).toLocaleDateString()}</p>
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
              Update Contact Location
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
                <label className="block mb-1 text-gray-300">link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
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

export default ContactOther;
