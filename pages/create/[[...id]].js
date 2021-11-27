import React, {useState, useContext, useEffect} from 'react'
import Head from 'next/head'
import { DataContext } from '../../store/GlobalState'
import {imageUpload} from '../../utils/imageUpload'
import { postData, getData, putData } from '../../utils/fetchData'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'

const CreateProduct = () => {
    const initialState = {
        name: '',
        price: 0,
        inStock: 0,
        description: '',
        category: ''
    }
    const [product, setProduct] = useState(initialState)
    const {name, price, inStock, description, category} = product

    const [images, setImages] = useState([])

    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state

    const router = useRouter()
    const { id } = router.query
    const [onEdit, setOnEdit] = useState(false) 

    useEffect(() => {
        if(id) {
            setOnEdit(true)
            getData(`product/${id}`)
            .then (res => {
                setProduct(res.product)
                setImages(res.product.images)
            })
        }else {
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
        }
    }, [id])
    
    const handleChange = e => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUpload = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

        files.forEach(file => {
            if(file.size > 1024 * 1024)
            return err = 'The largest image size is 1mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })

        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images.'}})
        setImages([...images, ...newImages])
    }

    const deleteImage = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin') 
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

        if(!name || !price || !inStock || !description || category === 'all' || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})

    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit){
           res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
           if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    }

    if(!auth.user) return null;
    return (
        <div className="container">
            <Head>
                <title>Manage product</title>
            </Head>

            <Layout>
                <div className="manage_product">
                    <form className="w-100 px-2" onSubmit={handleSubmit}> 
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={name} 
                                    placeholder="Name" className="d-block w-100 mb-4 p-2"
                                    onChange={handleChange}/>
                                
                                <div className="row mx-0 mb-4">
                                    <div className="col-sm-6 px-0 pr-4">
                                        <label htmlFor="price">Price</label>
                                        <input type="number" name="price" value={price} 
                                            placeholder="Price" className="d-block w-100 p-2"
                                            onChange={handleChange}/>
                                    </div>
                                    <div className="col-sm-6 px-0 pl-4">
                                        <label htmlFor="inStock">InStock</label>
                                        <input type="number" name="inStock" value={inStock} 
                                            placeholder="InStock" className="d-block w-100 p-2"
                                            onChange={handleChange}/>
                                    </div>
                                </div>

                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" cols="30" rows="7"
                                    value={description} placeholder="Description" 
                                    onChange={handleChange} className="d-block mb-4 w-100 p-2" />

                                <label htmlFor="category">Category</label>
                                <div className="input-group-prepend px-0 my-2">
                                    <select name="category" id="category" value={category}
                                        className="custom-select text-capitalize"
                                        onChange={handleChange}>
                                            <option value="all">Select category</option>
                                            {
                                                categories.map(item => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                    </select>
                                </div>
                            </div>
                            
                            <div className="col-md-6 my-4">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Upload</span>
                                    </div>
                                    <div className="custom-file border rounded">
                                        <input type="file" className="custom-file-input" 
                                            onChange={handleUpload} multiple accept="image/*"/>
                                    </div>
                                </div>
                            
                                <div className="row img-up">
                                    {
                                        images.map((img, index) => (
                                            <div key={index} className="file-img my-1">
                                                <img src={img.url ? img.url : URL.createObjectURL(img)}
                                                alt="" className="img-thumbnail rounded" />
            
                                                <span onClick={() => deleteImage(index)}>X</span>
                                            </div>                                    
                                        ))
                                    }
                                </div>
                            </div>

                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-dark my-2 px-4">
                                { onEdit ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    )
}

export default CreateProduct
