import { useSelector,useDispatch } from 'react-redux';
import NewNoteForm from './NewNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'


const NewUser = () => {

    

    const dispatch = useDispatch();

    const users = useSelector(state => state.users)
    
    useEffect(() => {
        dispatch(getUsers());
      }, [dispatch]);
    

    

    if (!users?.length) return <PulseLoader color={"#FFF"} />

    const content = <NewUserForm/>

    return content
}
export default NewNote