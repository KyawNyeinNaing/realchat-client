import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import styled, {
  css,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthStore } from "./service/Auth";
import { emit } from "./store/actions";
import Chat from "./components/Chat";
import Login from "./components/Login";
import InputRoom from "./components/JoinRoom";
import Loading from "./components/Loading";
import "bootstrap/scss/bootstrap.scss";
import "./styles/main.scss";

const socket = io.connect(process.env.REACT_APP_API_URI);
// const socket = io.connect("https://realtime-chatserver.herokuapp.com/");

const styledTheme = {
  media: {
    xs: `@media screen and (max-width: 575px)`,
    sm: `@media screen and (min-width: 576px)`,
    md: `@media screen and (min-width: 768px)`,
    lg: `@media screen and (min-width: 992px)`,
    xl: `@media screen and (min-width: 1200px)`,
    xxl: `@media screen and (min-width: 1400px)`,
  },
};

const App = () => {
  const [showChat, setShowChat] = useState(false);
  const { roomId, setName } = useSelector((state) => state.emit);
  const dispatch = useDispatch();
  const { loginWithRedirect, user, isLoading, logout, isAuthenticated } =
    useAuth0();

  AuthStore.setAuth(user);

  useEffect(() => {
    dispatch(emit.setEmit("SET_NAME", user?.name));

    socket.on("member_count", (data) => {
      console.log(data);
    });
  }, [dispatch, setName, user?.name]);

  const joinRoom = () => {
    if (setName !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  };

  const handleRoomId = (val) => {
    dispatch(emit.setEmit("ROOM", val));
  };

  const Footer = ({ name }) => (
    <FooterStyled theme={styledTheme}>
      Copyright © {new Date().getFullYear()} {name}
    </FooterStyled>
  );

  return (
    <BrowserRouter>
      <StyledThemeProvider theme={styledTheme}>
        <div className="App">
          {isLoading ? (
            <Loading color="white" text="Loading ..." />
          ) : !isAuthenticated ? (
            <Login loginWithRedirect={loginWithRedirect} />
          ) : (
            <>
              {!showChat ? (
                <InputRoom
                  handleRoomId={handleRoomId}
                  joinRoom={joinRoom}
                  goBack={logout}
                />
              ) : (
                <Chat
                  socket={socket}
                  username={setName}
                  nickname={user?.nickname}
                  room={roomId}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
          <Footer name="KNN." />
        </div>
      </StyledThemeProvider>
    </BrowserRouter>
  );
};

export default App;

const FooterStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 10px;

  ${({ theme }) =>
    theme.media.xs &&
    css`
      ${theme.media.xs} {
        display: none;
      }
    `}
`;
