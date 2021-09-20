import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { emit } from "../store/actions";

const InputRoom = ({ handleRoomId, joinRoom, goBack }) => {
  const { roomId } = useSelector((state) => state.emit);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(emit.setEmit("ROOM_NAME", e));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <InputWrap>
            <div className="border input-container">
              <div className="d-flex flex-column input-wrap">
                <input
                  className="form-control"
                  type="text"
                  defaultValue=""
                  placeholder="Room Name"
                  onChange={(e) => handleChange(e.target.value)}
                />
                <input
                  className="form-control"
                  type="text"
                  defaultValue={`#roomId-${roomId}`}
                  placeholder="Enter room id ..."
                  onChange={(e) => handleRoomId(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && joinRoom()}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <button className="btn btn-primary" onClick={joinRoom}>
                    Join Room
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => goBack()}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </InputWrap>
        </div>
      </div>
    </div>
  );
};

export default InputRoom;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);

  .input-container {
    border-radius: 0.4rem;
    padding: 25px;

    .input-wrap {
      > * {
        margin-bottom: 15px;
        &:not(button):not(div) {
          height: 60px;
        }
        &:last-child {
          margin-bottom: 0;
        }

        button {
          &:first-child {
            margin-right: 5px;
          }
        }
      }
    }
  }

  button {
    min-width: 120px;
  }
`;
