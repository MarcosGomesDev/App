import {useState, useEffect} from 'react'

import api from '../services/api'

const useProducts = () => {
    const [products, setProducts] = useState([])

    const loadProducts = () => {
        return new Promise((resolve, reject) => {
            api.get('/products').then((response => {
                const data = response.data

                setProducts(data)
                resolve()
            })).catch(reject)
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])


    return [products]
}

export default useProducts