import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
// import PulseLoader from "react-spinners/PulseLoader";
import { getNotes } from "./noteSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../users/userSlice";

const EditNote = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // const { username, isManager, isAdmin } = useAuth()
  useEffect(() => {
    dispatch(getNotes());
  },[dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  const { users } = useSelector((state) => state.users);
  const { notes } = useSelector((state) => state.notes);

  const note = notes.find((note) => note._id === id);

//   if (!note || !users?.length) return <PulseLoader color={"#FFF"} />;

  //   if (!isManager && !isAdmin) {
  //     if (note.username !== username) {
  //       return <p className="errmsg">No access</p>;
  //     }
  //   }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};
export default EditNote;
