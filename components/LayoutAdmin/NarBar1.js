import React from 'react'
import Link from 'next/link'

function navbar1 () {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{background: '#FFDDDD'}}>
                <a className="navbar-brand" href="#">Admin DashBoard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link href="/admindashboard">  
                                <a className="nav-link">
                                    Dashboard
                                </a>
                            </Link>                        
                        </li>
                        <li className="nav-item active">
                            <Link href="/users">  
                                <a className="nav-link">
                                    Users
                                </a>
                            </Link>                        
                        </li>
                        <li className="nav-item active">
                            <Link href="/categories">  
                                <a className="nav-link">
                                    Categories
                                </a>
                            </Link>                        
                        </li>
                        <li className="nav-item active">
                            <Link href="/">  
                                <a className="nav-link">
                                    Home
                                </a>
                            </Link>                        
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default navbar1
