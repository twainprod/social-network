const {
  default: profileReducer,
  addPost,
  deletePost,
} = require("./profile-reducer");

let state = {
  posts: [
    { id: 1, text: "Hi, how are you?", likesCount: 15 },
    { id: 2, text: "It's my first post", likesCount: 20 },
  ],
};

// expect(newState.posts.length).toBe(5);
// expect(received).toBe(expected);
// Сравнение полученного значения и ожидаемого

test("Количество постов увеличится", () => {
  // 1. Данные для теста
  let action = addPost("twainprod.com");

  // 2. action
  let newState = profileReducer(state, action);

  // 3. Тестирование
  expect(newState.posts.length).toBe(3);
});

test("message of new post should be correct", () => {
  let action = addPost("twainprod.com");
  let newState = profileReducer(state, action);
  expect(newState.posts[2].text).toBe("twainprod.com");
});

test("После удаления поста длина массива должна уменьшиться", () => {
  let action = deletePost(1);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(1);
});

test("after deleting length shouldn't be decrement if id is incorrect", () => {
  let action = deletePost(100);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(2);
});
