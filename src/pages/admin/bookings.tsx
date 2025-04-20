import { Table, Tag, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getAllBookings } from "../../api/admin/bookings";
import { Booking } from "../../types";
import './styles.css';

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getAllBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        message.error("Failed to load bookings!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Photographer ID",
      dataIndex: "photographerId",
      key: "photographerId",
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Location",
      dataIndex: "eventLocation",
      key: "eventLocation",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as "center",
      render: (status: string) => {
        const color = status === "confirmed" ? "green" : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Total Price ($)",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center" as "center",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center" as "center",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div className="p-4">
      <li className="mb-4 text-xl text-gray-700">Transaction History</li>
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="bookingId"
        bordered
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="ant-table-xs"
      />
    </div>
  );
};

export default Bookings;
