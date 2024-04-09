import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import usePersist from '../../hooks/usePersist'
// import PulseLoader from 'react-spinners/PulseLoader'
import { logIn } from './authSlice'

const Login = () => {


    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [reqStatus, setReqStatus] = useState('idle');

    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [persist, setPersist] = usePersist()
    // const {accessToken} = useSelector(selectCurrentToken)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setIsError(false);
        setErrorMessage('');
    }, [username, password])


    const canSave = [username, password].every(Boolean) && reqStatus === "idle";

    const handleSubmit = async (e) => {

        if(canSave){
            e.preventDefault()
            try {
    
                setReqStatus('pending')
                
                await dispatch(logIn({username, password})).unwrap()
    
                setUsername('')
                setPassword('')
    
                navigate('/dash')
    
            } catch (err) {
                setIsError(true)
                setErrorMessage(err)
            }
            finally{
                setReqStatus('idle')
            }
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = isError ? "errmsg" : "offscreen"

    // if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{isError?errorMessage:null}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>


                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>

                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default Login