import React, {useState, useContext, useEffect} from 'react'
import {getData} from '../utils/fetchData'
import Head from 'next/head'
import ProductItem from '../components/ProductItem'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'
import Filter from '../components/Filter'
import Layout from '../components/Layout/Layout'

const ListProduct = (props) => {
    const [products, setProducts] = useState (props.products)

    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    const [isCheck, setIsCheck] = useState(false)
    const [page, setPage] = useState(1)
    const router = useRouter()

    useEffect(() => {
        setProducts(props.products)
    },[props.products])

    useEffect(() => {
        if(Object.keys(router.query).length === 0) setPage(1)
    }, [router.query])

    const handleCheck = (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const handleCheckALL = () => {
        products.forEach(product => product.checked = !isCheck)
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const handleDeleteAll = () => {
        let deleteArr = [];
        products.forEach(product => {
        if(product.checked){
            deleteArr.push({
                data: '', 
                id: product._id, 
                name: 'Delete all selected products?', 
                type: 'DELETE_PRODUCT'
            })
        }
        })

        dispatch({type: 'ADD_MODAL', payload: deleteArr})
    }

    const handleLoadmore = () => {
        setPage(page + 1)
        filterSearch({router, page: page + 1})
    }
    

    return (
        <div>
            <Head>
                <title>List Products</title>
            </Head>

        <Layout>
            <div className="container">
                <Filter  state={state}/>
                {
                    auth.user && auth.user.role === 'admin' && 
                    <div className="w-100 justify-content-between mt-3">
                        <div className="btn btn-danger delete_all py-0">
                            <input type="checkbox" checked={isCheck} onChange={handleCheckALL}
                            style={{height: '20px', width: '20px', transform: 'translateY(8px)'}} />
                            <button className="btn btn-danger ml-2"
                                data-toggle="modal" data-target="#exampleModal"
                                onClick={handleDeleteAll} >
                                DELETE ALL
                            </button>
                        </div>
                        <div className="btn btn-pastel float-right">
                            <Link href="/create">
                                <a style={{textDecoration: 'none'}}>CREATE</a>
                            </Link>
                        </div>
                    </div>
                }
                
                
                <div className="pro-item">
                {
                    products.length === 0
                    ? <h2>No Products</h2>

                    :products.map(product => (
                        <ProductItem key={product._id} product={product} handleCheck={handleCheck}/>
                    ))
                    
                }
                </div>

                {
                    props.result < page * 6 ? ""
                    : <button className="btn btn-outline-dark d-block mx-auto mb-4"
                        onClick={handleLoadmore}>
                        Load more
                    </button>
                }
            </div>
        </Layout>
        
        </div>       
    )
}

export async function getServerSideProps({query}) {
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'
    
    const res = await getData(
        `product?limit=${page * 6}&category=${category}&sort=${sort}&name=${search}`
    )

    // server side rendering
    return {
      props: {
          products: res.products,
          result: res.result
      }, // will be passed to the page component as props
    }
  }

export default ListProduct