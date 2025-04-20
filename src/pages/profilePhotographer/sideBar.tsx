import _ from "lodash";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Tab } from "../../types";

interface SidebarProps {
  tabs: Tab[];
}

export default function Sidebar({ tabs }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex w-1/3 flex-col items-center gap-6">
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-white p-4 shadow-md">
      <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center font-semibold text-[#9681FA]"
        >
          <IoChevronBackOutline className="mr-1 h-5 w-5" />
          Back
        </button>
      </div>
      <div
        style={{
          backgroundImage: "url('/images/landscape/landscape-1.png')",
        }}
        className="relative mt-16 mb-16 flex aspect-[501/369] w-auto flex-col items-center justify-end bg-cover bg-center"
      >
        <img
          src="/images/sample/avatar.png"
          alt="avatar"
          className="w-1/3 rounded-full border-8"
        />
      </div>
      {_.map(tabs, (tab, index) => (
        <div
          key={index}
          className="w-52 cursor-pointer rounded-full bg-[#93ddd4] py-8 text-center"
        >
          <span className="text-lg font-medium text-black uppercase">
            {tab.name}
          </span>
        </div>
      ))}
    </div>
  );
}