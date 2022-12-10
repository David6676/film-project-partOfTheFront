import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../app/config";

export const addUser = createAsyncThunk("users/addUsers", async (data) => {
  const response = await Axios.post("/add", data);
  return response.data;
});

export const loginUser = createAsyncThunk("users/loginUsers", async (data) => {
  const response = await Axios.post("/login", data);
  return response.data;
});

export const getUser = createAsyncThunk("users/getUsers", async (data) => {
  const response = await Axios.post("/get", data);
  return response.data;
});

export const usersAll = createAsyncThunk("users/getAllUsers", async () => {
  const response = await Axios.get("/users");
  return response.data;
});
export const Block = createAsyncThunk("users/usersBlock", async (id) => {
  const response = await Axios.get("/block/" + id);
  console.log(response.data);
  return response.data;
});

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const response = await Axios.get("/logout");
  return response.data;
});