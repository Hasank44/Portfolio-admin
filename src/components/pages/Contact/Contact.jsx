import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'

const Contact = () => {
    const { contact } = useContext(Data);
  const [selectedContact, setSelectedContact] = useState(null);

  const openModal = (item) => setSelectedContact(item);
  const closeModal = () => setSelectedContact(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(contact.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContact = contact.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full px-1 py-5">

      <div className="flex flex-col w-full space-y-3">
        {currentContact.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-700 rounded-lg px-3 py-2.5 w-full space-y-2 sm:space-y-0 sm:flex justify-between items-center"
          >
            <div className='flex items-center gap-2'>
              <h2 className="text-white font-semibold">Name: {item.name}</h2>
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
              <button 
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
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 w-full">
          <div className="bg-gray-800 p-6 rounded-lg text-white space-y-3 w-[95%] sm:w-[75%] lg::w-[50%]">
            <div className="flex flex-col items-center space-y-2">
              <img src={selectedContact.icon} alt={selectedContact.title} className="w-30 h-auto object-contain" />
              <h2 className="text-xl font-bold">{selectedContact.name}</h2>
                <span className="font-semibold flex gap-2">Email:
                    <p className='text-gray-300'> {selectedContact.email}</p>
                </span>
                <span className="font-semibold flex gap-2">Subject:
                    <p className='text-gray-300'> {selectedContact.subject}</p>
                </span>
                <span className="font-semibold">Message:
                    <p className='text-gray-300'> {selectedContact.message}</p>
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

export default Contact;
