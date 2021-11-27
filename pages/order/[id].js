import React, {useContext, useState, useEffect} from 'react'
import Head from 'next/head'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import OrderDetail from '../../components/OrderDetail'
import Layout from '../../components/Layout/Layout'

const DetailOrder = () => {
    const { state, dispatch } = useContext(DataContext)
    const { orders, auth } = state

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])

    if(!auth.user) return null;
    return (
        <div>
            <Head>
                <title>Order Detail</title>
            </Head>

            <Layout>
                <div className="container">
                    <div>
                        <button className="btn btn-dark my-3" onClick={() => router.back()}>
                            <i className="fas fa-long-arrow-alt-left"  aria-hidden="true"></i> Go Back
                        </button>
                    </div>

                    <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />
                </div>
            </Layout>
        </div>
    )
}

export default DetailOrder
