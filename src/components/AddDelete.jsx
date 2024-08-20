import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, removeWidget, setCategoryId } from "../redux/WidgetSlice";
import { toast } from "react-toastify";

const AddDelete = ({
  displayWidgetContainer,
  setDisplayWidgetContainer,
  setSelectCategoryId,
  widgetDatas,
}) => {
  const [toRemoveWidget, setToRemoveWidget] = useState([]);
  const [createWidget, setCreateWidget] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.dashboardData.categoryId);

  const handleCheckbox = (id) => {
    if (!toRemoveWidget.includes(id)) {
      setToRemoveWidget((prev) => [...prev, id]);
    } else {
      setToRemoveWidget((prev) => prev.filter((data) => data !== id));
    }
  };

  const imageValidation = (image) => {
    const size = 5 * 1024 * 1024;

    if (!image.name.match(/\.(jpg|jpeg|png|gif|avif|svg)$/i)) {
      toast.error("Incorrect file type ");
      return false;
    }
    if (image.size > size) {
      toast.error("file should be less than 5MB");
    }
    return true;
  };

  const handleWidgets = (id) => {
    dispatch(setCategoryId(id));
    setSelectCategoryId(id);
    setToRemoveWidget([]);
  };

  const saveHandler = () => {
    if (toRemoveWidget.length) {
      dispatch(removeWidget(toRemoveWidget));
      setToRemoveWidget([]);
      toast.success("Removed Widget Successfully");
      return;
    }
    if (!name) {
      toast.error("Please Enter Widget Name");
      return;
    }

    if (!text) {
      toast.error("Please Enter Widget text");
      return;
    }
    if (image) {
      if (!imageValidation(image)) return;
    } else {
      toast.error("Please choose widget image");
      return;
    }

    dispatch(
      addWidget({
        name,
        text,
        imgUrl: URL.createObjectURL(image),
        id: crypto.randomUUID(),
      })
    );
    toast.success("Widget Added Successfully");
    setName("");
    setImage("");
    setText("");
    return;
  };

  return (
    <>
      {displayWidgetContainer && (
        <div className="sm:w-1/2 w-full h-screen  flex flex-col gap-2   bg-white z-10  fixed right-0">
          <i
            onClick={() => {
              setDisplayWidgetContainer(false);
              setName("");
              setImage("");
              setText("");
            }}
            className="fa-solid fa-x p-2 hover:bg-red-800 text-white absolute right-0 "
          ></i>
          <h3 className="bg-blue-900 text-white py-2 px-6 ">Add Widget</h3>
          <p className="py-2 px-6">
            Personalise your dashboard by adding the following widget
          </p>
          <div>
            {widgetDatas.map((widgetData) => (
              <button
                onClick={() => handleWidgets(widgetData.id)}
                key={widgetData.id}
                className={`py-2 px-6 ${
                  widgetData.id === categoryId
                    ? "border-blue-900 border-b-2"
                    : ""
                }`}
              >
                <p className=" font-semibold">
                  {widgetData.name.split(" ")[0]}
                </p>
              </button>
            ))}
          </div>
          <div className="flex flex-col h-[calc(100%-120px)] overflow-auto scroll-smooth scrollbar-custom">
            <div className="w-full py-2 px-6 flex flex-col gap-4  mb-10">
              <button
                onClick={() => setCreateWidget(!createWidget)}
                className="p-2 bg-blue-400 text-white border-none rounded-lg"
              >
                Create Widget
              </button>
              {createWidget && (
                <div className=" flex flex-col gap-2">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-md p-1 border-black outline-none"
                    type="text"
                    value={name}
                    placeholder="Widget Name"
                  />
                  <input
                    onChange={(e) => setText(e.target.value)}
                    className="border rounded-md p-1 border-black outline-none"
                    type="text"
                    value={text}
                    placeholder="Widget Text"
                  />
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-image"></i>
                    <label htmlFor="file">Select an Image</label>
                  </div>
                  {image && (
                    <img
                      className="h-[50px] w-[50px] object-cover "
                      src={URL.createObjectURL(image)}
                      alt="widget-imag"
                    />
                  )}
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    className=" hidden"
                    type="file"
                    id="file"
                  />
                </div>
              )}
              <div className="flex flex-col">
                {widgetDatas
                  .find((data) => data.id === categoryId)
                  .widgets.map((widget) => (
                    <div
                      key={widget.id}
                      className=" flex gap-4 border items-center rounded-lg mb-4 p-1"
                    >
                      <>
                        {!toRemoveWidget.includes(widget.id) ? (
                          <span onClick={() => handleCheckbox(widget.id)}>
                            <i className="fa-solid fa-check bg-blue-900 text-white"></i>
                          </span>
                        ) : (
                          <span
                            onClick={() => handleCheckbox(widget.id)}
                            className="h-[16px] w-[16px] border border-black "
                          >
                            <i></i>
                          </span>
                        )}
                      </>
                      <p className="p-2 ">{widget.name}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-end p-4">
              <button
                onClick={() => {
                  setToRemoveWidget([]);
                  setImage("");
                  setName("");
                  setText("");
                }}
                className=" rounded-lg px-6 py-2 border border-blue-700 text-blue-700 bg-white mr-4"
              >
                Cancel
              </button>
              <button
                onClick={saveHandler}
                className=" rounded-lg px-6 py-2 bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDelete;
