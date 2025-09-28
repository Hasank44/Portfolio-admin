import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../../../context/DataProvider'
import { Update } from '../../../context/UpdateDataProvider';
import { Message } from '../../../context/MessageContext';

const About = () => {
  const { about } = useContext(Data);
  const { toast } = useContext(Message);
  const aboutData = about[0] || [];
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  // update modal
  const { aboutUpdate } = useContext(Update);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updateField, setUpdateField] = useState("");
    const [formData, setFormData] = useState({
      image: "",
      name: "",
      title: "",
      description: "",
      cvLink: "",
    });
    useEffect(() => {
      if (aboutData) {
        setFormData({
          image: aboutData.image || "",
          name: aboutData.name || "",
          title: aboutData.title || "",
          description: aboutData.description || "",
          cvLink: aboutData.cvLink || "",
        });
      }
    }, [aboutData]);
  
    const openUpdateModal = (field) => {
      setUpdateField(field);
      setIsUpdateOpen(true);
    };
    const closeUpdateModal = () => {
      setIsUpdateOpen(false);
      setUpdateField("");
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const id = aboutData._id;
        await aboutUpdate(id, formData);
        closeUpdateModal();
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };
  
    const fieldLabels = {
      image: "Image",
      name: "Name",
      title: "Title",
      Description: "Description",
      cvLink: "cvLink",
    };

  const addNew = () => {
    toast.warning('This Feathers Is Coming Soon')
  }
  return (
    <div className="w-full px-1 py-5 items-center space-y-3">
      <div className="w-full right-0">
        <button
          onClick={addNew}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm justify-end"
        >
          Add New
        </button>
      </div>
      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Profile Image:</h1>
          <img src={aboutData.image} alt="profile" className="w-8 h-auto rounded" />
        </div>
        <div className='flex gap-3'>
          <button 
          onClick={() => openModal(
            <img src={aboutData.image} alt="profile" className="lg:w-[50%] mx-auto h-auto rounded-lg" />
          )} 
          className="px-2 py-1 bg-gray-500 rounded-md font-semibold cursor-pointer text-sm"
          >
            View
          </button>
          <button
            onClick={()=> openUpdateModal("image")}
            className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
        </div>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Name:</h1>
          <h1>{aboutData.name}</h1>
        </div>
        <button
          onClick={()=> openUpdateModal("name")}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Title:</h1>
          <h1>{aboutData.title}</h1>
        </div>
        <button
          onClick={()=>openUpdateModal("title")}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Description:</h1>
          <h1 className="line-clamp-1 w-10 sm:w-30 md:w-80">{aboutData.description}</h1>
        </div>
        <div className='flex gap-3'>
          <button 
          onClick={() => openModal(
            <p className="text-white text-lg">{aboutData.description}</p>
          )} 
          className="px-2 py-1 bg-gray-500 rounded-md font-semibold cursor-pointer text-sm"
          >
            View
          </button>
          <button
            onClick={()=> openUpdateModal("description")}
            className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
        </div>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>CV Link:</h1>
          <a href={aboutData.cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {aboutData.cvLink}
          </a>
        </div>
        <button
          onClick={()=> openUpdateModal("cvLink")}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className=" max-w-[90%] md:max-w-[60%] w-full p-5 bg-gray-800 rounded-lg">
            {modalContent}
            <button 
              onClick={closeModal} 
              className="mt-5 bg-red-500 text-white px-3 py-1 rounded-md"
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
              Update {fieldLabels[updateField]}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor={updateField} className="block mb-1 text-gray-300">
                  {fieldLabels[updateField]}
                </label>
                <input
                  type="text"
                  name={updateField}
                  value={formData[updateField]}
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

export default About;
