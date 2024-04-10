import User from "./User";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./userSlice";
import PulseLoader from 'react-spinners/PulseLoader'

const UsersList = () => {
  const { isLoading, users } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("getting")
    dispatch(getUsers());
  },[dispatch]);

  const tableContent = users.map((user,index) => <User key={index} user={user} />);

  let content;

  if (isLoading) {
    content = <PulseLoader color={"#FFF"} />
  } else {
    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  // }

  return content;
};
export default UsersList;
