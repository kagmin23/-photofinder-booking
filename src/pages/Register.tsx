// src/components/Register.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { registerUser } from "../api/register";
import { RegisterRQ } from "../types";

const schema = object({
  name: string().required("Tên là bắt buộc"),
  email: string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: string().required("Mật khẩu là bắt buộc"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterRQ>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterRQ) => {
    const result = await registerUser(data);
    
    if (result.success) {
      console.log('Đăng ký thành công:', result.data);
      // Có thể thêm redirect hoặc thông báo thành công
      // Ví dụ: window.location.href = '/login';
    } else {
      console.log('Lỗi đăng ký:', result.message);
      
      // Xử lý lỗi từ API
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field.toLowerCase() as keyof RegisterRQ, {
            type: 'manual',
            message: Array.isArray(messages) ? messages[0] : messages,
          });
        });
      }
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
        className="absolute top-0 right-0 -z-10 w-1/2"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col items-center justify-center gap-4"
      >
        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              placeholder="NAME"
              className="focus:shadow-outline absolute inset-0 rounded-full px-6 leading-tight font-extrabold text-black focus:outline-none"
            />
          </div>
          {errors.name && (
            <span className="px-4 text-sm font-bold text-red-500">
              {errors.name?.message}
            </span>
          )}
        </div>

        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              placeholder="EMAIL"
              className="focus:shadow-outline absolute inset-0 rounded-full px-6 leading-tight font-extrabold text-black focus:outline-none"
            />
          </div>
          {errors.email && (
            <span className="px-4 text-sm font-bold text-red-500">
              {errors.email?.message}
            </span>
          )}
        </div>

        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              placeholder="PASSWORD"
              className="focus:shadow-outline absolute inset-0 rounded-full px-6 leading-tight font-extrabold text-black focus:outline-none"
            />
          </div>
          {errors.password && (
            <span className="px-4 text-sm font-bold text-red-500">
              {errors.password?.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer rounded-full bg-white px-12 py-3 text-2xl font-bold text-[#6AD3F3] uppercase underline active:bg-indigo-500"
        >
          Be now
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