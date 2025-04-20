import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./layouts";
import Dashboard from "./pages/admin";
import Chatbox from "./pages/chatbox/chatbox";
import MessageList from "./pages/chatbox/messenger";
import UserDashboard from "./pages/dashboardUser/dashboard";
import Home from "./pages/home";
import HomeNoLogin from "./pages/homeNoLogin";
import Login from "./pages/login";
import PhotographyPackages from "./pages/package";
import PhotographyPackagesDetails from "./pages/packagesDetails";
import PhotographerDetails from "./pages/photographers/photographerDetails";
import PhotographerPackagesDetails from "./pages/photographers/photographerPackages";
import PhotographersList from "./pages/photographers/photographers";
import Profile from "./pages/profile.$id";
import PhotographerDashboard from "./pages/profilePhotographer/dashboard/dashboard";
import PhotographerProfile from "./pages/profilePhotographer/profilePhotographer";
import UserProfile from "./pages/profileUser";
import Signup from "./pages/signup";

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
        queryCache: new QueryCache({
          onError: (error: any) => {
            console.log("error", error?.response?.status);

            // if (error?.response?.status === 401) {
            //   window.location.href = '/logout'; // Redirect to login or any route
            // }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          {/* guest */}
          <Route index element={<HomeNoLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* user */}
        <Route index path="/user/home" element={<Home />} />
        <Route path="/messenger" element={<MessageList />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/photographer" element={<PhotographersList />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route
          path="/user/packages/:id"
          element={<PhotographyPackagesDetails />}
        />
        <Route
          path="/user/photographer/:id"
          element={<PhotographerDetails />}
        />
        <Route
          path="/user/photographer/:id/packages"
          element={<PhotographerPackagesDetails />}
        />
        <Route path="/user/package" element={<PhotographyPackages />} />

        {/* photographer */}
        <Route index path="/photographer/home" element={<Home />} />
        <Route path="/photographer/messenger" element={<MessageList />} />
        <Route
          path="/photographer/photographer"
          element={<PhotographersList />}
        />
        <Route path="/photographer/:id" element={<PhotographerDetails />} />
        <Route path="/photographer/dashboard" element={<PhotographerDashboard />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/photographer/profile"
          element={<PhotographerProfile />}
        />
        <Route
          path="/photographer/package"
          element={<PhotographyPackages />}
        />

        {/* admin */}
        <Route path="/admin/dashboard/*" element={<Dashboard />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;