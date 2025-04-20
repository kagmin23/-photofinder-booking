// pages/dashboard.tsx

import { Line } from "@ant-design/charts";
import { Card, Col, Row, Statistic, message } from "antd";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getUserBookingAnalytics } from "../../api/userDashboard/bookingAnalytics";
import { BookingAnalytics } from "../../types";

const UserDashboard = () => {
  const [analytics, setAnalytics] = useState<BookingAnalytics>({
    bookingAna: {},
    incomeAna: {},
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getUserBookingAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        message.error("Failed to load analytics!");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const months = Object.keys(analytics.bookingAna).sort(
    (a, b) => Number(a) - Number(b),
  );
  const totalBookings = months.reduce(
    (sum, month) => sum + analytics.bookingAna[month],
    0,
  );
  const totalIncome = months.reduce(
    (sum, month) => sum + analytics.incomeAna[month],
    0,
  );

  const bookingData = months.map((month) => ({
    month: `Tháng ${month}`,
    value: analytics.bookingAna[month],
    type: "Bookings",
  }));

  const incomeData = months.map((month) => ({
    month: `Tháng ${month}`,
    value: analytics.incomeAna[month],
    type: "Income",
  }));

  const chartData = [...bookingData, ...incomeData];

  const config = {
    data: chartData,
    xField: "month",
    yField: "value",
    seriesField: "type",
    smooth: true,
    height: 300,
    color: ["#3f8600", "#cf1322"],
    tooltip: {
      showMarkers: false,
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#cafbda] to-[#9bc1fb] p-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 inline-flex items-center font-semibold text-[#9681FA]"
      >
        <IoChevronBackOutline className="mr-1 h-5 w-5" />
        Back
      </button>

      <h2 className="mt-9 mb-5 bg-gradient-to-r text-center from-[#6C63FF] via-[#9681FA] to-[#B8B8FF] bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-md">
        Dashboard Analysis Bookings
      </h2>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card loading={loading}>
            <Statistic
              title="Total Bookings"
              value={totalBookings}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={loading}>
            <Statistic
              title="Total Income ($)"
              value={totalIncome}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-6">
        <Card title="Monthly Analytics" loading={loading}>
          <Line {...config} />
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
