import React, {useContext} from 'react'
import Head from 'next/head'
import Layout1 from '../components/LayoutAdmin/Layout1'
import {DataContext} from '../store/GlobalState'
import Link from 'next/link'
import Home from '.'


const Users = () => {
    const {state, dispatch} = useContext(DataContext)
    const {users, auth, modal} = state


    if(!auth.user) return (
        <Home />
    );
    return (
        <div>
            <Head>
                <title>Manage Users</title>
            </Head>

            <Layout1>
                <div className="container">
                    <h3 className="text-capitalize my-4 text-center">Manage Users</h3>
                    <div className="table-responsive my-4 px-5">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="font-weight-normal">
                                {
                                    users.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.role === 'admin'
                                                    ? user.root ? <p className="text-danger"> Admin </p>
                                                                : <p className="text-success"> Staff </p>
                                                    : <p>User</p>
                                                }
                                            </td>
                                            <td>
                                                <Link href={
                                                    auth.user.root && auth.user.email !== user.email
                                                    ? `/edit_user/${user._id}` : '#!'
                                                }>
                                                    <a><i className="fas fa-edit text-info mr-2" title="edit"></i></a>
                                                </Link>
                                                {/*
                                                    auth.user.root && auth.user.email !== user.email
                                                    ? <i className="fas fa-trash-alt text-danger ml-2" title="Delete"
                                                        data-toggle="modal" data-target="#exampleModal"
                                                        onClick = {() => dispatch({
                                                            type : 'ADD_MODAL',
                                                            payload : [{ data: users, id : user._id, name : user.name, type: 'ADD_USERS'}]
                                                        })}></i>
                                                    : <i className="fas fa-trash-alt text-danger ml-2" title="Delete"></i>
                                                */}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout1>
        </div>
    )
}

export default Users
