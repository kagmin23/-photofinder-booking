import { Dropdown, Menu } from "antd";
import { jwtDecode } from "jwt-decode";
import _ from "lodash";
import { useEffect, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { IoNotifications, IoPerson, IoSearch } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
interface CustomJwtPayload {
  UserId: string;
  Email: string;
  Role: string;
  exp: number;
  iss: string;
  aud: string;
}

const userNavItems = [
  {
    name: "Home",
    to: "/user/home",
  },
  {
    name: "Booking",
    to: "/user/package",
  },
  {
    name: "Contact",
    to: "/user/photographer",
  },
  {
    name: "Chat box",
    to: "/messenger",
  },
];

const photographerNavItems = [
  {
    name: "Home",
    to: "/photographer/home",
  },
  {
    name: "Packages",
    to: "/photographer/package",
  },
  {
    name: "Contact",
    to: "/photographer/photographer",
  },
  {
    name: "Chat box",
    to: "/photographer/messenger",
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState("user"); // Default role
  const [navBar, setNavBar] = useState(userNavItems);

  useEffect(() => {
    // Get token and determine user role on component mount
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        const role = decoded.Role?.toLowerCase() || "user";
        setUserRole(role);

        // Set navigation items based on role
        if (role === "photographer") {
          setNavBar(photographerNavItems);
        } else if (role === "customer" || role === "user") {
          setNavBar(userNavItems);
        } else {
          // Default to user navigation items for any other role
          console.warn(
            `Unknown role detected: ${role}, defaulting to user navigation`
          );
          setNavBar(userNavItems);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Default to user navigation if token can't be decoded
        setNavBar(userNavItems);
      }
    }
  }, []);

  const handleDashboard = () => {
    // Navigate to role-specific profile page
    if (userRole === "photographer") {
      navigate("/photographer/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  const handleTransactions = () => {
    // Navigate to role-specific profile page
    if (userRole === "photographer") {
      navigate("/photographer/transactions");
    } else {
      navigate("/user/transactions");
    }
  };

  const handleLogout = () => {
    // Clear auth token from localStorage
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleProfile = () => {
    // Navigate to role-specific profile page
    if (userRole === "photographer") {
      navigate("/photographer/profile");
    } else {
      navigate("/user/profile");
    }
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <button
              onClick={handleDashboard}
              className="flex w-full flex-row items-center gap-1.5 px-2 text-left hover:bg-gray-200"
            >
              <GrAnalytics /> Dashboard
            </button>
          ),
        },
        {
          key: "1",
          label: (
            <button
              onClick={handleTransactions}
              className="flex w-full flex-row items-center gap-1.5 px-2 text-left hover:bg-gray-200"
            >
              <AiOutlineTransaction /> Transactions
            </button>
          ),
        },
        {
          key: "2",
          label: (
            <button
              onClick={handleProfile}
              className="flex w-full flex-row items-center gap-1.5 px-2 text-left hover:bg-gray-200"
            >
              <FaUser /> Profile
            </button>
          ),
        },
        {
          key: "3",
          label: (
            <button
              onClick={handleLogout}
              className="flex w-full flex-row items-center gap-1.5 px-2 text-left hover:bg-gray-200"
            >
              <FaSignOutAlt />
              Đăng xuất
            </button>
          ),
        },
      ]}
    />
  );

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-[#cafbda] to-[#9bc1fb] px-4">
      <nav className="ml-6 space-x-10 p-3">
        {_.map(navBar, (nav, index) => (
          <NavLink to={nav.to} key={index} className="p-3 text-white">
            <span className="font-bold text-black uppercase">{nav.name}</span>
          </NavLink>
        ))}
      </nav>
      <nav className="flex items-center justify-end gap-7 p-3 text-black">
        <IoNotifications className="size-8 cursor-pointer" />
        <IoSearch className="size-8 cursor-pointer" />
        <Dropdown
          overlay={menu}
          trigger={["hover"]}
          open={open}
          onOpenChange={setOpen}
        >
          <IoPerson className="size-8 cursor-pointer" />
        </Dropdown>
      </nav>
    </header>
  );
};
