import React from 'react'
import Head from 'next/head' 
import Navbar1 from '../components/LayoutAdmin/NarBar1'

const admindashboard = () => {
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>

            <Navbar1 />
        </div>
    )
}

export default admindashboard
