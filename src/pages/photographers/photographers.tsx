import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getAllPhotographers, Photographer } from "../../api/photographers";
import PhotographerCard from "../../components/photographers/photographersCard";

const PhotographersList: React.FC = () => {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const res = await getAllPhotographers();
        setPhotographers(res);
      } catch (err: any) {
        setError(err.message || "Không thể lấy danh sách photographer.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPhotographers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#cafbda] to-[#9bc1fb] px-6 py-12">
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center font-semibold text-[#9681FA]"
        >
          <IoChevronBackOutline className="h-5 w-5" />
          Back
        </button>
      </div>
      <h1 className="mb-10 text-center text-3xl font-bold text-gray-800">
        📸 Photographer List
      </h1>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photographers.map((p) => (
            <PhotographerCard
              key={p.photographerId}
              photographerId={p.photographerId}
              userId={p.userId}
              bio={p.bio}
              portfolioUrl={`https://i.pravatar.cc/150?u=${p.userId}`}
              rating={p.rating}
              location={p.location}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotographersList;
