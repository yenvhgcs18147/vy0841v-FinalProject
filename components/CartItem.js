import React from 'react'
import Link from 'next/link'
import { minus, plus } from '../store/Action'

const CartItem = ({item, dispatch, cart}) => {
        return (
        <tr className="">
            <td className="item-img align-middle">
                <img src={item.images[0].url} alt={item.images[0].url}
                    className="img-thumbnail w-100 item" />
            </td>
            <td className=" item-info">
                <h4 className="text-capitalize">
                    <Link href={`/product/${item._id}`}>
                        <a>{item.name}</a>
                    </Link>
                </h4>
                <h6 className=" my-1 text-danger">${item.quantity * item.price}</h6>
                {
                     item.inStock > 0
                    ? <p className="my-1 text-danger">In Stock: {item.inStock} </p>
                    : <p className="my-1 text-danger">Out Stock </p>
                }
                
            </td>
            <td className="align-middle item-quantity">
                <span><button className="btn btn-outline-secondary"
                    onClick={() => dispatch(minus(cart, item._id))}
                    disabled={item.quantity === 1 ? true : false}> - 
                </button></span>
                <span className="px-3">{item.quantity}</span>
                <span><button className="btn btn-outline-secondary"
                    onClick={() => dispatch(plus(cart, item._id))}
                    disabled={(item.quantity === item.inStock) || (item.quantity === 10)  ? true : false}> + 
                </button></span>
            </td>
            <td className="item-delete align-middle">
                <i className="far fa-trash-alt text-danger" title="Delete"
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={() => dispatch({
                        type: 'ADD_MODAL',
                        payload: [{ data: cart, id: item._id, name: item.name, type: 'ADD_CART' }]
                    })} ></i>
            </td>
        </tr>
    )
}

export default CartItem

