import {useState, useContext} from 'react'
import Head from 'next/head'
import {getData} from '../../utils/fetchData'
import {DataContext} from '../../store/GlobalState'
import {addToCart} from '../../store/Action'
import Layout from '../../components/Layout/Layout'

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    return (
        <div>
            <Head>
                <title>Detail Product</title>
            </Head>

            <Layout>
                <div className="container">
                    <div className="row product-detail">
                        <div className="col-md-6">
                            <img className="d-block img-thumbnail rounded w-100 img-detail"
                                src={product.images[tab].url} 
                                alt={product.images[tab].url} 
                            />
                            <div className="row mx-0" style={{cursor: 'pointer'}} >
                                
                                {product.images.map((img, index) => (
                                    <img key={index} src={img.url} alt={img.url}
                                        className="img-thumbnail rounded img-de-mo"
                                        onClick={() => setTab(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <h2 className="text-capitalize my-3">{product.name}</h2>
                            <h4 className="text-danger my-3">${product.price}</h4>

                            <div>
                                {
                                    product.inStock > 0
                                    ? <h5  className="text-danger my-3">In Stock: {product.inStock}</h5>
                                    : <h5  className="text-danger my-3">Out Stock</h5>
                                }
                            </div>
                            
                            <div className="my-3">{product.description}</div>
                            <button type="button" className="btn btn-dark d-block my-3 w-100"
                                disabled={product.inStock === 0 ? true : false}
                                onClick={() => dispatch(addToCart(product, cart))}
                                >
                                    Add to Bag
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>                 
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {
    const res = await getData(`product/${id}`)
    // server side rendering
    return {
    props: { product: res.product }, // will be passed to the page component as props
    }
}

export default DetailProduct