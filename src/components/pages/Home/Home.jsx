import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'

const Home = () => {
  const { home } = useContext(Data);
  const homeData = home[0] || [];
  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

  return (
    <div className="w-full px-1 py-5 items-center space-y-3">
      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Profile Image:</h1>
          <img src={homeData.profileImage} alt="profile" className="w-8 h-auto rounded" />
        </div>
        <div className='flex gap-3'>
          <button 
            onClick={() => openModal(homeData.profileImage)} 
            className="px-2 py-1 bg-gray-500 rounded-md font-semibold cursor-pointer text-sm"
          >
            View
          </button>
          <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
        </div>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>BG Image:</h1>
          <img src={homeData.bgImage} alt="background" className="w-10 h-auto rounded" />
        </div>
        <div className='flex gap-3'>
          <button 
            onClick={() => openModal(homeData.bgImage)} 
            className="px-2 py-1 bg-gray-500 rounded-md font-semibold cursor-pointer text-sm"
          >
            View
          </button>
          <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
        </div>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Name:</h1>
          <h1>{homeData.name}</h1>
        </div>
        <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Title:</h1>
          <h1>{homeData.title}</h1>
        </div>
        <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Bio:</h1>
          <h1>{homeData.bio}</h1>
        </div>
        <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Link:</h1>
          <a href={homeData.messageLink} target="_blank" rel="noopener noreferrer" className="text-blue-400
          h-auto w-full underline">
          {homeData.messageLink}
        </a>
        </div>
        <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex w-full justify-center px-5 items-center z-50">
          <div className="relative mx-auto max-w-3xl w-full bg-gray-800 px-5 py-15 rounded-md">
            <img src={modalImage} alt="preview" className="lg:w-[50%] mx-auto h-auto rounded-lg shadow-lg" />
            <button 
              onClick={closeModal} 
              className="absolute mt-5  bg-red-500 text-white px-3 py-1 rounded-md"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home;
