import React from 'react';

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
    general: [
        {from: 'Martin', msg: 'Hei!'},
        {from: 'Other Martin', msg: 'Yawo bruther..'},
        {from: 'Martin', msg: 'Okay then'}
    ]
    ,
    topic2: [
        {from: 'Roger', msg: 'Hei!'},
        {from: 'Gunnar', msg: 'Hallo!'},
        {from: 'Berit', msg: 'God dag!'}
    ]
};

function reducer(state, action) {

    const {from, msg, topic} = action.payload;

    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            };
        default:
            return state;
    }
}

export default function Store(props) {



    const reducerHook = React.useReducer(reducer, initialState);

    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}