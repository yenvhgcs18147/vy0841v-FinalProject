import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'

const Search = () => {
    const [search, setSearch] = useState('')

    const router = useRouter()

    useEffect(() => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])

    return (
        <form className="search px-3 py-0">
            <input type="text" placeholder="Search" className="search__input" 
                list="title_product" value={search.toLowerCase()} 
                onChange={e => setSearch(e.target.value)}  />
        </form>
    )
}

export default Search
