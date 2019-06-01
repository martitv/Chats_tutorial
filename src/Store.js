import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

/*
    msg {
        from: 'user',
        msg: 'hi',
        topic: 'General'
    }

    state {
        topic1: [
            {msg}, {msg}, {msg}
        ]
        ,
        topic2: [
            {msg}, {msg}, {msg}
        ]
        
    }
*/

const initialState = {
  General: [
    { from: "Martin", msg: "Hei!" },
    { from: "Other Martin", msg: "Yawo bruther.." },
    { from: "Martin", msg: "Okay then" }
  ],
  Random: [
    { from: "Roger", msg: "Hei!" },
    { from: "Gunnar", msg: "Hallo!" },
    { from: "Berit", msg: "God dag!" }
  ]
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initialState);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "Martin" + Math.random(1).toFixed(2) * 100;

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
