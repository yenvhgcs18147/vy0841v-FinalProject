import React, {useContext, useState} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DataContext } from '../../store/GlobalState'
import { patchData } from '../../utils/fetchData'
import Notify from '../../components/Notify'

const ResetPassword = () => {
    const router = useRouter()
    const { token } = router.query

    const initialState = { 
        password: '', 
    }
    const [data, setData] = useState(initialState)
    const {password} = data

    const {state, dispatch} = useContext(DataContext)
    const {auth} = state    

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleSubmit = () => {
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData('user/resetPassword', {password}, token)
        .then(res => { 
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
            return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
        })
    }

    return (
        <div>
            <Head>
                <title>Reset password</title>
            </Head>

            <Notify />
            <div className="wrapper1">
                <div className="inner1">
                    <div className="px-2 py-3 text-center">
                        <h1 className="my-3">RESET PASSWORD</h1>
                        <p>Enter your new password.</p>
                        <input type="password" name="password" id="password" 
                            className="form-control" value={password}
                            onChange={handleChange} />
                        <button type="submit" className="btn btn-pastel"
                            onClick={handleSubmit}>Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
