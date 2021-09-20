import React from "react";
import styled from "styled-components";
import { WeChatIcon } from "./Icons";

const Login = ({ loginWithRedirect }) => {
  return (
    <LoginWrap>
      <div className="text-center">
        <WeChatIcon width="50" height="50" />
        <h1 className="mb-3">Join A Chat</h1>
        <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
          Join A Room
        </button>
      </div>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);
`;
