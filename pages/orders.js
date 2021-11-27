import React, {useContext} from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import Layout from '../components/Layout/Layout'

const Orders = () => {
    const {state, dispatch} = useContext(DataContext)
    const { orders, auth } = state

    return (
        <div>
            <Head>
                <title>Orders</title>
            </Head>

            <Layout>
                <div className="container"> 
                    <h2 className="text-center text-capitalize my-3">Orders</h2>
                    <div className="table-responsive my-4 px-5">
                        <table className="table table-hover">
                            <thead className="thead-dark">  
                                <tr>
                                    <th>#</th>
                                    {
                                        auth.user && auth.user.role === 'admin'
                                        && <th>Customer</th>
                                    } 
                                    <th>Id</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Paid</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td>{index + 1}</td>
                                            {
                                                auth.user && auth.user.role === 'admin'
                                                && <td>{order.user.name}</td>
                                            }
                                            <td>{order._id}</td>
                                            <td>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>${order.total}</td>
                                            <td>
                                                {
                                                    order.cancle
                                                    ? <p className="text-danger">Cancle</p>
                                                    : order.delivered
                                                        ? <p className="text-success">Complete</p>
                                                        : <p>Not yet</p>
                                                    
                                                }
                                            </td>
                                            <td>
                                                {
                                                    order.paid
                                                    ? <i className="fas fa-check text-success"></i>
                                                    : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td>
                                                <Link href={`/order/${order._id}`}>
                                                    <a><i className="fas fa-eye"></i></a>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </div>
    
    )
}

export default Orders
