import { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 } from "uuid";
import "./styles/Chat.css";

export default function Chat() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [to, setTo] = useState("");
  const [socket, setSocket] = useState();

  useEffect(() => {
    // Connect to server
    const socket = io();
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("user", (msg) => {
      setMessages((prev) => [`${msg.from} says: ${msg.text}`, ...prev]);
    });

    socket.on("server", (msg) => {
      setMessages((prev) => [msg, ...prev]);
    });

    socket.on("name", (data) => {
      setName(data);
    });

    return () => socket.disconnect(); // prevents memory leak!
  }, []);

  const list = messages
    .map((msg) => <li key={v4()}>{msg}</li>)
    .sort()
    .reverse();

  const send = function () {
    socket.emit("message", { to, text });
  };

  return (
    <div className="chat">
      <h3 className="headerChat">Chat</h3>
      <div className="email">{name}</div>

      <div className="headerChat">
        You're chatting with:
        <img className="userChatThumb" src="images/mscarn.jpeg" />
        Michael Scarn
        {/* <input
          onChange={(event) => setTo(event.target.value)}
          value={to}
          placeholder="Recipient"
        /> */}
      </div>
      <div className="messagehistory">
        <div className="messages">
          <ul className="chatBubble">{list}</ul>
        </div>
      </div>
      <div id="newmessagebox">
        <textarea
          className="newmessage"
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
      </div>
      <div id="chatbottom">
        <button className="clear" onClick={() => setMessages([])}>
          Clear
        </button>
        <button className="send" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
