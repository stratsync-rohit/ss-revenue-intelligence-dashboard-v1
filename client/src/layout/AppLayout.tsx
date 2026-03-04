import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";

const AppLayout = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const countryName = timeZone.split("/")[1];

  const getCountryTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const getTodayDate = () =>
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const [countryTime, setCountryTime] = useState(getCountryTime());
  const [todayDate, setTodayDate] = useState(getTodayDate());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountryTime(getCountryTime());
      setTodayDate(getTodayDate());
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 h-screen overflow-y-auto">
        <Header nData={todayDate} countryTime={countryTime} countryName={`${countryName} Office`} />
        <div className="p-2 pt-12 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
