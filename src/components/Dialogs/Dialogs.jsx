import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm, reset } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { useState } from "react";

const Dialogs = (props) => {
  let state = props.dialogsPage;  

  let dialogId = props.match.params.dialogId;

  if (!dialogId) {
    dialogId = 0
  }

  
  const [id, setId] = useState(dialogId);

  const idToMessages = (id) => {
    setId(id)
  }
  
  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} idToMessages={idToMessages}/>
  ));  

  let messagesElements = state.messages[id].map((m) => (
    <Message key={m.id} message={m.message} />
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
        </div>
        {/* Событие onSubmit передает данные из формы колбеку addNewMessage */}
        {id !== 0 &&
          <AddMessageFormRedux onSubmit={addNewMessage} />}
      </div>
    </div>
  );
};

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return (
    <form className={s.textForm} onSubmit={props.handleSubmit}>
      <Field
        className={s.textArea}
        component={Textarea}
        name="newMessageBody"
        placeholder="Write your message..."
        validate={[required, maxLength50]}
      />
      <button className={s.buttonSend}>Send</button>
    </form>
  );
};

const afterSubmit = (result, dispatch) =>
  dispatch(reset("dialogAddMessageForm"));

const AddMessageFormRedux = reduxForm({
  form: "dialogAddMessageForm",
  onSubmitSuccess: afterSubmit
})(AddMessageForm);

export default Dialogs;
