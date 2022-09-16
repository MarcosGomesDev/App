import {useState, useEffect} from 'react'

import api from '../services/api'

const useSubCategories = () => {
    const [subCategories, setSubCategories] = useState([])

    const loadSubCategories = () => {
        return new Promise((resolve, reject) => {
            api.get('/subCategories').then((response) => {
                const data = response.data

                setSubCategories(data)
                resolve()
            }).catch(reject)
        })
    }

    useEffect(() => {

        loadSubCategories()
    }, [])

    return [subCategories]
}

export default useSubCategories