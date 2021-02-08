import React from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import { selectImage, selectUser } from "../../features/appSlice";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router-dom";

const Chat = ({ id, username, timestamp, imageUrl, read, profilePic }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      firebase.firestore().collection("posts").doc(id).set(
        {
          read: true,
        },
        {
          merge: true,
        }
      );
      history.push("chats/view");
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar src={profilePic} className="chat__avatar" />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate().toUTCString())} />{" "}
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </div>
  );
};

export default Chat;
