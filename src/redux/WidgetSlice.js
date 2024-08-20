import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../Data";

const widgetSlice = createSlice({
  name: "dashBoardData",
  initialState: {
    dashboardData: {
      categories,
    },
    categoryId: categories[0]?.id,
  },
  reducers: {
    addWidget: (state, action) => {
      const category = state.dashboardData.categories.find(
        (data) => data.id === state.categoryId
      );
      if (category) {
        category.widgets.push(action.payload);
      }
    },
    removeWidget: (state, action) => {
      const index = state.dashboardData.categories.findIndex(
        (data) => data.id === state.categoryId
      );
      state.dashboardData.categories[index].widgets =
        state.dashboardData.categories[index].widgets.filter(
          (data) => !action.payload.includes(data.id)
        );
    },

    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});

export const { addWidget, removeWidget, setCategoryId } = widgetSlice.actions;
export default widgetSlice.reducer;
