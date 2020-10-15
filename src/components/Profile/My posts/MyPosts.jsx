import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm, reset } from "redux-form";
import {
  required,
  maxLengthCreator,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo((props) => {
  let postsElements = [...props.posts]
    .reverse()
    .map((p) => (
      <Post
        key={p.id}
        text={p.text}
        likesCount={p.likesCount}
        profile={props.profile}
      />
    ));

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

const maxLength100 = maxLengthCreator(100);

const AddNewPostForm = (props) => {
  return (
    <form className={s.textForm} onSubmit={props.handleSubmit}>
      <Field
        className={s.textArea}
        component={Textarea}
        name="newPostBody"
        placeholder="Write post text..."
        validate={[required, maxLength100]}
      />
      <button className={s.buttonSend}>Add post</button>
    </form>
  );
};

const afterSubmit = (result, dispatch) =>
  dispatch(reset("profileAddNewPostForm"));

const AddPostFormRedux = reduxForm({
  form: "profileAddNewPostForm",
  onSubmitSuccess: afterSubmit,
})(AddNewPostForm);

export default MyPosts;
