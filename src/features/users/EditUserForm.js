import { useState, useEffect } from "react"
import {  useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { useSelector, useDispatch } from "react-redux"
import { deleteUser , editUser } from "./userSlice"
import PulseLoader from 'react-spinners/PulseLoader'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUser = () => {
    const [reqStatus, setReqStatus] = useState(false)
    const [isError,setIsError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    const {users} = useSelector(state => state.users);

    const user = users.find(user => user._id === id);

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
           try {
            setReqStatus('pending')
            await dispatch(editUser({ id: user._id, username, password, roles, active })).unwrap();
            navigate(-1);
           } catch (error) {
            setIsError(true)
            setErrorMessage(error)
           }
           finally{
            setReqStatus('idle')
           }
        } else {
            try {
                setReqStatus('pending')
                await dispatch(editUser({ id: user._id, username, roles, active })).unwrap();
                navigate('/dash/users')
               } catch (error) {
                setIsError(true)
                setErrorMessage(error)
               }
               finally{
                setReqStatus('idle')
               }
        }
    }

    const onDeleteUserClicked = async () => {
       try{
        setReqStatus('pending')
        await dispatch(deleteUser(user._id)).unwrap();
        navigate(-1);
       }
       catch(error) {
        setIsError(true)
        setErrorMessage(error)
       }
       finally{
        setReqStatus('idle')
       }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) 
    } else {
        canSave = [roles.length, validUsername].every(Boolean) 
    }

   
    const errClass = isError ? "errmsg" : "offscreen";
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    let deleteButton = null;
  
      deleteButton = (
        <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteUserClicked}
    >
        <FontAwesomeIcon icon={faTrashCan} />
    </button>
      );
 
  
    let saveButton = null;
  
    saveButton = ( 
        <button
        className="icon-button"
        title="Save"
        onClick={onSaveUserClicked}
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

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        
                       {buttonContent}
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default EditUser;