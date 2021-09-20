import styled from "styled-components";

const Loading = (props) => <Wrap color={props.color}>{props.text}</Wrap>;

export default Loading;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.43);
  color: ${(props) => props.color && props.color};
  z-index: 9;
`;
