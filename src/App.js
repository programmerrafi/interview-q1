import { useState, useEffect } from "react";
import Switchs from "./components/Switchs";
import { months } from "./data/DayMonth";

function App() {
  const [allData, setAllData] = useState([]);
  const [filteredLong, setFilteredLong] = useState([]);
  const [filteredShort, setFilteredShort] = useState([]);
  const [checkedLong, setCheckedLong] = useState(false);
  const [checkedShort, setCheckedShort] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [togData, setTogData] = useState([]);

  const getData = async () => {
    const response = await fetch("data.json");
    const json = await response.json();
    setAllData(json);
    setTogData(json);
  };

  useEffect(() => {
    getData();
    // console.log(new Date("2020-01-04T02:00:00.000Z").getTime());
    console.log(new Date("2022-03-04T02:00:00.000Z").getTime());
    // console.log(
    //   allData
    //     .map((data) => {
    //       const { datetime } = data;
    //       return new Date(datetime).getTime();
    //     })
    //     .sort((a, b) => b - a)
    // );
  }, []);

  const countLongStroy = () => {
    const fill = togData?.filter((data) => data.type === "long");
    setFilteredLong(fill);
  };
  const countShortStroy = () => {
    const fill = togData?.filter((data) => data.type === "short");
    setFilteredShort(fill);
  };

  useEffect(() => {
    countLongStroy();
    countShortStroy();
  }, [togData]);

  function truncate(str, num) {
    return str?.length > num ? str.substr(0, num - 1) + "..." : str;
  }

  function timeCalculate(datetime) {
    return new Date(datetime);
  }

  const checkedLongStroy = (e) => {
    setCheckedLong(e.currentTarget.checked);
    setAllData(filteredLong);
    checkedLong === true && setAllData(togData);
    checkedShort === true && checkedLong === true && setAllData(filteredShort);
    checkedShort === true && checkedLong === false && setAllData(togData);
  };

  const checkedShortStroy = (e) => {
    setCheckedShort(e.currentTarget.checked);
    setAllData(filteredShort);
    checkedShort === true && setAllData(togData);
    checkedLong === true && checkedShort === false && setAllData(togData);
    checkedShort === true && checkedLong === true && setAllData(filteredLong);
  };

  const handleClickDelete = () => {
    setDeleted(true);
    setAllData([]);
    setTogData([]);
  };

  return (
    <div className="w-full h-screen bg-black text-gray-200">
      <div className="container mx-auto bg-[#1E1F21] h-screen">
        <header className="flex justify-center items-center bg-[#29292B] border border-gray-700 border-t-0 mb-12">
          <img src="mylogos.png" alt="logo" className="h-11 object-cover" />
          <h3 className="font-semibold">Hootstory</h3>
        </header>
        <main className="w-[80%] md:w-[60%] mx-auto">
          <div className="flex items-center gap-4 bg-[#29292B] p-2 rounded mb-5">
            <div className="flex items-center gap-1">
              <h2>i</h2>
              <h4 className="font-bold">Blog</h4>
            </div>
            <div className="flex items-center gap-1">
              <h4
                onClick={handleClickDelete}
                className="text-sm text-[#a0645b] cursor-pointer"
              >
                Delete all
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3D3D3F] text-[11px]">
                {filteredLong?.length}
              </h2>
              <h4 className="font-semibold text-sm text-gray-300">
                Long stroies
              </h4>
              <Switchs
                checkedLongStroy={checkedLongStroy}
                checkedLong={checkedLong}
                long
              />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3D3D3F] text-[11px]">
                {filteredShort?.length}
              </h2>
              <h4 className="font-semibold text-sm text-gray-300">
                Short stroies
              </h4>
              <Switchs
                checkedShortStroy={checkedShortStroy}
                checkedShort={checkedShort}
                short
              />
            </div>
          </div>

          {/* Blog Card */}
          {!deleted && (
            <div className="blog-card">
              <div className="recent">
                <h3 className="font-semibold">Recent</h3>
                <div className=" flex gap-2 flex-wrap">
                  {allData?.map((data) => {
                    const { id, title, body, datetime, image } = data;
                    return (
                      <div
                        key={id}
                        className={`${
                          timeCalculate(datetime).getFullYear() != "2022" &&
                          "hidden"
                        }`}
                      >
                        {timeCalculate(datetime).getFullYear() == "2022" && (
                          <div className="card rounded-md overflow-hidden md:max-w-md">
                            <div className="flex bg-[#29292B]">
                              <div className="py-2 px-4">
                                <h5 className="text-sky-600 text-sm font-semibold mb-1">
                                  {title !== "NULL" && title}
                                </h5>
                                <p className="text-sm">
                                  {title == "NULL"
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

              {/* old */}
              <div className="old mt-5">
                <h3 className="font-semibold  pb-2">Old</h3>
                <div className=" flex gap-2 flex-wrap">
                  {allData?.map((data) => {
                    const { id, title, body, datetime, image } = data;
                    return (
                      <div key={id}>
                        {(timeCalculate(datetime).getFullYear() == "2020" ||
                          timeCalculate(datetime).getFullYear() == "2021") && (
                          <div className="card rounded-md overflow-hidden md:max-w-md">
                            <div className="flex bg-[#29292B]">
                              <div className="py-2 px-4">
                                <h5 className="text-sky-600 text-sm font-semibold mb-1">
                                  {title !== "NULL" && title}
                                </h5>
                                <p className="text-sm">
                                  {title == "NULL"
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
