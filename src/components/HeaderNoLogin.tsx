import _ from "lodash";
import { NavLink } from "react-router-dom";

const navBar = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Booking",
    to: "/login",
  },
  {
    name: "Pictures",
    to: "#",
  },
  {
    name: "Contact us",
    to: "#",
  },
  {
    name: "Chat box",
    to: "/login",
  },
];

export const HeaderNoLogin = () => {
  return (
    <header className="flex flex-row justify-between bg-gradient-to-r from-[#cafbda] to-[#9bc1fb]">
      <div>
        <nav className="ml-6 space-x-10 p-3">
          {_.map(navBar, (nav, index) => (
            <NavLink to={nav.to} key={index} className="p-3 text-white">
              <span className="font-bold text-black uppercase">{nav.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      {/* <div className="flex flex-row cursor-pointer space-x-7 p-3 text-black text-2xl">
        <BiSolidBellRing />
        <BiSearchAlt />
        <FaUserAlt />
      </div> */}
    </header>
  );
};
