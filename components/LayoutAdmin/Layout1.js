import React from 'react'
import Notify from '../Notify'
import Modal from '../Modal'
import Navbar1 from './NarBar1'


function Layout1 ({children}) {
    return (
        <div>
            <Navbar1 />
            <Notify /> 
            <Modal />
            {children}
        </div>
    )
}

export default Layout1
