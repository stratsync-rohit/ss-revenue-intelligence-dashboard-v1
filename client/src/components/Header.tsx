
import React from "react";
import type { HeaderProps } from "../types/header";



const Header: React.FC<HeaderProps> = ({ nData, countryTime, countryName }) => {
  return (
    <header className="w-full bg-gray-100 border-b border-gray-200 px-8 py-3 flex justify-end fixed top-0 left-0 z-20" style={{height: '42px'}}>
      <div className="text-sm text-gray-600 font-medium">
        {nData}
        <span className="mx-2 text-gray-400">•</span>
        {countryTime}
        <span className="mx-2 text-gray-400">•</span>
        {countryName}
      </div>
    </header>
  );
};

export default Header;