import React, { useState } from 'react'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'

const Filter = ({state}) => {
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const { categories  } = state 
    const router = useRouter()

    const handleCatgory = (e) => {
        setCategory(e.target.value)
        filterSearch({router, category: e.target.value})
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }

    return (
        <div className="input-group mt-2">
            <div className="input-group-prepend col-md-6 px-2 mt-2">
                <select className="custom-select text-caplitalize"
                    value={category} onChange={handleCatgory}>
                    <option value="all">All products</option>
                    {
                        categories.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            
            <div className="input-group-prepend col-md-6 px-2 mt-2">
                <select className="custom-select text-capitalize"
                value={sort} onChange={handleSort}> 

                    <option value="-createdAt">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="-sold">Best sales</option>
                    <option value="-price">Price: Hight-Low</option>
                    <option value="price">Price: Low-Hight</option>
                </select>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Filter