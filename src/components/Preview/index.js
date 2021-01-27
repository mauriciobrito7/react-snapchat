import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCameraImage, selectcamera } from "../../features/cameraSlice";
import firebase from "../../utils/firebase";
import CloseIcon from "@material-ui/icons/Close";
import CropIcon from "@material-ui/icons/Crop";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import TimerIcon from "@material-ui/icons/Timer";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import NoteIcon from "@material-ui/icons/Note";
import CreateIcon from "@material-ui/icons/Create";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import "./preview.css";

const Preview = () => {
  const cameraImage = useSelector(selectcamera);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = firebase.storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        // Error function
        console.log(error);
      },
      () => {
        // Complete function
        firebase.storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            firebase.database.collection("posts").add({
              imageUrl: url,
              username: "Mauricio",
              read: false,
              // profilePic
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="selfie" />
      <div className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon
          onClick={sendPost}
          fontSize="small"
          className="preview__sendIcon"
        />
      </div>
    </div>
  );
};

export default Preview;
