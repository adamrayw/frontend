import axios from "axios"

// const api = 'http://localhost:3000/api/'
const api = 'https://aplotgana.up.railway.app/api/'

const useApiPost = async (url, data) => {
    try {
        const response = await axios.post(api + url, data)
        return { response, err: null }
    } catch (error) {
        return { response: null, err: error }
    }
}

const useApiGet = async (url) => {
    try {
        const response = await axios.get(api + url)
        return { response, err: null }
    } catch (error) {
        return { response: null, err: error }
    }
}

export { useApiPost, useApiGet }