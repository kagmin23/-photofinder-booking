import { Button, Card, Descriptions, message, Modal, Spin, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById } from "../api/bookings";
import { createVnpayPaymentUrl } from "../api/payment/vnpay";
import { BookingResponse } from "../types";

const BookingDetail = () => {
  const params = useParams();
  const bookingId = params.id;
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        message.error("Không tìm thấy ID của booking");
        setLoading(false);
        return;
      }

      try {
        const data = await getBookingById(bookingId);
        if (data) {
          setBooking(data);
        } else {
          message.warning("Không tìm thấy thông tin booking");
        }
      } catch (error: any) {
        console.error("Error fetching booking:", error);
        message.error(error.message || "Không thể lấy thông tin booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const renderStatusTag = (status: string) => {
    let color = "default";
    switch (status) {
      case "Pending":
        color = "orange";
        break;
      case "Confirmed":
        color = "blue";
        break;
      case "Completed":
        color = "green";
        break;
      case "Cancelled":
        color = "red";
        break;
    }
    return (
      <Tag color={color} className="text-base px-4 py-1">
        {status}
      </Tag>
    );
  };

  const handleVnpayPayment = () => {
    if (!bookingId) return;

    Modal.confirm({
      title: "Xác nhận thanh toán",
      content: "Bạn có chắc chắn muốn thanh toán đơn Booking này qua VNPay?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const res = await createVnpayPaymentUrl(bookingId);
          console.log("VNPAY Response:", res);

          if (res && res.paymentUrl) {
            window.location.href = res.paymentUrl;
          } else {
            message.error(
              "Không thể tạo link thanh toán: URL không tồn tại trong phản hồi"
            );
          }
        } catch (error: any) {
          console.error("VNPAY Payment Error:", error);
          message.error(error.message || "Lỗi khi tạo thanh toán VNPay");
        }
      },
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#e8f0ff] via-[#d9f9f4] to-[#ffe8f6]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-start mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-[#6C63FF] font-semibold hover:underline"
          >
            <IoChevronBackOutline className="mr-1 h-5 w-5" />
            Quay lại
          </button>
        </div>

        <h2 className="mb-6 text-center text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#6C63FF] via-[#9681FA] to-[#B8B8FF] bg-clip-text drop-shadow">
          Booking Details
        </h2>

        <Card
          loading={loading}
          bordered
          className="shadow-lg rounded-xl bg-white"
        >
          {!loading && booking ? (
            <>
              <Descriptions
                layout="vertical"
                column={{ xs: 1, sm: 2, md: 2 }}
                bordered
                labelStyle={{ padding: 0 }}
                contentStyle={{ padding: 0 }}
              >
                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Mã Booking
                    </div>
                  }
                >
                  <div className="text-center py-2">{booking.bookingId}</div>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Trạng thái
                    </div>
                  }
                >
                  <div className="text-center py-2">
                    {renderStatusTag(booking.status)}
                  </div>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Khách hàng (ID)
                    </div>
                  }
                >
                  <div className="text-center py-2">{booking.customerId}</div>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Nhiếp ảnh gia (ID)
                    </div>
                  }
                >
                  <div className="text-center py-2">
                    {booking.photographerId}
                  </div>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Thời gian sự kiện
                    </div>
                  }
                >
                  <div className="text-center py-2">
                    {dayjs(booking.eventDate).format("DD/MM/YYYY HH:mm")}
                  </div>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Địa điểm sự kiện
                    </div>
                  }
                >
                  <div className="text-center py-2">
                    {booking.eventLocation}
                  </div>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Tổng chi phí
                    </div>
                  }
                >
                  <div className="text-center py-2">
                    {booking.totalPrice.toLocaleString("vi-VN")}₫
                  </div>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Ngày tạo Booking
                    </div>
                  }
                >
                  <div className="text-center py-2">
                    {dayjs(booking.createdAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <div className="text-center font-semibold bg-[#f0f4ff] text-[#333] py-2">
                      Cập nhật gần nhất
                    </div>
                  }
                >
                  <div className="text-center py-2">
                    {dayjs(booking.updatedAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                </Descriptions.Item>
              </Descriptions>
              {booking.status === "Pending" && (
                <div className="text-center mt-6">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                    alt="VNPay Logo"
                    className="h-20 mx-auto mb-4"
                  />
                  <Button
                    type="primary"
                    className="bg-[#1890ff] px-6 py-2 text-white font-semibold rounded-md hover:bg-[#40a9ff]"
                    onClick={handleVnpayPayment}
                  >
                    Thanh toán với VNPay
                  </Button>
                </div>
              )}
            </>
          ) : !loading && !booking ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Không tìm thấy thông tin booking</p>
            </div>
          ) : (
            <div className="text-center py-10">
              <Spin size="large" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BookingDetail;
