import { Button, Form, Input, message, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../api/admin/customers";
import { User } from "../../types";

const { Option } = Select;

const Customers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open modal for editing
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
    form.setFieldsValue(user);
  };

  // Open modal for creating
  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  // Show delete modal
  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Delete user
  const handleDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteUser(userToDelete);
      setUsers((prev) => prev.filter((u) => u.userId !== Number(userToDelete)));
      message.success("Đã xóa người dùng");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Xóa thất bại:", error);
      message.error("Xóa thất bại");
    }
  };
  
  // Submit form for create/update
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser && editingUser.userId) {
        const updated = await updateUser(String(editingUser.userId), values);
        setUsers((prev) =>
          prev.map((u) => (u.userId === updated.userId ? updated : u)),
        );
        message.success("User updated");
      } else {
        const newUser = await createUser(values);
        setUsers((prev) => [...prev, newUser]);
        message.success("User created");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <li className="text-xl text-gray-700">Customers</li>
        <Button type="primary" onClick={handleAdd}>
          Add New User
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="max-h-[800px] overflow-y-auto">
          <table className="min-w-full overflow-hidden rounded-lg border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-700 text-sm text-white">
                <th className="px-6 py-3 text-center">Name</th>
                <th className="px-6 py-3 text-center">Email</th>
                <th className="px-6 py-3 text-center">Phone</th>
                <th className="px-6 py-3 text-center">Create At</th>
                <th className="px-6 py-3 text-center">Update At</th>
                <th className="px-6 py-3 text-center">Role</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 bg-white text-xs text-black transition hover:bg-gray-100"
                >
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3 text-center">{user.email}</td>
                  <td className="px-6 py-3 text-center">{user.phoneNumber}</td>
                  <td className="px-6 py-3 text-center">
                    {dayjs(user.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {dayjs(user.updatedAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-3 text-center capitalize">
                    {user.role === "customer" ? (
                      <span className="mx-auto text-green-500">Customer</span>
                    ) : (
                      <span className="font-medium text-red-500">
                        Photographer
                      </span>
                    )}
                  </td>
                  <td className="space-x-2 px-6 py-3 text-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(String(user.userId))}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Create/Edit */}
          <Modal
            title={editingUser ? "Edit User" : "Add User"}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={handleSubmit}
            okText={editingUser ? "Update" : "Create"}
          >
            <Form layout="vertical" form={form}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="Nhập tên của bạn" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input placeholder="Nhập email của bạn" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select>
                  <Option value="customer">Customer</Option>
                  <Option value="photographer">Photographer</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>

          {/* Modal for Delete */}
          <Modal
            title="Xác nhận xóa người dùng"
            open={isDeleteModalOpen}
            onCancel={() => setIsDeleteModalOpen(false)}
            onOk={handleDelete}
            okText="Xóa"
            okType="danger"
            cancelText="Hủy"
          >
            <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Customers;