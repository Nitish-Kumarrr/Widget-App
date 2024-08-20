import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WidgetCard from "./WidgetCard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddDelete from "./AddDelete";

const Dashboard = () => {
  const categoryList = useSelector(
    (state) => state.dashboardData.dashboardData.categories
  );
  const [widgetDatas, setWidgetDatas] = useState(categoryList);
  const [selectCategoryId, setSelectCategoryId] = useState(
    useSelector((state) => state.dashboardData.categoryId)
  );

  const [search, setSearch] = useState("");

  const [displayWidgetContainer, setDisplayWidgetContainer] = useState(false);

  useEffect(() => {
    setWidgetDatas(categoryList);
  }, [useSelector((state) => state.dashboardData.dashboardData.categories)]);

  const addWidgetHandler = () => {
    setDisplayWidgetContainer(true);
  };
  return (
    <>
      <AddDelete
        displayWidgetContainer={displayWidgetContainer}
        setDisplayWidgetContainer={setDisplayWidgetContainer}
        setSelectCategoryId={setSelectCategoryId}
        widgetDatas={widgetDatas}
      />

      <div className="w-full h-max bg-[#eee] p-4 ">
        <div className="w-full flex md:justify-between flex-col md:flex-row mb-4 gap-2">
          <div>
            <h3 className="text-xl font-bold">Dashboard</h3>
          </div>
          <div className="flex gap-4 sm:flex-row flex-col">
            <div className="flex items-center md:flex-row flex-col">
              <div className="flex w-full bg-white rounded-lg p-2">
                <i className="fa-solid fa-magnifying-glass  p-2"></i>
                <input
                  type="text"
                  placeholder="search for widgets"
                  className="py-1 px-4 border-none outline-none w-full "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 sm:flex-row flex-col">
              <button
                onClick={addWidgetHandler}
                className="bg-white p-2 border-none rounded-lg"
              >
                Add Widget <i className="fa-solid fa-circle-plus"></i>
              </button>
              <button className="bg-white p-2 border-none rounded-lg">
                <i
                  onClick={() => location.reload()}
                  className="fa-solid fa-arrows-rotate"
                ></i>
              </button>
              <button className="bg-white p-2 border-none rounded-lg">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <button className="bg-white p-2 border-none rounded-lg">
                <i className="fa-solid fa-clock"></i> Last used{" "}
                <i className="fa-solid fa-angle-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-blue-100 p-4">
          {widgetDatas.map((widgetData) => (
            <div key={widgetData.id}>
              <h3 className="text-xl font-semibold mb-3">
                {widgetData.name.slice(0, 20)}
              </h3>
              <div className="flex w-full gap-4 flex-wrap mb-6">
                <WidgetCard
                  widgets={widgetData.widgets}
                  setDisplayWidgetContainer={setDisplayWidgetContainer}
                  setSelectCategoryId={setSelectCategoryId}
                  widgetDataId={widgetData.id}
                  search={search}
                />
              </div>
            </div>
          ))}
        </div>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Dashboard;
