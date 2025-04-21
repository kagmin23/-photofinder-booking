import api from "../index";

interface VnpayResponse {
  paymentUrl: string;
}

export const createVnpayPaymentUrl = async (
  bookingId: string
): Promise<VnpayResponse> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Bạn cần đăng nhập để thực hiện thanh toán");
  }

  try {
    const response = await api.post(
      "/api/VNPay/Get-Payment-Url",
      {
        bookingId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.url) {
      return {
        paymentUrl: response.data.url,
      };
    } else {
      throw new Error("Không thể tạo URL thanh toán VNPay");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Lỗi từ server khi tạo thanh toán VNPay"
      );
    } else if (error.request) {
      throw new Error("Không nhận được phản hồi từ máy chủ");
    } else {
      throw new Error(error.message || "Lỗi khi gọi API tạo thanh toán VNPay");
    }
  }
};
