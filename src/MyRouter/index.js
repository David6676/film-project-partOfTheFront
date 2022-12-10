import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminHOC } from "../components/AdminHOC";
import { AuthHOC } from "../components/AuthHOC";
import { Layout } from "../components/Layout";
import { AddFilm } from "../pages/AddFilm";
import { Dashboard } from "../pages/Dashboard";
import { FilmPage } from "../pages/FilmPage";
import { Home } from "../pages/Home";
import { Message } from "../pages/Message";
import { Profile } from "../pages/Profile";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";

export const MyRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />

            <Route path="/" element={<AuthHOC />}>
              <Route path="/message" element={<Message />} />
              <Route path="profile" element={<Profile />} />
              <Route path="addFilm" element={<AddFilm />} />
              <Route path="film/:id" element={<FilmPage />} />
            </Route>

            <Route path="/" element={<AdminHOC />}>
              <Route path="users" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
