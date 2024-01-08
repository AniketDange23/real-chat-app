import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";



const InputPannels = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    try {
      if (image) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed", null, (error) => {
          console.error("Error uploading image:", error);
        }, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      setText("");
      setImage(null);
    } catch (error) {
      console.error("self message", error);
      // Handle error gracefully, show user a message or retry option
    }
  };

  return (
    <div className="input">
      <div className="input-container">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="inputIcons">
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="file">
            <AddPhotoAlternateIcon />
          </label>
        </div>
        <button title="send" className="sendButton" onClick={handleSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default InputPannels;
