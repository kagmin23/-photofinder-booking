import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPhotographerById, Photographer } from "../../api/photographers";

const PhotographerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        if (id) {
          setLoading(true);
          const res = await getPhotographerById(id);
          if (res !== null) {
            setPhotographer(res);
          } else {
            setError(res || "Không thể tải thông tin photographer");
          }
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographer();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleViewPackages = () => {
    navigate(`packages`);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-700">
            Đang tải thông tin...
          </p>
        </div>
      </div>
    );
  }

  if (error || !photographer) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            Không tìm thấy thông tin
          </h2>
          <p className="mb-4 text-gray-600">
            {error || "Không tìm thấy photographer với ID này"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Quay lại trang trước
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#cafbda] to-[#9bc1fb] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-blue-600 hover:underline"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại trang nhiếp ảnh gia
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
            </div>
          </div>

          <div className="relative mx-auto -mt-16 flex max-w-lg flex-col items-center px-6">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-lg">
              <img
                src={`https://i.pravatar.cc/300?u=${photographer.userId}`}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-800">
                Photographer #{photographer.photographerId}
              </h1>

              <div className="mb-6 flex items-center justify-center">
                <span className="flex items-center text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5"
                      fill={
                        star <= Math.round(photographer.rating)
                          ? "currentColor"
                          : "none"
                      }
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {photographer.rating
                      ? `${photographer.rating}/5`
                      : "Chưa có đánh giá"}
                  </span>
                </span>
              </div>

              {photographer.location && (
                <div className="mb-4 flex items-center justify-center text-gray-600">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{photographer.location}</span>
                </div>
              )}

              {photographer.bio && (
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-semibold text-gray-700">
                    Bio
                  </h2>
                  <p className="text-gray-600">{photographer.bio}</p>
                </div>
              )}

              {!photographer.bio &&
                !photographer.location &&
                !photographer.portfolioUrl && (
                  <div className="mb-6 rounded-lg bg-gray-50 p-6 text-center">
                    <svg
                      className="mx-auto mb-3 h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-600">
                      Chưa có thông tin chi tiết về nhiếp ảnh gia này.
                    </p>
                  </div>
                )}

              <div className="mt-4">
                <button
                  onClick={handleViewPackages}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md hover:bg-blue-700"
                >
                  View Packages
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Phần này có thể mở rộng thêm nếu có thêm thông tin */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerDetails;
