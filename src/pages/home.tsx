import _ from "lodash";
import {
    IoArrowForward,
    IoChevronBack,
    IoOptionsOutline,
    IoSearchOutline
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Footer, Header, PhotoPost } from "../components";

const landscape = [
  {
    imgUrl: "/images/landscape/landscape-1.png",
    title: "Landscape 1",
    author: "Author 1",
  },
  {
    imgUrl: "/images/landscape/landscape-2.png",
    title: "Landscape 2",
    author: "Author 2",
  },
  {
    imgUrl: "/images/landscape/landscape-3.png",
    title: "Landscape 3",
    author: "Author 3",
  },
  {
    imgUrl: "/images/landscape/landscape-4.png",
    title: "Landscape 4",
    author: "Author 4",
  },
  {
    imgUrl: "/images/landscape/landscape-5.png",
    title: "Landscape 5",
    author: "Author 5",
  },
  {
    imgUrl: "/images/landscape/landscape-6.png",
    title: "Landscape 6",
    author: "Author 6",
  },
];

const food = [
  {
    imgUrl: "/images/food/food-1.png",
    title: "Food 1",
    author: "Author 1",
  },
  {
    imgUrl: "/images/food/food-2.png",
    title: "Food 2",
    author: "Author 2",
  },
  {
    imgUrl: "/images/food/food-3.png",
    title: "Food 3",
    author: "Author 3",
  },
];

export default function Home() {

  return (
    <div className="flex h-full w-full flex-col pb-10">
      <Header />
      <div className="relative flex h-full w-full flex-col justify-between">
        <div className="flex w-1/2 flex-col">
          <img
            src="/images/home/img-1.png"
            alt="image1"
            className="aspect-[1366/512] h-full w-full"
          />
          <div className="mt-5 ml-20 flex w-full flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-nowrap text-black uppercase md:text-8xl">
              Be Graphy
            </h1>
            <span className="text-md text-black md:text-2xl">
              "Be your beautiful moment"
            </span>
          </div>
        </div>
        <div className="flex w-1/2 flex-col">
          <div
            style={{
              backgroundImage: "url(/images/home/img-2.png)",
            }}
            className="aspect-[1171/690] h-full w-full bg-cover bg-center p-4"
          >
            <div className="flex flex-col items-center justify-start gap-4">
              <div className="mt-4 flex max-w-[200px] translate-x-1/4 items-center justify-between gap-2 rounded-full border-1 border-cyan-400 pl-2">
                <span className="text-md font-semibold text-nowrap">
                  Booking Now
                </span>
                <button className="relative h-full w-full cursor-pointer pl-1">
                  <img
                    src="/images/button/btn_gradient_blue_xs.png"
                    alt="button"
                    className="h-full w-[89px]"
                  />
                  <IoArrowForward className="absolute top-1/3 left-1/3 size-5 translate-x-1/2" />
                </button>
              </div>
              {/* <div className="flex justify-around md:pt-12">
                <img
                  src="/images/button/btn_signup.png"
                  alt="signup"
                  className="h-full w-1/4 cursor-pointer"
                  onClick={() => navigate("/signup")}
                />
                <img
                  src="/images/button/btn_login.png"
                  alt="login"
                  className="h-full w-1/4 cursor-pointer"
                  onClick={() => navigate("/login")}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 flex translate-x-1/2 items-end">
          <div className="relative w-1/2">
            <img
              src="/images/home/bg_gradient.png"
              alt=""
              className="absolute right-0 bottom-0 -z-10 w-2/3 translate-y-[-10%]"
            />
            <img
              src="/images/home/img-3.png"
              alt="image3"
              className="z-10 w-full"
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute z-20">
          <Link
            to={"/"}
            className="z-20 flex items-center pt-2 pl-4 font-semibold text-[#9681FA] underline"
          >
            <IoChevronBack className="mt-1" />
            <span>Back</span>
          </Link>
        </div>
        <img
          src="/images/effect/gradient_green.png"
          alt="effect"
          className="absolute z-10"
        />
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="mt-8 w-1/2 rounded-full bg-gradient-to-r from-[#cafcda] to-[#99bffc] px-6 py-4">
            <span className="flex items-center justify-center text-2xl font-bold text-black uppercase">
              About us
            </span>
          </div>
          <div className="flex items-center justify-between gap-6 overflow-x-auto px-6">
            <div className="relative w-1/2">
              <img
                src="/images/home/bg_gradient_rounded_lg.png"
                alt="about us"
                className=""
              />
              <img
                src="/images/home/camera-animated.png"
                alt="about us"
                className="absolute inset-0 top-1/4 left-1/4 w-1/2"
              />
            </div>
            <div className="relative w-1/2">
              <img
                src="/images/home/bg_gradient_rounded_lg.png"
                alt="about us"
                className=""
              />
              <img
                src="/images/home/camera-animated.png"
                alt="about us"
                className="absolute inset-0 top-1/4 left-1/4 w-1/2"
              />
            </div>
            <div className="relative w-1/2">
              <img
                src="/images/home/bg_gradient_rounded_lg.png"
                alt="about us"
                className=""
              />
              <img
                src="/images/home/camera-animated.png"
                alt="about us"
                className="absolute inset-0 top-1/4 left-1/4 w-1/2"
              />
            </div>
          </div>
          <Link to={"/"} className="z-20 font-bold text-black underline">
            Next Pages
          </Link>
        </div>
      </div>
      <div className="z-20 pt-10">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex w-fit items-center justify-center gap-2 rounded-r-full bg-gradient-to-r from-[#a4cdf4] to-[#96bbfe] px-6 py-1 text-lg font-bold text-black">
            <IoOptionsOutline className="size-8" />
            <span>Filter</span>
            <div></div>
          </div>
          <div className="flex w-1/2 items-center justify-between gap-2 rounded-full bg-gradient-to-r from-[#cafcda] to-[#99bffc] px-4 py-1 text-lg font-bold text-black">
            <IoSearchOutline className="size-8" />
            <span>Landscape</span>
            <div></div>
          </div>
          <div className="flex w-fit items-center justify-center gap-2 rounded-l-full bg-gradient-to-r from-[#a4cdf4] to-[#bbe9e4] px-6 py-1 text-lg font-bold text-black">
            <span>Recommend</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 px-4 pt-8">
          {_.map(landscape, (item, index) => (
            <PhotoPost key={index} {...item} actionButtons />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 px-4 pt-20">
          {_.map(landscape, (item, index) => (
            <PhotoPost key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="pt-10">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex w-fit items-center justify-center gap-2 rounded-r-full bg-gradient-to-r from-[#a4cdf4] to-[#96bbfe] px-6 py-1 text-lg font-bold text-black">
            <IoOptionsOutline className="size-8" />
            <span>Filter</span>
            <div></div>
          </div>
          <div className="flex w-1/2 items-center justify-between gap-2 rounded-full bg-gradient-to-r from-[#cafcda] to-[#99bffc] px-4 py-1 text-lg font-bold text-black">
            <IoSearchOutline className="size-8" />
            <span>Food</span>
            <div></div>
          </div>
          <div className="flex w-fit items-center justify-center gap-2 rounded-l-full bg-gradient-to-r from-[#a4cdf4] to-[#bbe9e4] px-6 py-1 text-lg font-bold text-black">
            <span>Recommend</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 px-4 pt-8">
          {_.map(food, (item, index) => (
            <PhotoPost key={index} {...item} actionButtons />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
