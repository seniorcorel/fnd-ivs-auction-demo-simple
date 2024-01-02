import CustomError from '../errors/CustomError'

const fetchClient = async (path, body, method = 'GET') => {
    const bd = body ? { body: JSON.stringify(body) } : null
    const result = await fetch(`${process.env.API_BASE_URL}${path}`, {
        method,
        ...bd,
    })

    const res = await result.json()

    if (res.error) {
        throw new CustomError(res)
    }

    return res
}

export default fetchClient