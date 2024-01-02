export default class CustomError extends Error {
    constructor(res) {
        super(res.message)
        this.status = res.statusCode
        this.message = res.message
        this.code = res.code
    }
}