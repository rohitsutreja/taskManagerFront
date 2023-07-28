import { useEffect } from 'react'
import NewNoteForm from './NewNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'
import { getUsers } from '../users/userSlice'
import { useSelector , useDispatch} from 'react-redux'

const NewNote = () => {
    // useTitle('techNotes: New Note')

    const dispatch = useDispatch()

  const {users} = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])


    if (!users?.length) return <PulseLoader color={"#FFF"} />

    const content = <NewNoteForm users={users} />

    return content
}
export default NewNote