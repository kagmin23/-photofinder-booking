import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { getPackageById } from "../../api/package";
import { PackageModel } from "../../types";
import PackageItem from "./pkgItem";
import PackageModal from "./pkgModal";

export default function PackageSection() {
  const [packages, setPackages] = useState<PackageModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photographerId, setPhotographerId] = useState<number | null>(null);
  const [editingPackage, setEditingPackage] = useState<PackageModel | null>(
    null,
  );

  useEffect(() => {
    try {
      const userProfileString = localStorage.getItem("userProfile");
      if (userProfileString) {
        const userProfile = JSON.parse(userProfileString);
        if (
          userProfile.photographer &&
          userProfile.photographer.photographerId
        ) {
          setPhotographerId(userProfile.photographer.photographerId);
        } else {
          setError("Không tìm thấy thông tin nhiếp ảnh gia");
        }
      } else {
        setError("Không tìm thấy thông tin người dùng");
      }
    } catch (err) {
      console.error("Lỗi khi đọc thông tin từ localStorage:", err);
      setError("Lỗi khi đọc thông tin người dùng");
    }
  }, []);

  const fetchPackages = async () => {
    if (!photographerId) return;

    setLoading(true);
    setError("");

    try {
      const result = await getPackageById(photographerId);
      if (result.success) {
        setPackages(result.data || []);
      } else {
        setError(result.message || "Không thể tải dữ liệu");
      }
    } catch (err) {
      setError("Lỗi khi tải dữ liệu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (photographerId) {
      fetchPackages();
    }
  }, [photographerId]);

  if (!photographerId) {
    return (
      <div className="mt-8">
        <div className="rounded-md bg-yellow-100 p-4 text-yellow-700">
          {error || "Đang tải thông tin người dùng..."}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-black uppercase">Gói của bạn</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mr-1.5 flex items-center gap-2 rounded-md bg-[#93DDD4] px-4 py-2 font-medium text-black"
        >
          <IoAddCircleOutline className="size-5" />
          Thêm gói
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center">
          <p>Đang tải...</p>
        </div>
      ) : error ? (
        <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-md bg-gray-50 py-8 text-center">
          <p className="text-gray-500">
            Chưa có gói chụp ảnh nào. Hãy tạo gói mới!
          </p>
        </div>
      ) : (
        <div className="flex max-h-[700px] flex-col gap-4 overflow-y-auto pr-2">
          {packages.map((pkg) => (
            <PackageItem
              key={pkg.packageId}
              pkg={pkg}
              onEdit={(pkg) => {
                setEditingPackage(pkg);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <PackageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPackage(null);
        }}
        onSave={fetchPackages}
        photographerId={photographerId}
        editingPackage={editingPackage}
      />
    </div>
  );
}
