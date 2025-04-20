import { Route, Routes } from "react-router-dom";
import NotFound from "../../components/NotFound";
import Bookings from './bookings';
import Customers from "./customers";
import Sidebar from "./sidebar";
import Wallet from "./wallet";

function Dashboard() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-screen">
        <Routes>
          <Route path="customers" element={<Customers />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="bookings" element={<Bookings />} />
          
          <Route index element={<Wallet />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;