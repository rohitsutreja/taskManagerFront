import { useEffect } from "react";
import Note from "./Note";
import { getNotes } from "./noteSlice";
import { useDispatch, useSelector } from "react-redux";

const NotesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const { notes, isLoading, isSuccess, isError } = useSelector(
    (state) => state.notes
  );

  let content;

  console.log(notes);
  if (isError) {
    content = <p>Error</p>;
  }

  if (isLoading) content = <p>Loading...</p>;

  console.log(isLoading);

  if (isSuccess) {
    const tableContent = notes.map((note) => (
      <Note key={note._id} note={note} />
    ));

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );

    return content;
  }
};

export default NotesList;
