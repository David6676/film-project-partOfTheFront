import { MessageList } from "./MessageList"
import { NewMessage } from "./NewMessage"
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import MessageDiv from "./MessageDiv.module.css"
import { useSelector } from "react-redux";

export const Message = () => {

    const [socket, setSocket] = useState(null);
    const [activeUser, setActiveUser] = useState(null)

    const { user } = useSelector((state) => state.auth);


    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:5000`);
        // kap enq hastatum serveri socketi het
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div className={MessageDiv.mD}>
            <div className="App">
                {socket ? (
                    <div className="chat-container">
                        <MessageList socket={socket} user={user} activeUser={activeUser} setActiveUser={setActiveUser} />
                        {activeUser && <NewMessage socket={socket} user={user} activeUser={activeUser} setActiveUser={setActiveUser} />}
                    </div>
                ) : (
                    <div>Not Connected</div>
                )}
            </div>
        </div>
    )
}