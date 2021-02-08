import React from "react";
import "./login.css";
import SnapchatIcon from "../../components/Icons/Snapchat";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import firebase, { provider } from "../../utils/firebase";
import { login } from "../../features/appSlice";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <SnapchatIcon width={128} height={128} />
        <Button variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
