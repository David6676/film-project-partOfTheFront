import { useSelector } from "react-redux";
import { PaginatedItems } from "../Pagination";
import ProfileStyle from "./ProfileStyle.module.css"

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className={ProfileStyle.pS}>
      <h1>
        {user.name} {user.surname}
      </h1>
      <PaginatedItems/>
    </div>
  );
};
