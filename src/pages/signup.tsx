import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Schema } from "yup"; // 👈 sửa thành Schema
import * as yup from "yup";
import { registerUser } from "../api/register";
import { SignupRQ } from "../types";

const schema: Schema<SignupRQ> = yup.object({
  username: yup.string().required("Vui lòng nhập tên").trim(),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email").trim(),
  phone: yup.string().required("Vui lòng nhập số điện thoại").trim(),
  password: yup.string().required("Vui lòng nhập mật khẩu").trim(),
  profilePic: yup.string().url("URL không hợp lệ").required("Vui lòng nhập link ảnh đại diện").trim(),
  role: yup.mixed<"customer" | "photographer">()
    .oneOf(["customer", "photographer"], "Vai trò không hợp lệ")
    .default("customer")
}).required();

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<SignupRQ>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { role: "customer" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const profilePicUrl = watch("profilePic");
  const navigate = useNavigate();

  const onSubmit = async (data: SignupRQ) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Đảm bảo URL hợp lệ
      const profileUrl = data.profilePic.trim();
      if (
        !profileUrl.startsWith("http://") &&
        !profileUrl.startsWith("https://")
      ) {
        data.profilePic = "https://" + profileUrl;
      }

      const result = await registerUser(data);
      setIsLoading(false);

      if (result.success) {
        toast.success("Đăng ký thành công!", { position: "top-right" });
        console.log("Đăng ký thành công:", result.data);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        let errorMessage = "Đăng ký thất bại! Vui lòng kiểm tra lại.";

        if (result.message && result.message.includes("entity changes")) {
          errorMessage =
            "Lỗi khi lưu thông tin người dùng. Vui lòng kiểm tra URL ảnh đại diện hoặc thử lại sau.";
          setApiError(errorMessage);
        }

        toast.error(errorMessage, { position: "top-right" });
        console.log("Lỗi đăng ký:", result.message);

        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            setError(field.toLowerCase() as keyof SignupRQ, {
              type: "manual",
              message: Array.isArray(messages) ? messages[0] : messages,
            });
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.";
      setApiError(errorMessage);
      toast.error(errorMessage, { position: "top-right" });
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-hidden">
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center font-semibold text-[#9681FA]"
        >
          <IoChevronBackOutline className="h-5 w-5" />
          Back
        </button>
      </div>
      <img
        src="/images/effect/gradient_green_r.png"
        alt="effect"
        className="absolute bottom-0 left-0 -z-10 w-1/2 rotate-180"
      />
      <h1 className="text-center text-4xl font-bold text-black uppercase">
        Be Graphy
      </h1>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col items-center justify-center gap-4"
      >
        {apiError && (
          <div className="w-1/3 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            <p className="text-sm font-bold">{apiError}</p>
          </div>
        )}

        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="absolute inset-0 rounded-full px-6 font-extrabold text-black focus:outline-none"
            />
          </div>
          {errors.username && (
            <span className="text-sm font-bold text-red-500">
              {errors.username?.message}
            </span>
          )}
        </div>

        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("email")}
              autoComplete="email"
              type="email"
              placeholder="Email"
              className="absolute inset-0 rounded-full px-6 font-extrabold text-black focus:outline-none"
            />
          </div>
          {errors.email && (
            <span className="text-sm font-bold text-red-500">
              {errors.email?.message}
            </span>
          )}
        </div>

        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("phone")}
              type="number"
              placeholder="Phone number"
              className="absolute inset-0 rounded-full px-6 font-extrabold text-black focus:outline-none"
            />
          </div>
          {errors.phone && (
            <span className="text-sm font-bold text-red-500">
              {errors.phone?.message}
            </span>
          )}
        </div>

        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("password")}
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              className="absolute inset-0 rounded-full px-6 font-extrabold text-black focus:outline-none"
            />
          </div>
          {errors.password && (
            <span className="text-sm font-bold text-red-500">
              {errors.password?.message}
            </span>
          )}
        </div>

        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("profilePic")}
              type="text"
              placeholder="Profile picture URL"
              className="absolute inset-0 rounded-full px-6 font-extrabold text-black focus:outline-none"
            />
          </div>
          {errors.profilePic && (
            <span className="text-sm font-bold text-red-500">
              {errors.profilePic?.message}
            </span>
          )}

          {profilePicUrl && !errors.profilePic && (
            <div className="mt-2 flex justify-center">
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#9681FA]">
                <img
                  src={profilePicUrl}
                  alt="Profile Preview"
                  onError={(e) => {
                    e.currentTarget.src = "/images/default-avatar.png";
                    e.currentTarget.onerror = null;
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-1 w-full text-center text-xs text-gray-500">
                {profilePicUrl.startsWith("http")
                  ? ""
                  : 'Chú ý: URL sẽ được thêm "https://" nếu thiếu'}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              {...register("role")}
              type="radio"
              value="customer"
              defaultChecked
              className="h-4 w-4"
            />
            <span className="font-bold text-black">Customer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              {...register("role")}
              type="radio"
              value="photographer"
              className="h-4 w-4"
            />
            <span className="font-bold text-black">Photographer</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 rounded-full bg-transparent px-12 py-3 font-bold text-[#6AD3F3] uppercase underline ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Đang xử lý..." : "Be now"}
        </button>
        <span className="font-bold text-black uppercase">
          ALREADY HAVE AN ACCOUNT?{" "}
          <Link to="/login" className="font-bold text-[#6AD3F3] underline">
            Sign in
          </Link>
        </span>
      </form>
    </div>
  );
}
