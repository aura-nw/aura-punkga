"use client";
import React, { useState, useEffect } from "react";
import BgTime from "../assets/svg/bg_time.svg";
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );

        setTimeLeft({
          days: days,
          hours: hours,
          minutes: minutes,
        });
      }
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every minute
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Helper to convert number to two digits
  const twoDigits = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="w-[100px] md:w-fullmax-w-2xl mx-auto ">
      <div className="p-6 rounded-lg shadow-lg">
        <div className="flex justify-center items-center gap-8">
          {/* Days */}
          <div className="text-center">
            <div className="flex gap-1">
              <div
                style={{
                  backgroundImage: `url(${BgTime.src})`,
                  backgroundSize: "cover",
                }}
                className="font-digital-number rounded border boder-[0.28px] border-solid border-white p-2  h-16 flex items-center justify-center"
              >
                <span className="text-[#FEF368] text-[28px] font-digital">
                  {twoDigits(timeLeft.days)[0]}
                </span>
              </div>
              <div
                style={{
                  backgroundImage: `url(${BgTime.src})`,
                  backgroundSize: "cover",
                }}
                className="font-digital-number rounded border border-solid border-white p-2  h-16 flex items-center justify-center"
              >
                <span className="text-[#FEF368] text-[28px]">
                  {twoDigits(timeLeft.days)[1]}
                </span>
              </div>
            </div>
            <div className="text-white mt-2 text-sm font-bold">DAY</div>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="flex gap-1">
              <div
                style={{
                  backgroundImage: `url(${BgTime.src})`,
                  backgroundSize: "cover",
                }}
                className="rounded border border-solid border-white p-2  h-16 flex items-center justify-center"
              >
                <span className="font-digital-number text-[#FEF368] text-[28px]">
                  {twoDigits(timeLeft.hours)[0]}
                </span>
              </div>
              <div
                style={{
                  backgroundImage: `url(${BgTime.src})`,
                  backgroundSize: "cover",
                }}
                className="rounded border border-solid border-white p-2  h-16 flex items-center justify-center"
              >
                <span className="font-digital-number text-[#FEF368] text-[28px]">
                  {twoDigits(timeLeft.hours)[1]}
                </span>
              </div>
            </div>
            <div className="text-white mt-2 text-sm font-bold">HOUR</div>
          </div>

          {/* Minutes */}
          <div className="text-center">
            <div className="flex gap-1">
              <div
                style={{
                  backgroundImage: `url(${BgTime.src})`,
                  backgroundSize: "cover",
                }}
                className="rounded border border-solid border-white p-2  h-16 flex items-center justify-center"
              >
                <span className="font-digital-number text-[#FEF368] text-[28px]">
                  {twoDigits(timeLeft.minutes)[0]}
                </span>
              </div>
              <div
                style={{
                  backgroundImage: `url(${BgTime.src})`,
                  backgroundSize: "cover",
                }}
                className=" rounded border border-solid border-white p-2  h-16 flex items-center justify-center"
              >
                <span className="font-digital-number text-[#FEF368] text-[28px]">
                  {twoDigits(timeLeft.minutes)[1]}
                </span>
              </div>
            </div>
            <div className="text-white mt-2 text-sm font-bold">MINUTES</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
