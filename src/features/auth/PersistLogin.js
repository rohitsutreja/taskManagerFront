import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { refresh, selectCurrentToken } from "./authSlice"
import PulseLoader from 'react-spinners/PulseLoader'
import { useDispatch } from "react-redux"
const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const dispatch= useDispatch()


    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [reqStatus, setReqStatus] = useState('idle');



    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response = 
                    setReqStatus('pending')
                    await dispatch(refresh())
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    setIsError(true)
                    setErrorMessage(err)
                }
                finally{
                    setReqStatus('idle')
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (reqStatus === 'pending') { //persist: yes, token: no
        console.log('loading')
        content = <PulseLoader color={"#FFF"} />
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {isError?errorMessage:null}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token) { //persist: yes, token: y
        content = <Outlet />
    }

    return content
}


export default PersistLogin