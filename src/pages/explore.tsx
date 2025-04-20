import React from 'react';
import { IoChevronBack, IoEye, IoFilter, IoNotificationsOutline, IoPerson, IoSearchOutline, IoThumbsUp } from "react-icons/io5";

const Explore: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white">
        <div className="flex items-center">
          <IoChevronBack className="text-2xl font-bold mr-2" />
          <span className="text-xl font-bold">Back</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <IoNotificationsOutline className="text-2xl text-teal-300" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-teal-300 rounded-full"></div>
          </div>
          <IoSearchOutline className="text-2xl text-teal-300" />
          <IoPerson className="text-2xl text-teal-300" />
        </div>
      </div>

      {/* Filter and View Best Profile Bar */}
      <div className="flex justify-between items-center px-4 py-2 gap-2">
        <div className="flex items-center gap-2 bg-blue-100 text-black px-6 py-2 rounded-full">
          <IoFilter className="text-xl" />
          <span className="font-medium">Filter</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-green-100 via-blue-100 to-blue-200 rounded-full px-6 py-2">
          <IoSearchOutline className="text-xl mr-2" />
          <span className="font-medium">View best profile</span>
        </div>
        
        <div className="bg-gradient-to-r from-green-100 to-green-200 text-black px-6 py-2 rounded-full">
          <span className="font-medium">Recommend</span>
        </div>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* First Row */}
        {[1, 2, 3].map((item, index) => (
          <div key={index} className="relative">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              {index === 0 || index === 2 ? (
                <img 
                  src="/api/placeholder/400/400" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="/api/placeholder/400/400" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              )}
              
              {(index === 1 || index === 2) && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full p-1 flex items-center justify-center w-12 h-12">
                  <div className="text-center leading-tight">
                    <div className="text-[8px]">BEST</div>
                    <div className="text-[8px]">PRICE</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <div>
                <div className="font-medium">Price</div>
                <div className="text-sm">Name account</div>
              </div>
              <div className="flex items-center gap-2">
                <IoThumbsUp className="text-xl text-blue-400" />
                <IoEye className="text-xl text-blue-400" />
              </div>
            </div>
          </div>
        ))}
        
        {/* Second Row */}
        {[1, 2, 3].map((item, index) => (
          <div key={index + 3} className="relative">
            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gradient-to-br from-green-100 to-blue-200 overflow-hidden">
              <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full p-1 flex items-center justify-center w-12 h-12">
                <div className="text-center leading-tight">
                  <div className="text-[8px]">BEST</div>
                  <div className="text-[8px]">PRICE</div>
                </div>
              </div>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <div>
                <div className="font-medium">Price</div>
                <div className="text-sm">Name account</div>
              </div>
              <div className="flex items-center gap-2">
                <IoThumbsUp className="text-xl text-blue-400" />
                <IoEye className="text-xl text-blue-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;