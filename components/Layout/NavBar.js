import React, {useContext} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../../store/GlobalState'
import Cookie from 'js-cookie'

function navbar() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const { auth, cart }  = state

    const isActive = (r) => {
        if (r === router.pathname) {
            return " active"
        } else {
            return ""
        }
    }

    const hanldeLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstSignin')
        dispatch({ type: 'AUTH', payload: {} })
        return router.push('/')
    }

    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar} className="avatar"/>
                    {auth.user.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    <a className="dropdown-item" onClick={hanldeLogout}>Log out</a>
                </div>
            </li>
        )
    }

    const adminRouter = () => {
        return (
            <>
                <li className="nav-item">
                    <Link href="/admindashboard">
                        <a className="nav-link">
                           Admin Dashboard
                        </a>
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link href="/users">
                        <a className="nav-link">
                            Users
                        </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/categories">
                        <a className="nav-link">
                            Categories
                        </a>
                    </Link>
                </li> */}
            </>
        )
    }

    return (
        <div className="row justify-content-between mx-2">
            <nav className="navbar navbar-expand-lg navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">                        
                        <li className="nav-item">
                            <Link href="/ListProduct">
                                <a className="nav-link">
                                    Chocolate
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/orders">
                                <a className="nav-link">
                                    Orders
                                </a>
                            </Link>
                        </li>
                        
                        {/* {   
                            Object.keys(auth).length !== 0 
                            ?   auth.user.role === 'admin' && auth.user.root ?  adminRouter()
                                                :  proderRouter()
                            :   <li className="nav-item">
                                    <Link href="/ListProduct">
                                        <a className="nav-link">Chocolate</a>
                                    </Link>
                                </li>
                        } */}

                        <li className="nav-item right">
                            <Link href="/cart">
                                <a className={"nav-link" + isActive('/cart')}>
                                    <i className="fas fa-shopping-bag position-relative">
                                        <span className="position-absolute nu-cart">{cart.length}</span>
                                    </i> My Bag</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                    {
                        auth.user && auth.user.role === 'admin' && auth.user.root
                        ? adminRouter()
                        : <></>
                    }

                    {
                        Object.keys(auth).length === 0 
                        ? <li className="nav-item">
                            <Link href="/signin">
                                <a className={"nav-link" + isActive('/signin')}>
                                    <i className="fas fa-user" aria-hidden="true"></i> Sign in
                                </a>
                            </Link>
                        </li>
                        : loggedRouter()
                    }
                </ul>
            </nav>
        </div>
        
    )
}

export default navbar
