import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Space, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackDashboard = () => {
    navigate("/user/dashboard");
  };

  const handleBackHome = () => {
    navigate("/user/home");
  };

  const handleViewInvoice = () => {
    navigate("#");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-8">
      <Card
        className="max-w-md w-full shadow-xl rounded-2xl border-0 overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* Success header band */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-6 px-6 text-center">
          <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-md">
            <CheckCircleOutlined
              style={{ fontSize: "40px", color: "#10b981" }}
            />
          </div>
          <Title level={3} className="text-white mt-4 mb-1">
            Thanh toán thành công!
          </Title>
          <Text className="text-white opacity-90">
            Giao dịch của bạn đã được xác nhận
          </Text>
        </div>

        {/* Content section */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-5">
            <Paragraph className="text-gray-600 mb-3">
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
            </Paragraph>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Text className="text-gray-500">Mã giao dịch:</Text>
                <Text className="font-medium">
                  TXN-{Math.floor(100000 + Math.random() * 900000)}
                </Text>
              </div>
              <Divider className="my-1" />
              <div className="flex justify-between">
                <Text className="text-gray-500">Thời gian:</Text>
                <Text className="font-medium">
                  {new Date().toLocaleString("vi-VN")}
                </Text>
              </div>
              <Divider className="my-1" />
              <div className="flex justify-between items-center">
                <Text className="text-gray-500">Phương thức:</Text>
                <div className="flex items-center">
                  <img
                    src="/vnpay-logo.png"
                    alt="VNPAY"
                    className="h-6 mr-2"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s";
                      e.currentTarget.onerror = null;
                    }}
                  />
                  <Text className="font-medium">VNPAY</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Success message */}
          <div className="text-center mb-6">
            <Title level={4} className="font-bold">
              Dịch vụ của bạn đã được xác nhận!
            </Title>
            <Paragraph className="text-gray-600">
              Bạn có thể truy cập để xem thông tin dịch vụ ngay bây giờ.
            </Paragraph>
          </div>

          {/* Buttons section */}
          <Space direction="vertical" size="middle" className="w-full">
            <Button
              type="primary"
              block
              size="large"
              onClick={handleBackDashboard}
              className="h-10 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-500 border-0 hover:opacity-90"
            >
              Đi đến Dashboard
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={handleViewInvoice}
                className="flex-1 h-9 rounded-lg border-gray-300"
              >
                Xem hóa đơn
              </Button>
              <Button
                onClick={handleBackHome}
                className="flex-1 h-9 rounded-lg border-gray-300"
              >
                Trang chủ
              </Button>
            </div>
          </Space>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Text className="text-gray-400 text-xs">
              Gặp sự cố?{" "}
              <a
                href="/support"
                className="text-green-500 hover:text-green-600"
              >
                Liên hệ hỗ trợ
              </a>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
