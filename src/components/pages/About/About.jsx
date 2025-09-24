import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'

const About = () => {
  const { about } = useContext(Data);
  const aboutData = about[0] || [];
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <div className="w-full px-1 py-5 items-center space-y-3">
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
          <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
        </div>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Name:</h1>
          <h1>{aboutData.name}</h1>
        </div>
        <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>Title:</h1>
          <h1>{aboutData.title}</h1>
        </div>
        <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
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
          <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
        </div>
      </div>

      <div className="flex bg-gray-700 px-3 py-2 rounded-md items-center justify-between">
        <div className='flex gap-2'>
          <h1>CV Link:</h1>
          <a href={aboutData.cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {aboutData.cvLink}
          </a>
        </div>
        <button className="px-2 py-1 bg-amber-500 rounded-md font-semibold cursor-pointer text-sm">Update</button>
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
    </div>
  )
}

export default About;
