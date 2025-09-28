import React, { useContext, useEffect, useState } from "react";
import { Data } from "../../../context/DataProvider";
import { Update } from "../../../context/UpdateDataProvider";
import { Message } from "../../../context/MessageContext";

const Home = () => {
  const { home } = useContext(Data);
  const homeData = home[0] || {};
  const { homeUpdate } = useContext(Update);
  const { toast } = useContext(Message);

  // image preview modal
  const [modalImage, setModalImage] = useState(null);
  const openImageModal = (img) => setModalImage(img);
  const closeImageModal = () => setModalImage(null);

  // update modal
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateField, setUpdateField] = useState("");
  const [formData, setFormData] = useState({
    bgImage: "",
    profileImage: "",
    name: "",
    title: "",
    bio: "",
    messageLink: "",
  });
  useEffect(() => {
    if (homeData) {
      setFormData({
        bgImage: homeData.bgImage || "",
        profileImage: homeData.profileImage || "",
        name: homeData.name || "",
        title: homeData.title || "",
        bio: homeData.bio || "",
        messageLink: homeData.messageLink || "",
      });
    }
  }, []);

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
      const id = homeData._id;
      await homeUpdate(id, formData);
      closeUpdateModal();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const fieldLabels = {
    bgImage: "Background Image",
    profileImage: "Profile Image",
    name: "Name",
    title: "Title",
    bio: "Bio",
    messageLink: "Message Link",
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
        <div className="flex gap-2">
          <h1>Profile Image:</h1>
          <img
            src={homeData.profileImage}
            alt="profile"
            className="w-8 h-auto rounded"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => openImageModal(homeData.profileImage)}
            className="px-2 py-1 bg-gray-500 rounded-md font-semibold text-sm"
          >
            View
          </button>
          <button
            onClick={() => openUpdateModal("profileImage")}
            className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm"
          >
            Update
          </button>
        </div>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className="flex gap-2">
          <h1>BG Image:</h1>
          <img
            src={homeData.bgImage}
            alt="background"
            className="w-10 h-auto rounded"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => openImageModal(homeData.bgImage)}
            className="px-2 py-1 bg-gray-500 rounded-md font-semibold text-sm"
          >
            View
          </button>
          <button
            onClick={() => openUpdateModal("bgImage")}
            className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm"
          >
            Update
          </button>
        </div>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className="flex gap-2">
          <h1>Name:</h1>
          <h1>{homeData.name}</h1>
        </div>
        <button
          onClick={() => openUpdateModal("name")}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm"
        >
          Update
        </button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className="flex gap-2">
          <h1>Title:</h1>
          <h1>{homeData.title}</h1>
        </div>
        <button
          onClick={() => openUpdateModal("title")}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm"
        >
          Update
        </button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className="flex gap-2">
          <h1>Bio:</h1>
          <h1>{homeData.bio}</h1>
        </div>
        <button
          onClick={() => openUpdateModal("bio")}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm"
        >
          Update
        </button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className="flex gap-2">
          <h1>Link:</h1>
          <a
            href={homeData.messageLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {homeData.messageLink}
          </a>
        </div>
        <button
          onClick={() => openUpdateModal("messageLink")}
          className="px-2 py-1 bg-amber-500 rounded-md font-semibold text-sm"
        >
          Update
        </button>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex w-full justify-center px-5 items-center z-50">
          <div className="relative mx-auto max-w-3xl w-full bg-gray-800 px-5 py-15 rounded-md">
            <img src={modalImage} alt="preview" className="lg:w-[50%] mx-auto h-auto rounded-lg shadow-lg" />
            <button 
              onClick={closeImageModal}
              className="absolute mt-5  bg-red-500 text-white px-3 py-1 rounded-md"
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
  );
};

export default Home;
