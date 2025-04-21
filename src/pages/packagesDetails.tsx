import { Modal, message } from "antd";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../api/bookings";
import { getAllPackages } from "../api/package";
import { PackageModel } from "../types";

interface BookingRequest {
  customerId: number;
  photographerId: number;
  eventDate: string;
  eventLocation: string;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

const PhotographyPackagesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<PackageModel | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPackages();
        if (response?.success && response?.data) {
          const selectedPkg = response.data.find(
            (p: PackageModel) => p.packageId === Number(id)
          );
          setPkg(selectedPkg || null);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết gói chụp:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleBooking = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmBooking = async () => {
    const storedUser = localStorage.getItem("userProfile");
    const userId = storedUser ? JSON.parse(storedUser).userId : null;
  
    if (!userId || !pkg?.photographerId || !pkg?.price) {
      message.error("Thiếu thông tin để tạo booking");
      return;
    }
  
    const bookingData: BookingRequest = {
      customerId: userId,
      photographerId: pkg.photographerId,
      eventDate: new Date().toISOString(),
      eventLocation: "Ho Chi Minh City",
      totalPrice: pkg.price,
      status: "Pending",
    };
  
    try {
      const res = await createBooking(bookingData);
      
      if (res) {
        message.success("Đặt lịch thành công!");
        handleCloseModal();
        navigate(`/user/dashboard`);
      } else {
        message.error("Đặt lịch thất bại.");
      }
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi gọi API tạo booking.");
    }
  };

  if (!pkg) {
    return (
      <div className="p-4 text-center text-gray-600">Đang tải chi tiết...</div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 p-6">
      {/* Back Button */}
      <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between bg-white p-4 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center font-semibold text-[#9681FA]"
        >
          <IoChevronBackOutline className="mr-1 h-5 w-5" />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="flex w-full max-w-7xl flex-col gap-6 rounded-lg bg-white p-8 shadow-lg md:flex-row">
        {/* Left - Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://cdn.5280.com/2024/10/WEB_analogheroimage-960x720.jpg"
            alt={pkg.packageName}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>

        {/* Right - Info */}
        <div className="flex w-full flex-col justify-between space-y-6 md:w-1/2">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {pkg.packageName}
            </h2>
            <p className="mt-2 text-gray-600">
              {pkg.description || "Đang cập nhật..."}
            </p>

            <div className="mt-4 space-y-3 text-gray-700">
              <div>
                <strong>Giá:</strong>{" "}
                {pkg.price?.toLocaleString() || "Đang cập nhật..."} VND
              </div>
              <div>
                <strong>Thời lượng:</strong>{" "}
                {pkg.duration ? `${pkg.duration} giờ` : "Đang cập nhật..."}
              </div>
              <div>
                <strong>Photographer:</strong>{" "}
                {pkg.photographerId || "Đang cập nhật..."}
              </div>
              <div>
                <strong>Ngày tạo:</strong>{" "}
                {pkg.createdAt
                  ? new Date(pkg.createdAt).toLocaleDateString("vi-VN")
                  : "Đang cập nhật..."}
              </div>
            </div>
          </div>

          {/* VNPay Payment Section */}
          <div className="mt-4 border-t pt-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Tiến hành đặt lịch
            </h3>
            <div className="flex flex-col justify-center items-center gap-4 rounded-xl bg-gray-100 p-4 shadow-inner md:flex-row">
              <button
                onClick={handleBooking}
                className="rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
              >
                ĐẶT LỊCH NGAY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal xác nhận - Đã loại bỏ Select component cho status */}
      <Modal
        title="Xác nhận đặt lịch"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={handleConfirmBooking}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>
          <strong>Photographer:</strong> {pkg.photographerId}
        </p>
        <p>
          <strong>Gói chụp:</strong> {pkg.packageName}
        </p>
        <p>
          <strong>Giá:</strong> {pkg.price?.toLocaleString()} VND
        </p>
        <p>
          <strong>Thời lượng:</strong> {pkg.duration} giờ
        </p>
        <p>
          <strong>Địa điểm:</strong> Ho Chi Minh City
        </p>
        <p>
          <strong>Ngày:</strong> {new Date().toLocaleDateString("vi-VN")}
        </p>
        <div className="my-5 flex items-center space-x-4">
          <p className="text-gray-700 w-25">Trạng thái:</p>
          <p className="font-medium text-yellow-600">Pending</p> {/* Hiển thị trạng thái cố định */}
        </div>
      </Modal>
    </div>
  );
};

export default PhotographyPackagesDetails;