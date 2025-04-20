import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, loginUser } from "../api/login";
import { LoginRQ } from "../types";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Hardcoded admin account
  const adminAccount = {
    email: "admin@gmail.com",
    password: "123", // Add password for comparison
    role: "admin",
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRQ>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginRQ) => {
    try {
      setIsLoading(true);
      setLoginError(null);

      // Check if this is the hardcoded admin account
      if (data.email === adminAccount.email && data.password === adminAccount.password) {
        // Create a mock token or use a placeholder
        const mockAdminToken = "admin-mock-token";
        localStorage.setItem("authToken", mockAdminToken);
        
        // Store admin profile
        const adminProfile = {
          userId: "admin-id",
          email: adminAccount.email,
          name: "Admin User",
          role: adminAccount.role,
        };
        
        localStorage.setItem("userProfile", JSON.stringify(adminProfile));
        
        // Navigate to admin dashboard
        navigate("/admin/dashboard/wallet");
        return;
      }

      // Normal login flow for non-admin accounts
      const response = await loginUser(data);
      if (response.success) {
        const { accessToken } = response.data || {};

        if (accessToken) {
          localStorage.setItem("authToken", accessToken);

          // Decode JWT token to get user role
          try {
            const decoded: any = jwtDecode(accessToken);

            // Extract user information directly from the JWT if profile API is not working
            const userInfo = {
              userId: decoded.UserId || decoded.userId || decoded.sub,
              email: decoded.Email || decoded.email,
              name: decoded.Name || decoded.name,
              role: decoded.Role || decoded.role,
            };

            // Try to fetch complete profile, but don't block navigation if it fails
            try {
              const profileResponse = await getProfile();
              if (profileResponse !== null) {
                localStorage.setItem(
                  "userProfile",
                  JSON.stringify(profileResponse),
                );
              } else {
                console.warn(
                  "Could not fetch detailed profile, using JWT data only",
                );
              }
            } catch (profileError) {
              console.warn(
                "Profile fetch failed, continuing with JWT data only",
                profileError,
              );
            }

            const userRole = decoded.Role?.toLowerCase() || decoded.role?.toLowerCase();
            
            // Navigate based on role
            if (userRole === "photographer") {
              navigate("/photographer/home");
            } else if (userRole === "customer" || userRole === "user") {
              navigate("/user/home");
            } else {
              setLoginError("Không thể xác định vai trò người dùng");
            }
          } catch (decodeError) {
            console.error("Token decode error:", decodeError);
            setLoginError("Lỗi xác thực token, vui lòng đăng nhập lại");
          }
        } else {
          setLoginError("Không nhận được token xác thực");
        }
      } else {
        setLoginError(response.message || "Đăng nhập thất bại");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-hidden">
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <Link
          to={"/"}
          className="flex items-center gap-1 font-bold text-[#9681FA]"
        >
          <IoChevronBackOutline className="mt-1 size-5" />
          Back
        </Link>
      </div>
      <img
        src="/images/effect/gradient_green_r.png"
        alt="effect"
        className="absolute top-0 right-0 -z-10 w-1/2"
      />
      <h1 className="text-center text-4xl font-bold text-black uppercase">
        Be Graphy
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col items-center justify-center gap-4"
      >
        {loginError && (
          <div className="w-1/3 rounded bg-red-100 p-3 text-center font-bold text-red-700">
            {loginError}
          </div>
        )}

        <div className="w-1/3 space-y-1">
          <div className="relative">
            <img src="/images/background/bg_input.png" alt="input background" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              name="email"
              id="email"
              placeholder="EMAIL"
              className="focus:shadow-outline absolute inset-0 rounded-full px-6 leading-tight font-extrabold text-black focus:outline-none"
              disabled={isLoading}
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
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              name="password"
              id="password"
              placeholder="PASSWORD"
              className="focus:shadow-outline absolute inset-0 rounded-full px-6 leading-tight font-extrabold text-black focus:outline-none"
              disabled={isLoading}
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
          disabled={isLoading}
          className={`mt-4 rounded-full px-12 py-3 font-bold text-white uppercase ${
            isLoading
              ? "cursor-not-allowed bg-indigo-300"
              : "cursor-pointer bg-indigo-400 active:bg-indigo-500"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 animate-spin text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Đang xử lý...
            </div>
          ) : (
            "Log in"
          )}
        </button>
        <span className="font-bold text-black uppercase">
          Create account?{" "}
          <Link to="/signup" className="font-bold text-[#6AD3F3] underline">
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
}