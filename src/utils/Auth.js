import { useLogin } from "../context/LoginProvider"
import { removeData } from "./storage"

const {setIsLoggedIn} = useLogin()

export const TokenExpired = async() => {
    try {
        removeData()
        setIsLoggedIn(false)
    } catch (error) {
        console.log(error)
    }
}