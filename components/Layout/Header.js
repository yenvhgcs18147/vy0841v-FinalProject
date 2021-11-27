import React from 'react'
import NavBar from './NavBar'
import Link from 'next/link'
import Search from '../Search'

function Header() {
    return (
        <div className="main-header">
            <div className="hd-wrapper">
                <Link href="/">
                    <img className="logo" src="/image/Layout/logo.png" alt="Logo"/>
                </Link> 
                <Search />
                {/*<div className="search">
                    <input type="text" name="" id="" placeholder="Write something" className="search__input" />
                    <button type="submit" className="search__button" tabIndex="-1">Search</button>
                </div>*/}
                <NavBar />
            </div>
            
        </div>
    )
}

export default Header
