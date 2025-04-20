import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router";
import { useGetPackageById } from "../api/package";
import { useGetUser } from "../data/user";
import { InferType, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createPayment } from "../data";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

let schema = object({
  email: string().email().required().trim(),
  shootingPackage: string().required().trim(),
  dateTaken: string().required().trim(),
  price: number().required(),
})

type BookingType = InferType<typeof schema>;

const resolver = yupResolver(schema);

export default function BookingId() {
  const { id } = useParams();
  const { token } = useGetUser();
  const getPackageById = useGetPackageById(token || "", id || "");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BookingType>({
    resolver,
    mode: 'onChange',
  });

  const onSubmit = async (data: BookingType) => {
    console.log(data);
    try {
      let response = await createPayment(token || "", {
        bookingId: id || "",
      })

      if (response) {
        window.open(response.url, "_blank");
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(`Đã xảy ra lỗi. Vui lòng thử lại. Error: ${error.message}`);
    }
  }

  useEffect(() => {
    setValue('shootingPackage', getPackageById.data?.packageName || "");
    setValue('price', getPackageById.data?.price || 0);
  }, [getPackageById.data])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 z-50 w-full border-b bg-white px-6 py-4">
        <Link
          to="/user/package"
          className="inline-flex items-center font-semibold text-[#9681FA]"
        >
          <IoChevronBackOutline className="h-5 w-5" />
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-1/3 bg-gradient-to-r from-[#fff5b0] to-[#ffadf5] p-5">
        <h3 className="text-2xl font-bold text-center uppercase text-black pt-8">
          Booking now
        </h3>
        <div className="w-full flex flex-col">
          <input
            {...register("shootingPackage")}
            type="text"
            placeholder="Shooting Package"
            className="text-black font-bold placeholder:text-black placeholder:font-bold focus:outline-0 bg-[#9681fa] rounded-3xl px-5 py-4"
          />
          {errors.shootingPackage && (
            <span className="text-red-500 font-bold text-sm">{errors.shootingPackage?.message}</span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <input
            type="datetime-local"
            {...register("dateTaken")}
            placeholder="Date taken"
            className="text-black font-bold placeholder:text-black placeholder:font-bold focus:outline-0 bg-[#9681fa] rounded-3xl px-5 py-4"
          />
          {errors.dateTaken && (
            <span className="text-red-500 font-bold text-sm">{errors.dateTaken?.message}</span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <input
            type="text"
            {...register("email")}
            placeholder="Email"
            className="text-black font-bold placeholder:text-black placeholder:font-bold focus:outline-0 bg-[#9681fa] rounded-3xl px-5 py-4"
          />
          {errors.email && (
            <span className="text-red-500 font-bold text-sm">{errors.email?.message}</span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <input
            type="number"
            {...register("price")}
            placeholder="Price"
            className="text-black font-bold placeholder:text-black placeholder:font-bold focus:outline-0 bg-[#9681fa] rounded-3xl px-5 py-4"
          />
          {errors.price && (
            <span className="text-red-500 font-bold text-sm">{errors.price?.message}</span>
          )}
        </div>
        <button type="submit" className="bg-[#9681fa] w-[200px] text-white font-semibold text-2xl rounded-2xl p-4 self-center uppercase">
          Be Graphy Now
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}