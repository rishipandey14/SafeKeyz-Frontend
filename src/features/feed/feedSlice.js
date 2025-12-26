import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addDataInFeed: (state, action) => action.payload,
    appendDataInFeed: (state, action) => {
      state.push(action.payload);
    },
    removeDataFromFeed: (state, action) => state.filter((data) => data._id !== action.payload),
    resetFeedState: () => initialState,
  },
});

export const { addDataInFeed, removeDataFromFeed, appendDataInFeed, resetFeedState } = feedSlice.actions;
export default feedSlice.reducer;
