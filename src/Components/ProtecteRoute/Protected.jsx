import { Navigate } from "react-router-dom"
import jwt_decode from "jwt-decode";

// eslint-disable-next-line react/prop-types
function Protected({ children }) {
    const credential = localStorage.getItem('credential')

    if (!credential) {
        return <Navigate to='/login' />
    } else {
        const decoded = jwt_decode(credential).exp

        if (decoded < Date.now() / 1000) {
            localStorage.removeItem('credential')
            localStorage.removeItem('user')
            return <Navigate to='/login' />
        }

        console.log(decoded)
    }

    return children
}

export default Protected