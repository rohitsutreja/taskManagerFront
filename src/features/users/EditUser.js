import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import PulseLoader from 'react-spinners/PulseLoader'
import { useSelector,useEffect } from 'react-redux/es/hooks/useSelector'


const EditUser = () => {


    const { id } = useParams()

    useEffect(() => {
        dispatch(getNotes());
      },[dispatch]);
    
      useEffect(() => {
        dispatch(getUsers());
      }, [dispatch]);
    
    const { users } = useSelector((state) => state.users);

    const user = users.find((note) => note._id === id);
    if (!user) return <PulseLoader color={"#FFF"} />

    const content = <EditUserForm user={user} />

    return content
}
export default EditUser