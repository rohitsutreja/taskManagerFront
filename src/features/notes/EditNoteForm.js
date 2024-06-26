import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { editNote, deleteNote } from "./noteSlice";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth"
import PulseLoader from 'react-spinners/PulseLoader'

const EditNoteForm = ({ note, users }) => {
  const { isManager, isAdmin } = useAuth()

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reqStatus, setReqStatus] = useState('idle');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);
 

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && reqStatus === "idle";

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      try {
        setReqStatus('pending')
        await dispatch(editNote({ id: note._id, user: userId, title, text, completed })).unwrap()
        setTitle("");
        setText("");
        setUserId("");

        navigate('/dash/notes', { replace: true })

      } catch(error) {
        setIsError(true)
        setErrorMessage(error)
      }
      finally{
        setReqStatus('idle')
      }
    }
  };

  const onDeleteNoteClicked = async () => {
    try {
      setReqStatus('pending')
      await dispatch(deleteNote(note)).unwrap();
      setTitle("");
      setText("");
      setUserId("");

      navigate('/dash/notes', { replace: true })

    } catch (error) {
      setIsError(true)
      setErrorMessage(error)
    }
    finally{
        setReqStatus('idle')
    }
  };

  const created = new Date(note.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });


  const updated = new Date(note.updatedAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => {
    return (
      <option key={user._id} value={user._id}>
        {" "}
        {user.username}
      </option>
    );
  });

  

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  let deleteButton = null;
  
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        disabled={!canSave}
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  let saveButton = null;

  saveButton = ( 
  <button
    className="icon-button"
    title="Save"
    onClick={onSaveNoteClicked}
    disabled={!canSave}
  >
    <FontAwesomeIcon icon={faSave} />
  </button>
  )

  let buttonContent = null;

  if(reqStatus === 'pending'){
    buttonContent = <PulseLoader color={"#FFF"} />
  }
  else{
    buttonContent = (
      <>
          {saveButton}
          {deleteButton}
      </>
  )
  }

  


  let content = (
    <>
      <p className={errClass}>{isError?errorMessage:null}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note</h2>
          <div className="form__action-buttons">
             {buttonContent}
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );



  return content;
};

export default EditNoteForm;
