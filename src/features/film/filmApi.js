import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../app/config";


export const addFilm = createAsyncThunk("users/addFilm", async (data) => {
  const response = await Axios.post("/addFilm", data, {
    headers: {
      'content-type': 'multipart/form-data'  //https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios
    }                                       // vorovhetev uzum enq axiosov file uxarkenq 
  });
  return response.data;
});


export const getGenres = createAsyncThunk("users/getGenres", async () => {
  const response = await Axios.get("/getGenres");
  return response.data;
});

export const getCountry = createAsyncThunk("users/getCountry", async () => {
  const response = await Axios.get("/country");
  return response.data;
});

export const getTranslation = createAsyncThunk("users/getTranslation", async () => {
  const response = await Axios.get("/translation");
  return response.data;
});

export const getYear = createAsyncThunk("users/getYear", async () => {
  const response = await Axios.get("/year");
  return response.data;
});

export const getSingleFilm = createAsyncThunk("users/getSingleFilm", async (id) => {
  const response = await Axios.get(`/getSingleFilm/${id}`);
  return response.data;
});
export const getFilm = createAsyncThunk("users/getFilm", async () => {
  const response = await Axios.get("/getFilm");
  return response.data;
});

export const searchFilm = createAsyncThunk("users/search", async (e) => {
  const response = await Axios.get("/getFilm/" + e);
  return response.data;
});

export const searchTranslation = createAsyncThunk("users/search", async (e) => {
  const response = await Axios.get("/searchTranslation/" + e);
  return response.data;
});

export const yarsSearch = createAsyncThunk("users/search", async (e) => {
  const response = await Axios.get("/searchYear/" + e);
  return response.data;
});

export const deleteFilm = createAsyncThunk("users/delete", async (id) => {
  const response = await Axios.delete("/getFilm/" + id);
  console.log(response.data);
  return response.data;
});

export const addFeedback = createAsyncThunk("users/addFeedback", async (data) => {
  const response = await Axios.post("/addFeedback", data);
  return response.data;
});

export const andStarAdd = createAsyncThunk("users/addFeedback", async (data) => {
  const response = await Axios.post("/addStar", data);
  console.log(response.data, "kkkkkk");
  return response.data;
});