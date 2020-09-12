import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import {
  required,
  maxLengthCreator,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo((props) => {
  let postsElements = [...props.posts]
    .reverse()
    .map((p) => <Post text={p.text} likesCount={p.likesCount} />);

  let onAddPost = (values) => {
    props.addPost(values.newPostBody);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form className={s.textForm} onSubmit={props.handleSubmit}>
      <Field
        className={s.textArea}
        component={Textarea}
        name="newPostBody"
        placeholder="Write post text..."
        validate={[required, maxLength10]}
      />
      <button className={s.buttonSend}>Add post</button>
    </form>
  );
};

const AddPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;
