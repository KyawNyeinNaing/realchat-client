import React, { useEffect, useState } from "react";
import { IoIosSend, ProfileIcon, ActiveIcon } from "./Icons";
import ScrollToBottom from "react-scroll-to-bottom";
import { AuthStore } from "../service/Auth";
import { useSelector } from "react-redux";

const Chat = ({ socket, nickname, room, isLoading }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { roomName } = useSelector((state) => state.emit);

  const formatTime = (date) => {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? "0" + minute : minute;
    const strTime = `${hour}:${minute} ${ampm}`;
    return strTime;
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        picture: AuthStore?.getAuth().picture,
        room,
        username: AuthStore?.getAuth().name,
        nickname: AuthStore?.getAuth().nickname,
        currentMessage,
        time: formatTime(new Date()),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    !isLoading && (
      <div className="container chat-container sp-view">
        <div className="card chat-card">
          <div className="d-flex flex-column justify-content-start p-3 adiv text-white">
            <div className="d-flex flex-row">
              <span className="d-block me-2">Live Chat</span>
              <ActiveIcon color="#04cb28" width="7" height="7" />
            </div>
            <span className="count-member">2 members</span>
          </div>
          <div className="chat-card-body">
            <ScrollToBottom className="message-container">
              <div className="welcome">
                {`Welcome from ${roomName}`}
                <span>Let's start chat together</span>
                <span>{`You joined to group`}</span>
              </div>
              {messageList?.length > 0 &&
                messageList?.map((content, key) => (
                  <div
                    className={`d-flex flex-row justify-content-start p-3 rounded 
                    ${
                      nickname === content.nickname
                        ? "justify-content-end"
                        : "justify-content-start"
                    }
                    ${nickname === content.nickname ? "you" : "other"}`}
                    key={key}
                  >
                    {nickname !== content.nickname && (
                      <div className="img-wrap">
                        {AuthStore.getAuth().picture ? (
                          <img
                            src={content.picture}
                            alt={AuthStore.getAuth().name}
                          />
                        ) : (
                          <ProfileIcon width="40" height="40" />
                        )}
                      </div>
                    )}

                    <div
                      className={`chat ${
                        nickname === content.nickname ? "you" : "other"
                      }`}
                    >
                      {nickname !== content.nickname && (
                        <span className="author">{content.username}</span>
                      )}
                      <div>{content.currentMessage}</div>
                      <span className="time">{content.time}</span>
                    </div>
                    {/* {nickname === content.nickname && (
                    <ProfileIcon width="40" height="40" />
                  )} */}
                  </div>
                ))}
            </ScrollToBottom>
          </div>

          <div className="form-group">
            <div className="send-wrap">
              <input
                className="form-control"
                type="text"
                value={currentMessage}
                placeholder="Type your message"
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>
                <IoIosSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Chat;
