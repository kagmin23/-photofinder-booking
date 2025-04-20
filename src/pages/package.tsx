import { useEffect, useState } from "react";
import { IoChevronBackOutline, IoFilter, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getAllPackages } from "../api/package";
import { PackageModel } from "../types";

const PhotographyPackages = () => {
  const [packages, setPackages] = useState<PackageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getAllPackages();
        if (response.success) {
          setPackages(response.data || []);
        } else {
          setError(response.message || "Không thể tải dữ liệu gói chụp ảnh");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const formatPackageForDisplay = (pkg: PackageModel) => {
    return {
      id: pkg.packageId,
      image: "https://cdn.5280.com/2024/10/WEB_analogheroimage-960x720.jpg",
      price: `${pkg.price.toLocaleString()} VND`,
      name: pkg.packageName,
      description: pkg.description,
      // Các trường không có trong API sẽ được giả định
      discount: pkg.price > 300 ? "SALE OFF" : "",
      bestPrice: pkg.price <= 300,
      duration: `${pkg.duration} giờ`,
      photographerId: pkg.photographerId,
      createdAt: new Date(pkg.createdAt).toLocaleDateString("vi-VN"),
    };
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100">
      {/* Header */}
      <div className="z-10 flex-none bg-white p-4 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center font-semibold text-[#9681FA]"
        >
          <IoChevronBackOutline className="mr-1 h-5 w-5" />
          Back
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex-none px-4 py-2">
        <div className="flex gap-3 justify-between">
          <div className="flex w-1/4 items-center rounded-full bg-blue-100 px-6 py-2 text-blue-800">
            <IoFilter className="mr-2" />
            <span className="font-bold">Filter</span>
          </div>
          <div className="flex w-1/2 items-center justify-center rounded-full bg-gradient-to-r from-green-100 via-blue-100 to-blue-200 px-4 py-2 text-blue-500">
            <IoSearch className="mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm gói chụp ảnh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-center bg-transparent text-blue-800 placeholder-blue-400 outline-none"
            />
          </div>
          <div className="flex w-1/4 items-center justify-center rounded-full bg-green-100 px-6 py-2 text-green-800">
            <span className="font-bold">Recommend</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* Loading */}
        {loading && (
          <div className="flex h-full items-center justify-center">
            <div className="text-xl text-gray-600">Đang tải dữ liệu...</div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex h-full items-center justify-center">
            <div className="text-xl text-red-600">{error}</div>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && packages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-xl text-gray-600">
              Đang cập nhật dữ liệu...
            </div>
          </div>
        )}

        {/* Package list */}
        {!loading && !error && packages.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => {
              const displayPkg = formatPackageForDisplay(pkg);
              return (
                <div
                  key={displayPkg.id}
                  onClick={() => navigate(`/user/packages/${displayPkg.id}`)}
                  className="relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                >
                  <img
                    src={displayPkg.image}
                    alt={displayPkg.name}
                    className="h-64 w-full object-cover"
                  />
                  {displayPkg.discount && (
                    <div className="absolute top-2 right-2 rounded bg-red-500 p-1 font-bold text-white">
                      {displayPkg.discount}
                    </div>
                  )}
                  {displayPkg.bestPrice && (
                    <div className="absolute top-2 right-2 mt-6">
                      <div className="rounded-full bg-red-500 p-1 text-xs text-white">
                        BEST PRICE
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">{displayPkg.name}</p>
                        <p className="font-semibold text-blue-600">
                          {displayPkg.price}
                        </p>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {displayPkg.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Thời lượng: {displayPkg.duration}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographyPackages;
