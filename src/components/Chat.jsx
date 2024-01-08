import React, { useContext } from "react";
import InputPannels from "./InputPannels";

import VideocamIcon from "@mui/icons-material/Videocam";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <p>{data.user?.displayName}</p>
        <div className="ChatIcons">
          <VideocamIcon />
          <PersonAddAlt1Icon />
          <MoreHorizIcon />
        </div>
      </div>

      <Messages />
      <InputPannels />
    </div>
  );
};

export default Chat;
