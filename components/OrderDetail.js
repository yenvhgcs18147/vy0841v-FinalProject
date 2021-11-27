import React from 'react'
import PaypalBtn from './PaypalBtn'
import { patchData } from '../utils/fetchData'
import { updateItem } from '../store/Action'

const OrderDetail = ({orderDetail, state, dispatch}) => {
    const { auth, orders } = state

    const handleCompleted = (order) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})

        patchData(`order/completed/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            const { paid, dateOfPayment, method, delivered } = res.result

            dispatch(updateItem(orders, order._id, {
                ...order, paid, dateOfPayment, method, delivered
            }, 'ADD_ORDERS'))

            //return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    const handleCancle = (order) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})

        patchData(`order/cancle/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            const { paid, delivered, cancle } = res.result

            dispatch(updateItem(orders, order._id, {
                ...order, paid, delivered, cancle
            }, 'ADD_ORDERS'))

            //return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    if(!auth.user) return null;
    return (
        <>
        {
            orderDetail.map(order => (
                <div key={order._id}>
                    <h2 className="text-center mb-5">Order Detail 
                        {/* {order._id} */}
                    </h2>
                    <div className="row">
                        <div className="col-md-6 ">
                            <h3 className="mb-3">Payment</h3>
                            {
                                order.method && <p>Method: <em>{order.method}</em></p>
                            }
                            
                            {
                                order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>
                            }
                            <div className="d-flex justify-content-between align-items-center" role="alert">
                                {
                                    order.paid 
                                    ? <p className="text-success">Paid on {order.dateOfPayment}</p> 
                                    : <p className="text-danger">Not Paid</p>
                                }
                            </div>
                                {
                                    !order.paid && auth.user.role !== 'admin' &&
                                    <div>
                                        {/* <p>You can pay on pick up</p> */}
                                        <PaypalBtn order={order} />
                                    </div>
                                }
                        </div>
                        {
                            auth.user.role === 'admin' &&
                            <div className="col-md-6">
                                <h3 className="mb-3">Shipping</h3>
                                <p>Name: {order.user.name}</p>
                                <p>Email: {order.user.email}</p>
                                <p>Address: {order.address}</p>
                                <p>Mobile: {order.mobile}</p>
                            </div>
                        }
                    </div>
                    <div className="row">
                        <h3 className="my-3 ml-3">Order Items</h3>
                        <div className="table-responsive my-3">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th></th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.cart.map(item => (
                                            <tr key={item._id}>
                                                <td>
                                                    <img style={{width: '100px', objectFit: 'cover'}} src={item.images[0].url} alt="image product"/>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price * item.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <div className="row justify-content-end">
                        <h4 className="mr-3">Total: ${order.total}</h4>
                    </div>
                    {
                        auth.user.role === 'admin' &&
                        <div className="text-center">
                            <button className="btn btn-dark text-capitalize mx-2"
                                onClick={() => handleCompleted(order)}>
                                Completed
                            </button>
                            <button className="btn btn-danger text-capitalize mx-2"
                                onClick={() => handleCancle(order)}>
                                Cancle
                            </button>
                        </div>
                    }
                </div>
            ))
        }
        </>
    )
}

export default OrderDetail
