import { useState, useEffect } from "react";
import OldCard from "./Components/BlogCard/OldCard";
import RecentCard from "./Components/BlogCard/RecentCard";
import BlogStories from "./Components/BlogStories";
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
    // console.log(new Date("2022-03-04T02:00:00.000Z").getTime());
    // console.log(
    //   allData
    //     .map((data) => {
    //       const { datetime } = data;
    //       return new Date(datetime).getTime();
    //     })
    //     .sort((a, b) => b - a)
    // );
  }, []);

  useEffect(() => {
    const fill = togData?.filter((data) => data.type === "long");
    setFilteredLong(fill);
    const filled = togData?.filter((data) => data.type === "short");
    setFilteredShort(filled);
  }, [togData]);

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
    <div className="text-gray-200">
      <div className="container mx-auto bg-[#1E1F21] h-full  xl:h-screen pb-6">
        <header className="flex justify-center items-center bg-[#29292B] border border-gray-700 border-t-0 mb-12">
          <img src="mylogos.png" alt="logo" className="h-11 object-cover" />
          <h3 className="font-semibold">Hootstory</h3>
        </header>
        <main className="w-[80%] 2xl:w-[60%] mx-auto">
          <BlogStories
            handleClickDelete={handleClickDelete}
            filteredLong={filteredLong}
            checkedLongStroy={checkedLongStroy}
            checkedLong={checkedLong}
            checkedShortStroy={checkedShortStroy}
            checkedShort={checkedShort}
            filteredShort={filteredShort}
          />

          {/* Blog Card */}
          {!deleted && (
            <div className="blog-card pb-8">
              {/* recent */}
              <RecentCard allData={allData} months={months} />

              {/* old */}
              <OldCard allData={allData} months={months} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
