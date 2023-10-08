import React, { useEffect, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

import Axios from "axios";

const socket = io.connect("http://localhost:8080");
//const ENDPOINT = "http://localhost:8080";

function ChatContainer() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  function handleData(e) {
    setMessage(e.target.value);
  }

  const submitHandler = async (e) => {
    const mess = {
      room: localStorage.getItem("roomId"),
      message: message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      author: localStorage.getItem("User-email"),
    };
    await socket.emit("send_message", mess);
    setMessageList((list) => [...list, mess]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => {
      socket.off("recieve_message");
    };
  }, [socket]);
  return (
    <div className="containerChat">
      <div className="startcon">start conversation</div>
      <div className="chatsdiv">
        {messageList.map((messageContent) => {
          return (
            <>
              <div>{messageContent.time}</div>
              <div
                className={
                  localStorage.getItem("User-email") === messageContent.author
                    ? "rightchat"
                    : "leftchat"
                }
              >
                <p>{messageContent.message}</p>
              </div>
            </>
          );
        })}
      </div>
      <div className="sendmessage">
        <input
          type="text"
          value={message}
          placeholder="Write your message here..."
          onChange={handleData}
          onKeyPress={(event) => {
            event.key === "Enter" && submitHandler();
          }}
        />
        <button className="sendbutton" onClick={submitHandler}>
          sendmessage
        </button>
      </div>
    </div>
  );
}

function Friend(props) {
  const [userName, setUserName] = useState("");

  function emailSplitter(data) {
    const username = data.split("@")[0];

    return username;
  }

  function sortStringCharacters(inputString) {
    // Split the string into an array of characters
    const charArray = inputString.split("");

    // Sort the array of characters alphabetically
    const sortedArray = charArray.sort();

    // Join the sorted array back into a string
    const sortedString = sortedArray.join("");

    return sortedString;
  }

  function generateRoomId(userId1, userId2) {
    // Sort the user IDs alphabetically
    const u1 = emailSplitter(userId1);
    const u2 = emailSplitter(userId2);

    // Concatenate the sorted user IDs
    const roomId = u1 + u2;
    return sortStringCharacters(roomId);
  }

  const joinRoom = async (data) => {
    if (data !== "") {
      const idd = generateRoomId(data, localStorage.getItem("User-email"));
      localStorage.setItem("roomId", idd);
      await socket.emit("join_room", idd);
    }
  };

  try {
    Axios.post("http://localhost:8080/findfriendname", {
      email: props.email,
    }).then((res) => {
      setUserName(res.data.fname + " " + res.data.lname);
    });
  } catch (err) {
    console.log(err);
  }
  return (
    <div
      className="user"
      key={props.email}
      onClick={() => {
        joinRoom(props.email);
      }}
    >
      <p>
        {/* <img src="avatar2.png" alt="no image" width="40" /> */}
        {userName}
      </p>
    </div>
  );
}

function ContainerFriend() {
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:8080/friendlist", {
      myEmail: localStorage.getItem("User-email"),
    })
      .then((res) => {
        if (res.data === "noFriend") {
          alert(
            "You do not have friends to chat, add friends to use this feature!"
          );
        } else {
          setFriendList(res.data);
        }
      })
      .catch((error) => {
        console.error("Axios error:", error);
        // Handle the error, e.g., show an error message to the user
      });
  }, []);
  return (
    <div className="containerFriend">
      <h4>Friends</h4>
      {friendList.map((ele) => {
        return <Friend email={ele} />;
      })}
    </div>
  );
}

// function Topbar() {
//   return (
//     <h2 className="headline">
//       <button type="button" class="back">
//         Back
//       </button>
//       Conversation with friends
//     </h2>
//   );
// }

function Chat() {
  return (
    <>
      <div className="Chat_Main">
        <ContainerFriend />
        <ChatContainer />;
      </div>
    </>
  );
}

export default Chat;
