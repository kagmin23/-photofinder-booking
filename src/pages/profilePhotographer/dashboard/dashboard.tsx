// pages/dashboard/PhotographerDashboard.tsx

import { Line } from "@ant-design/charts";
import { Card, Statistic, message } from "antd";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getPhotoGrapherBookingAnalytics } from "../../../api/photographerDashboard/bookingAnalytics";
import { BookingAnalytics } from "../../../types";

const PhotographerDashboard = () => {
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
        const data = await getPhotoGrapherBookingAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        message.error("Failed to load photographer analytics!");
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
    <div className="relative min-h-screen bg-gradient-to-r from-[#ffecd2] to-[#fcb69f] p-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 inline-flex items-center font-semibold text-[#f57c00]"
      >
        <IoChevronBackOutline className="mr-1 h-5 w-5" />
        Back
      </button>

      <h2 className="mt-9 mb-8 bg-gradient-to-r from-[#f57c00] via-[#ff8a65] to-[#ffe0b2] bg-clip-text text-center text-4xl font-extrabold text-transparent drop-shadow-md">
        Photographer Dashboard
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Stats block */}
        <div className="flex h-full flex-col gap-4 lg:col-span-1">
          <Card
            loading={loading}
            className="flex-1 border-l-8 border-[#3f8600] shadow-md"
            bodyStyle={{ height: "100%" }}
          >
            <Statistic
              title="Total Bookings"
              value={totalBookings}
              precision={0}
              valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
            />
          </Card>

          <Card
            loading={loading}
            className="flex-1 border-l-8 border-[#cf1322] shadow-md"
            bodyStyle={{ height: "100%" }}
          >
            <Statistic
              title="Total Income ($)"
              value={totalIncome}
              precision={2}
              valueStyle={{ color: "#cf1322", fontWeight: "bold" }}
            />
          </Card>
        </div>

        {/* Chart block */}
        <div className="h-full lg:col-span-2">
          <Card
            title="📈 Monthly Booking & Income Trend"
            loading={loading}
            className="h-full shadow-md"
            bodyStyle={{ height: "100%" }}
          >
            <Line {...config} />
          </Card>
        </div>
      </div>
      <div className="mt-7">
        <Card title="💬 Latest Client Feedbacks" className="shadow-md">
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="Client"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Emma Nguyen</p>
                <p className="text-sm text-gray-600 italic">
                  “The photos turned out amazing! Will definitely book again.”
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt="Client"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-semibold">David Tran</p>
                <p className="text-sm text-gray-600 italic">
                  “Professional and friendly. Highly recommend!”
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PhotographerDashboard;
