import { IoSettingsOutline } from "react-icons/io5";
import { PackageModel } from "../../types";

interface PackageItemProps {
  pkg: PackageModel;
  onEdit: (pkg: PackageModel) => void;
}

export default function PackageItem({ pkg, onEdit }: PackageItemProps) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-lg bg-[#93DDD4] p-5">
      <div className="flex flex-col px-4">
        <h3 className="text-xl font-bold text-black">{pkg.packageName}</h3>
        <p className="mt-1 text-sm text-gray-700">{pkg.description}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-md bg-white px-4 py-1 text-center">
          <span className="text-sm text-gray-700">Giá (VND)</span>
          <span className="block text-lg font-bold text-black">
            {pkg.price.toLocaleString()}
          </span>
        </div>
        <div className="rounded-md bg-white px-4 py-1 text-center">
          <span className="text-sm text-gray-700">Thời lượng (Giờ)</span>
          <span className="block text-lg font-bold text-black">
            {pkg.duration}
          </span>
        </div>

        {/* Nút chỉnh sửa */}
        <IoSettingsOutline
          onClick={() => onEdit(pkg)}  // Truyền gói chụp ảnh vào hàm onEdit
          className="size-6 cursor-pointer mx-4 text-black hover:text-gray-700"
        />
      </div>
    </div>
  );
}
