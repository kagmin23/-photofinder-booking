import { Select, Table, Tag, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../api/bookings";
import { BookingResponse } from "../types";

const { Option } = Select;

const UserTransactions = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [filtered, setFiltered] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem("userProfile");
        const customerId = storedUser ? JSON.parse(storedUser).userId : null;

        if (!customerId) {
          return message.error("Không tìm thấy người dùng.");
        }

        const res = await getUserBookings(customerId);
        setBookings(res);
        setFiltered(res);
      } catch (err) {
        console.error(err);
        message.error("Lỗi khi lấy dữ liệu giao dịch.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (statusFilter === "All") {
      setFiltered(bookings);
    } else {
      const filteredData = bookings.filter((b) => b.status === statusFilter);
      setFiltered(filteredData);
    }
  }, [statusFilter, bookings]);

  const columns = [
    {
      title: "Booking",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Photographer",
      dataIndex: "photographerId",
      key: "photographerId",
    },
    {
      title: "Event Location",
      dataIndex: "eventLocation",
      key: "eventLocation",
    },
    {
      title: "Total Price (VND)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => price.toLocaleString("vi-VN") + "₫",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center" as "center",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as "center",
      render: (status: string, record: BookingResponse) => {
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
          <Tag
            color={color}
            className="cursor-pointer hover:opacity-80"
            onClick={() => navigate(`/user/transactions/booking/${record.bookingId}`)}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-[#cafbda] to-[#9bc1fb]">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 inline-flex items-center font-semibold text-[#9681FA]"
      >
        <IoChevronBackOutline className="mr-1 h-5 w-5" />
        Back
      </button>
      <h2 className="bg-gradient-to-r text-center from-[#6C63FF] via-[#9681FA] to-[#B8B8FF] bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-md">
        Transactions
      </h2>

      <div className="mb-4 flex justify-end">
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 200 }}
        >
          <Option value="All">Tất cả trạng thái</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Confirmed">Confirmed</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      </div>

      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="bookingId"
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UserTransactions;
