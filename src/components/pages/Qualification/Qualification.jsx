import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'
import { Update } from '../../../context/UpdateDataProvider'

const Qualification = () => {
  const { qualification } = useContext(Data);
  const { qualificationUpdate } = useContext(Update);

  const [selectedItem, setSelectedItem] = useState(null);
  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  // update modal
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    place: "",
    image: "",
    description: ""
  });

  const [selectedData, setSelectedData] = useState(null);

  const openUpdateModal = (data) => {
    setFormData({
      title: data.title || "",
      place: data.place || "",
      image: data.image || "",
      description: data.description || "",
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
      await qualificationUpdate(id, formData);
      closeUpdateModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full px-1 py-5 space-y-3">
      {qualification.map((item, index) => (
        <div 
          key={index} 
          className="flex justify-between items-center bg-gray-700 px-3 py-2.5 rounded-md"
        >
          <h1 className="font-semibold text-white">
            Title: {item.title || `Qualification ${index + 1}`}
          </h1>
          <div className='space-x-3'>
            <button 
              onClick={() => openModal(item)} 
              className="px-2 py-1 bg-gray-500 rounded-md font-semibold cursor-pointer text-sm"
            >
              View
            </button>
            <button 
              onClick={() => openUpdateModal(item)}
              className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm"
            >
              Update
            </button>
          </div>
        </div>
      ))}

      {/* View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 w-full flex justify-center items-center z-50">
          <div className="relative p-5 bg-gray-800 rounded-lg w-[95%] sm:w-[75%] lg:w-[50%] text-white space-y-2">
            <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
            <p><span className="font-semibold">Place:</span> {selectedItem.place}</p>
            <p><span className="font-semibold">Details:</span> {selectedItem.description}</p>
            {selectedItem.image && <img src={selectedItem.image} alt="qualification" className="w-32 rounded-md mt-2" />}
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
              Update Qualification
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
                <label className="block mb-1 text-gray-300">Place</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
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
              <div>
                <label className="block mb-1 text-gray-300">Description</label>
                <textarea
                  name="description"
                  rows={5}
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

export default Qualification;
