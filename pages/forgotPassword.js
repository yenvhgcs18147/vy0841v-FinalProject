import React,{ useState, useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Head from 'next/head'
import { postData } from '../utils/fetchData'
import Notify from '../components/Notify'


const ForgotPassword = () => {
    const  initialState = { email: ''}
    const [data, setData] = useState(initialState)
    const {email} = data

    const {state, dispatch} = useContext(DataContext)
    
    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }
    //const [email, setEmail] = useState('')

    const handleSubmit = async () => {
        
        dispatch({ type: 'NOTIFY', payload: {loading: true} })

        const res = await postData('auth/forgotPassword', data)

        console.log(res)

        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})

    }

    return (
        <div>
            <Head>
                <title>Forgot password</title>
            </Head>

            <Notify />
            <div className="wrapper1">
                <div className="inner1">
                    <div className="px-2 py-3 text-center">
                        <h1 className="my-3">FORGOT PASSWORD</h1>
                        <p>Please enter your email to reset passord.</p>
                        <input type="email" name="email" id="email" 
                            className="form-control" value={email}
                            onChange={handleChange} />
                        <button type="submit" className="btn btn-pastel"
                            onClick={handleSubmit}>Verify your email</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
