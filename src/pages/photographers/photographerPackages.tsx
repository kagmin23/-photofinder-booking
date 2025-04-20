import { useEffect, useState } from "react";
import {
    IoCalendarOutline,
    IoCamera,
    IoPricetagOutline,
    IoTimeOutline,
} from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { getPackageById } from "../../api/package";
import { PackageModel } from "../../types";

const PhotographerPackagesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [packages, setPackages] = useState<PackageModel[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      if (id) {
        try {
          setLoading(true);
          const res = await getPackageById(Number(id));
          if (res.success) {
            setPackages(res.data || null);
          } else {
            setError(res.message || "Không thể tải gói chụp");
          }
        } catch (err) {
          setError("Đã xảy ra lỗi khi tải dữ liệu");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPackages();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-700">
            Đang tải các gói chụp...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen overflow-y-auto bg-gradient-to-r from-[#cafbda] to-[#9bc1fb] py-12">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-800">Lỗi</h2>
          <p className="text-gray-600">{error}</p>
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
        </div>
      </div>
    );
  }

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-r from-[#cafbda] to-[#9bc1fb] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
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

          <h2 className="mb-2 text-3xl font-bold text-gray-800">
            Các Gói Dịch Vụ
          </h2>
          <p className="text-gray-600">
            Lựa chọn gói dịch vụ phù hợp với nhu cầu của bạn
          </p>
        </div>

        {packages && packages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.packageId}
                className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600">
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
                  </div>
                  <div className="bg-opacity-90 absolute top-0 right-0 bg-white px-3 py-1 text-sm font-medium text-blue-700">
                    #{pkg.packageId}
                  </div>
                  <div className="flex h-full items-center p-6">
                    <div>
                      <IoCamera className="mb-2 h-8 w-8 text-white" />
                      <h3 className="text-2xl font-bold text-white">
                        {pkg.packageName}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex-grow p-6">
                  <div className="mb-6 flex justify-between">
                    <div className="flex items-center">
                      <IoPricetagOutline className="mr-2 h-5 w-5 text-green-600" />
                      <span className="text-xl font-bold text-green-600">
                        {new Intl.NumberFormat("vi-VN").format(pkg.price)} VNĐ
                      </span>
                    </div>

                    <div className="flex items-center">
                      <IoTimeOutline className="mr-1 h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{pkg.duration} giờ</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>

                  <div className="mb-4 flex items-center text-gray-600">
                    <IoCalendarOutline className="mr-2 h-5 w-5 text-blue-500" />
                    <span>Ngày tạo: {formatDate(pkg.createdAt)}</span>
                  </div>
                </div>

                <div className="mt-auto border-t border-gray-100 p-6">
                  <button className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
                    Đặt Gói Chụp Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-8 text-center shadow-lg">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-8 w-8 text-blue-600"
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
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800">
              Chưa có gói dịch vụ
            </h3>
            <p className="text-gray-600">
              Nhiếp ảnh gia này chưa cung cấp gói dịch vụ nào. Vui lòng quay lại
              sau.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographerPackagesDetails;
