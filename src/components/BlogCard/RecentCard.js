import React from "react";

function RecentCard({ allData, months }) {
  function truncate(str, num) {
    return str?.length > num ? str.substr(0, num - 1) + "..." : str;
  }

  function timeCalculate(datetime) {
    return new Date(datetime);
  }

  return (
    <div className="recent">
      <h3 className="font-semibold mb-2">Recent</h3>
      <div className=" flex gap-2 flex-wrap">
        {allData?.map((data) => {
          const { id, title, body, datetime, image } = data;
          return (
            <div
              key={id}
              className={`${
                timeCalculate(datetime).getFullYear() !== 2022 && "hidden"
              }`}
            >
              {timeCalculate(datetime).getFullYear() === 2022 && (
                <div className="card rounded-md overflow-hidden md:max-w-md">
                  <div className="flex bg-[#29292B]">
                    <div className="py-2 px-4">
                      <h5 className="text-sky-600 text-sm font-semibold mb-1">
                        {title !== "NULL" && title}
                      </h5>
                      <p className="text-sm">
                        {title === "NULL"
                          ? truncate(body, 160)
                          : truncate(body, 100)}
                      </p>
                      <h6 className="text-gray-400 text-xs">
                        {months[timeCalculate(datetime).getMonth()]}{" "}
                        {timeCalculate(datetime).getDate()},
                        {timeCalculate(datetime).getFullYear()} |{" "}
                        {timeCalculate(datetime).toLocaleTimeString()}
                      </h6>
                    </div>
                    <img
                      src={image}
                      alt=""
                      className="w-32 h-auto py-1 rounded object-cover overflow-hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentCard;
