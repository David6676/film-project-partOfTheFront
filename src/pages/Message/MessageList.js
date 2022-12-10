import { useState, useEffect } from "react";
import MessList from "./MessList.module.css";

export const MessageList = ({ socket, user, activeUser, setActiveUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("getUsers", { user: user.id });
    socket.on("sendUsersData", (data) => {
      setUsers(data.users);
      console.log(data);
    });
  }, []);

  return (
    <div className={MessList.mL}>
      <ul>
        {users.map((user, index) => {
          return (
            <li
              style={{
                backgroundColor:
                  user.id == activeUser ? "rgba(12, 248, 24, 0.2)" : "transparent", borderRadius:"10px",boxShadow:"1px 1px 2px 2px"
              }}
              onClick={() => setActiveUser(user.id)}
              key={index}
            >
              {user.name} {user.surname}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
