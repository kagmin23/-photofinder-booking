import _ from "lodash";
import { IoAdd, IoStar, IoThumbsUp } from "react-icons/io5";

const projects = [
  {
    imgUrl: "/images/landscape/landscape-2.png",
    title: "Project 1",
  },
  {
    imgUrl: "/images/landscape/landscape-2.png",
    title: "Project 1",
  },
  {
    imgUrl: "/images/landscape/landscape-2.png",
    title: "Project 1",
  },
];

export default function Profile() {
  return (
    <div className="mb-8 flex h-screen w-full items-center justify-between gap-2">
      {/* <img src="/images/landscape/landscape-1.png" alt="background" className=" absolute w-full h-1/3 top-10 aspect-[820/468] -z-10" /> */}
      {/* <img src="/images/home/img-1.png" alt="background" className="rotate-y-180" /> */}
      <div className="flex w-1/3 flex-col items-center justify-center gap-4 px-4">
        <img
          src="/images/sample/profile-1.png"
          alt="profile"
          className="w-full"
        />
        <div className="w-full space-y-6">
          <div className="w-full rounded-full bg-[#9681fa] px-4 py-2 text-center text-2xl font-bold text-black uppercase">
            Name
          </div>
          <div className="w-full rounded-full bg-[#9681fa] px-4 py-2 text-center text-2xl font-bold text-black uppercase">
            Date
          </div>
          <div className="w-full rounded-full bg-[#9681fa] px-4 py-2 text-center text-2xl font-bold text-black uppercase">
            Email
          </div>
        </div>
        <div className="flex items-center gap-4">
          <IoThumbsUp className="size-6 text-black" />
          <div className="flex items-center gap-1">
            {_.map([0, 1, 2, 3, 4], (index) => (
              <IoStar key={index} className="size-6 text-[#5ce1e6]" />
            ))}
          </div>
        </div>
        <button className="w-full rounded-2xl bg-gradient-to-r from-[#fff2b3] to-[#ffb1f2] px-8 py-4 text-2xl font-bold text-black uppercase">
          Booking now
        </button>
        <button className="w-full rounded-2xl bg-gradient-to-r from-[#fff2b3] to-[#ffb1f2] px-8 py-4 text-2xl font-bold text-black">
          Chat now
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {_.map(projects, (project, index) => (
          <div key={index}>
            <img src={project.imgUrl} alt={project.title} />
          </div>
        ))}
        <div className="flex items-center justify-center rounded-3xl bg-gradient-to-r from-[#fff1b2] to-[#ffadf6]">
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              title="Add New Picture"
              className="rounded-3xl bg-gradient-to-r from-[#cce5df] to-[#b5c4f4] px-10 py-4"
            >
              <IoAdd className="size-8 text-white" />
            </button>
            <span className="text-md font-bold text-[#9681FA] uppercase">
              New Picture
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
