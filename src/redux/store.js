import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _callSubscriber() {
    console.log("no observers");
  },
  _state: {
    profilePage: {
      posts: [
        { id: 1, text: "Hi, how are you?", likesCount: 15 },
        { id: 2, text: "It's my first post", likesCount: 20 },
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "User1" },
        { id: 2, name: "User2" },
        { id: 3, name: "User3" },
        { id: 4, name: "User4" },
      ],

      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "It's me" },
      ],
      newMessageText: "",
    },
    sidebar: {
      friends: [
        { id: 1, name: "Vladislav" },
        { id: 2, name: "Kisel" },
        { id: 3, name: "Friend1" },
        { id: 4, name: "Friend2" },
        { id: 5, name: "Friend3" },
      ],
    },
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};

window.store = store;
export default store;
