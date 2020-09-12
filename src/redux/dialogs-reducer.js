const ADD_MESSAGE = "dialogs/ADD-MESSAGE";

let initialState = {
  dialogs: [
    { id: 1, name: "Vladislav Kisel" },
    { id: 2, name: "Anastasiya Ladik" },
    { id: 3, name: "Dmytri Zhuikov" },
    { id: 4, name: "Roman Makarovskiy" },
  ],

  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "It's me" },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 4, message: body }],
      };
    }
    default:
      return state;
  }
};

export let sendMessageActionCreator = (newMessageBody) => ({
  type: ADD_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
