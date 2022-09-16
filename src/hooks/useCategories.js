import {useState, useEffect} from 'react'

import api from '../services/api'

const useCategories = () => {
    const [categories, setCategories] = useState([])

    const loadCategories = () => {
        return new Promise((resolve, reject) => {
            api.get('/categories').then((response => {
                const data = response.data

                setCategories(data)
                resolve()
            })).catch(reject)
        })
    }

    useEffect(() => {

        loadCategories()
    }, [])


    return [categories]
}

export default useCategories