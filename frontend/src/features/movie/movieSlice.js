import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: null,
  playing: null,
  coming: null,
  detailed: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.all = action.payload.all;
      state.playing = action.payload.playing;
      state.coming = action.payload.coming;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setComing: (state, action) => {
      state.coming = action.payload;
    },
    setDetailed: (state, action) => {
      state.detailed = action.payload;
    }
  },
});

export const { setMovies, setPlaying, setComing, setDetailed } = movieSlice.actions;

export const selectAll = (state) => state.movie.all;
export const selectPlaying = (state) => state.movie.playing;
export const selectComing = (state) => state.movie.coming;
export const selectDetailed = (state) => state.movie.detailed;
export default movieSlice.reducer;
