import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import MessageStyle from "./message.module.css";

export const NewMessage = ({ socket, user, activeUser, setActiveUser }) => {
  const [messages, setMessages] = useState([]);
  const [time, setTime] = useState(0);
  console.log(messages);

  useEffect(() => {
    socket.emit("getAllMessage", { toId: activeUser, fromId: user.id });
    socket.on("messages", (data) => {
      setMessages(data.messages);
      //   console.log(data);
    });
  }, [activeUser, time]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const add = async (data) => {
    data.toId = activeUser;
    data.fromId = user.id;
    setTime(Date.now());
    socket.emit("sendMessage", { message: data });
    console.log(data);
    reset();
  };

  // websocket
  // socket.io - server
  // socket.io-client - clint
  // socket.emit - uxarkel
  // socket.on - vercnel

  return (
    <div className={MessageStyle.mesDiv}>
      <form onSubmit={handleSubmit(add)}>
        <textarea
          placeholder="Write message"
          {...register("text", { required: true })}
          >
          {errors.text && <p style={{ color: "red" }}>Please enter Message</p>}
        </textarea>
        <button>Send</button>
      </form><br/>
          <div>
            {messages.map((message, index) => {
              return (
                <p
                  style={{
                    background: activeUser == message.fromId ? "red" : "green",
                  }}
                  key={index}
                >
                  {message.text}
                </p>
              );
            })}
          </div>
    </div>
  );
};
