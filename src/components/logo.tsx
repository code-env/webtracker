import React from "react";
import {  Radar } from "lucide-react"; // Optional icons

const WebTrackerLogo: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <div className="flex items-center space-x-2 font-bold text-xl text-indigo-600">
      <Radar size={size} className="text-indigo-500 animate-pulse" />
      <span className="tracking-wide">Web<span className="text-black dark:text-white">Tracker</span></span>
    </div>
  );
};

export default WebTrackerLogo;
