const initialState = {
  roomId: "",
  setName: "",
  roomName: "",
};

const emit = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ROOM":
      return {
        ...state,
        roomId: payload,
      };
    case "SET_NAME":
      return {
        ...state,
        setName: payload,
      };
    case "ROOM_NAME":
      return {
        ...state,
        roomName: payload,
      };

    default:
      return state;
  }
};

export default emit;
