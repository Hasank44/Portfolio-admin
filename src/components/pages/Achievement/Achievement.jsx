import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'

const Achievement = () => {
  const { achievement, achieve } = useContext(Data);
  const stats = achieve;
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);
  return (
    <div className="w-full px-1 py-5 space-y-3">
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
    </div>
  )
}

export default Achievement;
