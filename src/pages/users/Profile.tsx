import { Card, Button, Modal, Form, Input, Divider } from "antd";
import { Navigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { selectCurrenttoken } from "../../redux/features/auth/AuthSlice";
import {
  useChangePasswordMutation,
  useGetSingleUserQuery,
} from "../../redux/features/users/users.api";
import { useAppSelector } from "../../redux/features/hook";
import { VerifyToken } from "../../utils/verifyToken";
import { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const token = useAppSelector(selectCurrenttoken);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user = VerifyToken(token) as {
    email: string;
    name: string;
    role: string;
  } | null;
  if (!user || !user.email) {
    return <Navigate to="/login" replace />;
  }

  const { data: Profile, isFetching } = useGetSingleUserQuery(user.email);
  const [changePassword] = useChangePasswordMutation();
  const ProfileInfo = Profile?.data;

  if (isFetching) {
    return <Loading />;
  }

  const handlePasswordChange = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const toastId = toast.loading("🔐 Updating Password...");
    try {
      const data = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      const res = await changePassword(data);
      if (res?.data) {
        toast.success("✅ Password updated successfully!", { id: toastId, duration: 2000 });
      } else {
        toast.error("❌ Failed to update password.", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      toast.error("🚫 Something went wrong!", { id: toastId, duration: 2000 });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl p-6 bg-white/90">
        <div className="flex flex-col items-center">
          <img
            src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUD_NAME}/image/upload/v1744903911/usericon_egwp3f.png`}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full shadow-md border-4 border-red-300 mb-4"
          />
          <h2 className="text-3xl font-extrabold text-red-600">
            {ProfileInfo?.name || user.name}
          </h2>
          <p className="text-gray-600 text-sm">{ProfileInfo?.email || user.email}</p>
          <p className="mt-2 text-red-500 uppercase tracking-wide text-sm font-semibold">
            {ProfileInfo?.role || user.role}
          </p>
          <Divider className="my-6 border-red-200" />
          <div className="text-left w-full space-y-2">
            <p><span className="font-semibold text-red-500">Joined On:</span> Jan 12, 2024</p>
            <p><span className="font-semibold text-red-500">Last Activity:</span> 3 days ago</p>
            <p><span className="font-semibold text-red-500">Membership:</span> Premium User</p>
          </div>
          <Button
            className="mt-6 w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium shadow"
            onClick={() => setIsModalOpen(true)}
          >
            Change Password
          </Button>
        </div>
      </Card>

      <Modal
        title={
          <h3 className="text-xl font-semibold text-red-500">🔒 Change Your Password</h3>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="rounded-xl"
        centered
        bodyStyle={{ padding: 24, borderTop: "2px solid #f87171" }}
      >
        <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item
            label={<span className="text-red-500">Current Password</span>}
            name="currentPassword"
            rules={[{ required: true, message: "Please enter your current password!" }]}
          >
            <Input.Password className="border-red-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-red-500">New Password</span>}
            name="newPassword"
            rules={[{ required: true, message: "Please enter a new password!" }]}
          >
            <Input.Password className="border-red-300" />
          </Form.Item>
          <Button
            htmlType="submit"
            className="w-full mt-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold shadow-lg"
          >
            Update Password
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
