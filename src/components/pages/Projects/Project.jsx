import React, { useContext, useState } from 'react'
import { Data } from '../../../context/DataProvider'

const Project = () => {
    const { project } = useContext(Data);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (item) => setSelectedProject(item);
  const closeModal = () => setSelectedProject(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(project.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = project.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full px-1 py-5">

      <div className="flex flex-col w-full space-y-3">
        {currentProjects.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-700 rounded-lg px-3 py-2.5 w-full space-y-2 sm:space-y-0 sm:flex justify-between items-center"
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
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 w-full">
          <div className="bg-gray-800 p-6 rounded-lg text-white space-y-3 w-[95%] sm:w-[75%] lg::w-[50%]">
            <div className="flex flex-col items-center space-y-2">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-30 h-auto object-contain" />
              <h2 className="text-xl font-bold">{selectedProject.title}</h2>
                <span className="font-semibold">link:
                    <a className='text-gray-300' href={selectedProject.link}> {selectedProject.link}</a>
                </span>
                <span className="font-semibold">Github:
                    <a className='text-gray-300' href={selectedProject.github}> {selectedProject.github}</a>
                </span>
                <span className="font-semibold">Details:
                    <p className='text-gray-300'> {selectedProject.description}</p>
                </span>
              <p className="text-gray-400 text-sm">Created: {new Date(selectedProject.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-400 text-sm">Updated: {new Date(selectedProject.updatedAt).toLocaleDateString()}</p>
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

export default Project;
