import _ from "lodash";
import {
  IoAddCircleOutline,
  IoCloseOutline,
  IoSearch,
  IoSettingsOutline,
} from "react-icons/io5";

export default function Album() {
  return (
    <div className="flex flex-col gap-10 p-20">
      <div className="flex justify-between">
        <div className="relative w-full">
          <IoSearch className="absolute top-1/2 ml-3 size-5 -translate-y-1/2 text-black" />
          <input
            type="text"
            name="search"
            id="search"
            className="w-1/2 rounded-md bg-[#93DDD4] py-4 pr-4 pl-10 text-black focus:outline-0"
          />
        </div>
        <div className="flex items-center gap-4">
          <IoAddCircleOutline className="size-10 cursor-pointer text-black" />
          <IoSettingsOutline className="size-10 cursor-pointer text-black" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 rounded-xl bg-[#93DDD4] p-6">
        <div className="relative w-1/4">
          <IoSettingsOutline className="absolute right-0 bottom-0 mr-4 mb-4 size-6 -translate-x-2/3 -translate-y-2/3 cursor-pointer text-white" />
          <img
            src="/images/landscape/landscape-1.png"
            alt="picture"
            className="w-full"
          />
        </div>
        <div className="flex w-3/4 flex-col gap-4 rounded-md bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-medium text-black uppercase">
              Tên Album
            </span>
            <span className="rounded-md bg-[#93DDD4] px-20 py-4 text-2xl font-medium text-black uppercase">
              Chủ đề
            </span>
          </div>
          <span className="w-full rounded-md bg-[#93DDD4] px-20 py-4 text-2xl font-medium text-black uppercase">
            ĐÂY LÀ DESCRIPTION
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {_.map([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], (item, index) => (
          <div key={index} className="relative space-y-2">
            <IoCloseOutline className="absolute right-0 size-8 -translate-y-1/2 translate-x-2/3 cursor-pointer font-bold text-black" />
            <img src="/images/landscape/landscape-1.png" alt="picture" />
            <div>
              <div className="flex flex-col font-bold text-black">
                <span>Photo style</span>
                <span>Name account</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
