import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import LayoutStyle from "./style.module.css"

export const Layout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch(logoutUser())
    navigate("/")

  }
  return (
    <div className={LayoutStyle.layout}>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Signin <i className="fa-brands fa-teamspeak"></i></Link>
            </li>
            <li>
              <Link to="/signup">Signup <i className="fa-solid fa-address-card"></i></Link>
            </li>
            <li>
              <Link to="/profile">Profile <i className="fa-solid fa-user"></i></Link>
            </li>
            <li>
              <Link to="/home">Home <i className="fa-solid fa-house"></i></Link>
            </li>
            <li>
              <Link to="/addFilm">Add Film <i className="fa-solid fa-plus"></i></Link>
            </li>
            <li>
              <Link to="/message">Message <i className="fa-solid fa-message"></i></Link>
            </li>
            <li>
              <Link to="/users">Dashboard <i className="fa-solid fa-user-secret"></i></Link>
            </li>
            <div>
              <li>
                <button onClick={logout}>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
              </li>
            </div>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};