import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import {DataContext} from '../../store/GlobalState'
import {useRouter} from 'next/router'
import {patchData} from '../../utils/fetchData'
import { updateItem } from '../../store/Action'
import Layout from '../../components/Layout/Layout'

const EditUser = () => {
    const router = useRouter()
    const { id } = router.query

    const {state, dispatch} = useContext(DataContext)
    const {auth, users} = state

    const [editUser, setEditUser] = useState([])
    const [checkStaff, setCheckStaff] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        users.forEach(user => {
            if(user._id === id){
                setEditUser(user)
                setCheckStaff(user.role === 'admin' ? true : false)
            }
        })
    },[users])

    const handleCheck = () => {
        setCheckStaff(!checkStaff)
        setNum(num + 1)
    }

    const handleSubmit = () => {
        let role = checkStaff ? 'admin' : 'user'
        if(num % 2 !== 0){
            dispatch({type: 'NOTIFY', payload: {loading: true}})
            patchData(`user/${editUser._id}`, {role}, auth.token)
            .then(res => { console.log(res)
                if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

                dispatch(updateItem(users, editUser._id, {
                    ...editUser, role
                }, 'ADD_USERS'))

                //return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            })
        }
        
    }

    return (
        <div>
            <Head>
                <title>Edit User</title>
            </Head>
            
            <Layout>
                <div className="container">
                    <div>
                        <button className="btn btn-dark my-3" onClick={() => router.back()}>
                            <i className="fas fa-long-arrow-alt-left" aria-hidden></i> Go Back
                        </button>
                    </div>

                    <div className="edit_user my-3">
                        <div className="col-md-4 mx-auto my-4">
                            <h2 className="text-capitalize text-center">Edit User</h2>

                            <div className="form-group">
                                <label htmlFor="name" className="d-block">Name</label>
                                <input type="text" className="form-control" id="name" defaultValue={editUser.name} disabled />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="d-block">Email</label>
                                <input type="text" className="form-control" id="email" defaultValue={editUser.email} disabled />
                            </div>

                            <div className="form-group">
                                <input type="checkbox" id="isStaff" checked={checkStaff}
                                style={{width: '20px', height: '20px'}} onChange={handleCheck} />

                                <label htmlFor="isStaff" style={{transform: 'translate(4px, -3px)'}}>
                                    Staff
                                </label>
                            </div>
                            
                            <button className="btn btn-pastel w-100" onClick={handleSubmit}>Update</button>

                        </div>
                        
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default EditUser