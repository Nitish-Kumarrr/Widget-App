import React from "react";
import { useDispatch } from "react-redux";
import { removeWidget, setCategoryId } from "../redux/WidgetSlice";
import { toast } from "react-toastify";

const WidgetCard = ({
  widgets,
  setDisplayWidgetContainer,
  setSelectCategoryId,
  widgetDataId,
  search,
}) => {
  const dispatch = useDispatch();

  const removeHandler = (id) => {
    dispatch(setCategoryId(widgetDataId));
    dispatch(removeWidget([id]));
  };
  return (
    <>
      {widgets
        .filter((widget) =>
          widget.name.toLowerCase().includes(search.toLowerCase().trim())
        )
        .map((widget) => (
          <div
            key={widget.id}
            className="w-[90%] sm:w-[48%] md:w-[48%] lg:w-[30%] h-[300px] bg-white shadow-lg flex flex-col relative rounded-lg p-4 overflow-hidden "
          >
            <i
              onClick={() => {
                removeHandler(widget.id);
                toast.success("Widget Removed Successfully");
              }}
              className="fa-solid fa-trash absolute right-3 top-1"
            ></i>
            <h3 className="text-xl font-semibold overflow-hidden text-nowrap">
              {widget.name}
            </h3>
            <p className="overflow-hidden text-nowrap">{widget.text}</p>
            <div className="w-full h-[200px]">
              {widget.imgUrl && (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={widget.imgUrl}
                  alt="widget-img"
                />
              )}
            </div>
          </div>
        ))}
      <div className=" w-[90%] sm:w-[48%] md:w-[48%] lg:w-[30%] h-[300px] bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
        <button
          onClick={() => {
            setDisplayWidgetContainer(true);
            setSelectCategoryId(widgetDataId);
            dispatch(setCategoryId(widgetDataId));
          }}
          className="p-2 bg-gray-300 rounded-lg border-none"
        >
          <i className="fa-solid fa-circle-plus text-gray-100"></i> Add Widget
        </button>
      </div>
    </>
  );
};

export default WidgetCard;
