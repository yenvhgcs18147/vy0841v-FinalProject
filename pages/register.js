import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext } from 'react'
import valid  from '../utils/valid'
import { DataContext } from '../store/GlobalState'
import {postData}  from '../utils/fetchData'
import Notify from '../components/Notify'

const Register  = () =>{
    const  initialState = { name: '',email: '', password: ''}
    const [userData, setUserData] = useState(initialState)
    const {name, email, password} = userData
    
    const {state, dispatch} = useContext(DataContext)
    
    const handleChange = e =>{
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleSubmit = async e =>{

        e.preventDefault()
        const errMsg = valid(name, email, password)
        if(errMsg) return dispatch({type: 'NOTIFY', payload: {error: errMsg}})

        dispatch({type: 'NOTIFY', payload: {loading: true}})

        const res = await postData('auth/register', userData)
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})

    }

    return(
        <div>
            <Head>
                <title>Register Page</title>
            </Head>

            <Notify />
            <div className="wrapper">
                <div className="inner">
                    <Link href='/'>
                        <img className="img-log" src="/image/Layout/Img-log.png" />
                    </Link>
                    <form onSubmit = {handleSubmit}>
                        <h1>REGISTER</h1>
                        <div className="form-group">
                            <label htmlFor ="exampleInputname1">Name</label>
                            <input className="form-control" 
                            type="text" 
                            name="name" 
                            id="name" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter name"
                            value = {name} onChange = {handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor ="exampleInputEmail1">Email address</label>
                            <input  className="form-control" 
                            type="email" 
                            name="email" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            value = {email} onChange = {handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor ="exampleInputPassword1">Password</label>
                            <input className="form-control" 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password"
                            value = {password} onChange = {handleChange}></input>
                        </div>
                        <div className="form-login">    
                            <button type="submit">Register</button>
                            <button><Link href = "/signin"><a>Sign In</a></Link></button>
                        </div>
                    </form>
                </div>
            </div>
                
            
            
        </div>
    )
}
export default Register