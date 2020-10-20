import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Route } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { required, maxLengthCreator } from "../../utils/validators/validators";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} />
  ));

  // Принимает values при событии onSubmit нашей формы AddMessageForm
  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div>
      <div className={s.chatbox}>Chatbox / Messages</div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElements}</div>
        <div className={s.messages}>
          {messagesElements}
          <Route
            path="/dialogs/2"
            component={() => {
              return <div>Messages for id 2</div>;
            }}
          />
        </div>
        {/* Событие onSubmit передает данные из формы колбеку addNewMessage */}
        <AddMessageFormRedux onSubmit={addNewMessage} /> 
      </div>
    </div>
  );
};

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return (
    <form className={s.textForm} onSubmit={props.handleSubmit}>
      <Field
        class={s.textArea}
        component={Textarea}
        name="newMessageBody"
        placeholder="Write your message..."
        validate={[required, maxLength50]}
      />
      <button className={s.buttonSend}>Send</button>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({
  form: "dialogAddMessageForm",
})(AddMessageForm);

export default Dialogs;
