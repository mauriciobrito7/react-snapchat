import React, { useEffect } from "react";
import WebcamCapture from "./components/WebcamCapture";
import Preview from "./views/Preview";
import Chats from "./views/Chats";
import Login from "./views/Login";
import ChatView from "./views/ChatView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import firebase from "./utils/firebase";
import SnapchatIcon from "./components/Icons/Snapchat";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <SnapchatIcon width={56} height={56} />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                  <Route exact path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/chats/view">
                    <ChatView />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
