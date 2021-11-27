import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import {postData}  from '../utils/fetchData'
import Cookie from 'js-cookie'
import {useRouter} from 'next/router'
import { GoogleLogin } from 'react-google-login';
import Notify from '../components/Notify'

const Signin  = () =>{
    const  initialState = { email: '', password: ''}
    const [userData, setUserData] = useState(initialState)
    const {email, password} = userData

    const {state, dispatch} = useContext(DataContext)
    const { auth } = state
    
    const router = useRouter()
    
    const handleChange = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleSubmit = async e =>{

        e.preventDefault()
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        const res = await postData('auth/signin', userData)
        
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
        dispatch({ type: 'NOTIFY', payload: {success: res.msg} })

        dispatch({ type: 'AUTH', payload: {
        token: res.access_token,
        user: res.user
        }})

        Cookie.set('refreshtoken', res.refresh_token, {
        path: 'api/auth/accessToken',
        expires: 7
        })

        localStorage.setItem('firstSignin', true)
    }

    const responseGoogle = async (response) => {
        console.log(response)

        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        const res = await postData('auth/google-login', {tokenId: response.tokenId})
        
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
        dispatch({ type: 'NOTIFY', payload: {success: res.msg} })

        dispatch({ type: 'AUTH', payload: {
        tokenId: res.access_token,
        user: res.user
        }})

        Cookie.set('refreshtoken', res.refresh_token, {
        path: 'api/auth/accessToken',
        expires: 7
        })

        localStorage.setItem('firstSignin', true)
    }

    useEffect (() => {
        if(Object.keys(auth).length !== 0) router.push('/')
    }, [auth])

    

    return(
        <div>
            <Head>
                <title>Sign in Page</title>
            </Head>

            <Notify />
            <div className="wrapper">
                <div className="inner">
                    <Link href='/'>
                        <img className="img-log" src="/image/Layout/Img-log.png" />
                    </Link>
                    <form onSubmit = {handleSubmit}>
                        <h1>SIGN IN</h1>
                        <div className="form-group">
                            <label htmlFor ="exampleInputUsername1">Email:</label>
                            <input className="form-control" 
                            type="email" 
                            name="email" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter Email"
                            value= {email} onChange= {handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor ="exampleInputPassword1">Password</label>
                            <input className="form-control" 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password"
                            value= {password} onChange = {handleChange}></input>
                        </div>
                        <div className="mb-3">
                        <Link href="/forgotPassword">
                            <a style={{color: '#FF9AA2'}}>Forgot Password?</a>
                        </Link>
                        </div>
                        <div className="form-login justify-content-between">    
                            <button type="submit">Sign In</button>
                            <button style={{float: 'right'}}>
                                <Link href = "/register"><a>Register</a></Link>
                            </button>
                        </div>
                        <hr/>
                        <GoogleLogin
                            className="w-100 justify-content-center"
                            clientId="716963011971-42rv1f7s31c1imnjhnupahr9uveeiok1.apps.googleusercontent.com"
                            buttonText="Login with google"
                            onSuccess={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </form>
                </div>
            </div>
                
            
            
        </div>
    )
}
export default Signin