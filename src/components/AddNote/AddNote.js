import React, { useContext, useReducer } from "react";
import NoteContext from "../../context/notes/noteContext";
import { initialState, actions, addNotereducer } from "./reducer";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [state, dispatch] = useReducer(addNotereducer, initialState);

  const handleClick = (e) => {
    e.preventDefault();
    const { title, discription, tag } = state;

    addNote(title, discription, tag);

    dispatch({ type: actions.RESET });
    props.showAlert("Added Successfully", "success");
  };

  const updateState = (fieldName, value) => {
    dispatch({ type: actions.ADD_STATE, payload: { fieldName, value } });
  };

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={(e) => updateState("title", e.currentTarget.value)}
            value={state.title}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Discription
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="discription"
            onChange={(e) => updateState("discription", e.currentTarget.value)}
            value={state.discription}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={(e) => updateState("tag", e.currentTarget.value)}
            value={state.tag}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={state.title.length < 5 || state.discription.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
