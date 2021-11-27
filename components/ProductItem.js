import React, {useContext} from 'react'
import Link from 'next/link'
import { DataContext } from '../store/GlobalState'
import { addToCart } from '../store/Action'


const ProductItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    
    
    const userLink = () => {
        return (
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-pastel">View</a>
                </Link>
                <button className="btn btn-dark"
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => dispatch(addToCart(product, cart))}>
                    Add to Bag
                </button>
            </>
        )
    }

    const adminLink = () => {
        return (
            <>
                <Link href={`create/${product._id}`}>
                    <a className="btn btn-dark">Edit</a>
                </Link>
                <button className="btn btn-danger"
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={() => dispatch({
                        type: 'ADD_MODAL',
                        payload: [{ 
                            data: '', id: product._id, 
                            name: product.name, type: 'DELETE_PRODUCT' 
                        }]
                    })} >
                    Delete
                </button>
            </>
        )
    }

    return (
        <div className="card">
            {
                !auth.user || auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked} 
                className="position-absolute"
                style={{height: '20px', width: '20px'}}
                onChange = {() => handleCheck(product._id)}/>
            }
            <img src={product.images[0].url} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h3 className="card-title" title={product.name}>
                    {product.name}
                </h3>
                <div className="row justify-content-between mx-0">
                    <h5 className="text-danger">${product.price}</h5>
                    {
                        product.inStock > 0
                        ? <h5 className="text-danger">In Stock: {product.inStock}</h5>
                        : <h5 className="text-danger">Out Stock</h5>
                    }
                </div>
                <div className="row mx-0">
                    {
                        !auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductItem
