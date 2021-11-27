import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Notify from '../Notify'
import Modal from '../Modal'


function Layout ({children}) {
    return (
        <div>
            <Header />
            <Notify /> 
            <Modal />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
