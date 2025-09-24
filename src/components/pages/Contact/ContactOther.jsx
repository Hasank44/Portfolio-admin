import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'

const ContactOther = () => {
    const { contactLocation, contactSocial } = useContext(Data);
    
  const [selectedContact, setSelectedContact] = useState(null);

  const openModal = (item) => setSelectedContact(item);
  const closeModal = () => setSelectedContact(null);
  return (
    <div className="w-full px-1 py-5">

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
                className="px-1 py-1 bg-amber-500 rounded-md font-semibold text-sm"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
          
    <div>
      <h1 className='text-xl'>Contact Social</h1>
        <div className="flex flex-col w-full space-y-3">
        {contactSocial.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-700 rounded-lg px-3 py-2 w-full space-y-2 sm:space-y-0 sm:flex justify-between items-center"
          >
            <div className='flex items-center gap-2'>
              <h2 className="text-white font-semibold">Icon: </h2>
              <img src={item.icon} alt="" className='w-8 h-auto' />
            </div>
            <div className='space-x-3'>
              <button 
                onClick={() => openModal(item)} 
                className="px-1 py-1 bg-gray-500 rounded-md font-semibold text-sm"
              >
                View
              </button> 
              <button 
                className="px-1 py-1 bg-amber-500 rounded-md font-semibold text-sm"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
           

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
    </div>
  )
}

export default ContactOther;
