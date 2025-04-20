import React from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export interface PhotographerProps {
  photographerId: number;
  userId: number;
  bio: string;
  portfolioUrl: string;
  rating?: number;
  location?: string;
}

const PhotographerCard: React.FC<PhotographerProps> = ({
  photographerId,
  userId,
  bio,
  portfolioUrl,
  rating,
  location,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/photographer/${photographerId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <img
        src={portfolioUrl}
        alt={`Photographer #${photographerId}`}
        className="w-24 h-24 rounded-full object-cover border-4 border-[#cafbda]"
      />
      <h3 className="text-lg font-semibold mt-3 flex items-center gap-1">
        <IoCameraOutline className="text-blue-500" /> {`Photographer #${photographerId}`}
      </h3>
      <p className="text-gray-600 mt-2 text-sm">Bio: {bio || "Đang cập nhật..."}</p>
      <p className="text-gray-500 text-sm">
        Location: {location || "Đang cập nhật..."}
      </p>
      <p className="text-yellow-500 text-sm">
        Rating: {rating ? `${rating} ⭐` : "0 ⭐"}
      </p>
    </div>
  );
};

export default PhotographerCard;
