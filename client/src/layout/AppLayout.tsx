import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import Header from "../components/Header";

const AppLayout = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const countryName = timeZone.split("/")[1];

  const countryTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const todayDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 h-screen overflow-y-auto">
        <Header nData={todayDate} countryTime={countryTime} countryName={`${countryName} Office`} />
        <div className="p-6 pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
